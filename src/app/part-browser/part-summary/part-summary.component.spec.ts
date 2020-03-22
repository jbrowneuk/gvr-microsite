import { of } from 'rxjs';
import { PageObjectBase } from 'src/app/lib/testing/page-object.base';
import { Part, PartList } from 'src/app/model';
import { IMock, Mock, Times } from 'typemoq';

import { formatDate } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PartBrowserFacade } from '../state/part-browser.facade';
import { PartSummaryComponent } from './part-summary.component';

function sumReducer(accumulator: number, currentValue: number) {
  return accumulator + currentValue;
}

const mockPartA: Part = {
  id: 'part-a',
  manufacturer: 'me',
  name: 'Part-A',
  image: '',
  retailCost: 10,
  actualCost: 5,
  required: 10,
  acquired: 5
};

const mockPartB: Part = {
  id: 'part-b',
  manufacturer: 'you',
  name: 'Part-B',
  image: '',
  retailCost: 5,
  actualCost: 5,
  required: 5,
  acquired: 5
};

const mockPartC: Part = {
  id: 'part-c',
  manufacturer: 'we',
  name: 'Part-C',
  image: '',
  retailCost: 2,
  actualCost: -1,
  required: 1,
  acquired: 1
};

const mockPartList: PartList = {
  lastUpdate: '2020-03-20',
  categories: [
    { id: 'a', name: 'a', parts: [mockPartA, mockPartB], icon: 'a' },
    { id: 'b', name: 'b', parts: [mockPartC], icon: 'b' }
  ]
};

const Selectors = {
  tableFooterRow: '[data-totals-row]',
  itemCountCell: '[data-item-count]',
  estimatedCostCell: '[data-estimated-cost]',
  name: '[data-name]'
};

describe('Part Summary Component', () => {
  let component: PartSummaryComponent;
  let pageObject: PartSummaryPageObject;
  let fixture: ComponentFixture<PartSummaryComponent>;
  let mockFaçade: IMock<PartBrowserFacade>;
  let totalItemCount: number;
  let estimatedItemCost: number;

  beforeAll(() => {
    totalItemCount =
      mockPartA.required + mockPartB.required + mockPartC.required;

    // Part C has no actual cost; take this into account here
    estimatedItemCost =
      mockPartA.actualCost * mockPartA.required +
      mockPartB.actualCost * mockPartB.required +
      mockPartC.retailCost * mockPartC.required;
  });

  beforeEach(async(async () => {
    mockFaçade = Mock.ofType<PartBrowserFacade>();
    mockFaçade.setup(f => f.partList$).returns(() => of(mockPartList));
    mockFaçade.setup(f => f.partListLoading$).returns(() => of(false));

    await TestBed.configureTestingModule({
      declarations: [PartSummaryComponent],
      providers: [
        { provide: PartBrowserFacade, useFactory: () => mockFaçade.object }
      ],
      imports: [RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(PartSummaryComponent);
    pageObject = new PartSummaryPageObject(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should request part list on creation', () => {
    mockFaçade.verify(f => f.loadPartList(), Times.once());
    expect().nothing();
  });

  describe('Summary calculation', () => {
    it('should summarise part count and costs', done => {
      component.costSummary$.subscribe({
        next: data => {
          expect(data.totalItems).toBe(totalItemCount, 'Number of items');
          expect(data.totalCost).toBe(estimatedItemCost, `Total cost`);
          done();
        }
      });
    });

    it('should summarise data for each category', done => {
      component.costSummary$.subscribe({
        next: data => {
          expect(data.categories.length).toBe(mockPartList.categories.length);

          for (let idx = 0; idx < data.categories.length; idx++) {
            const original = mockPartList.categories[idx];
            const converted = data.categories[idx];

            const totalItems = original.parts
              .map(p => p.required)
              .reduce(sumReducer);
            const totalCost = original.parts
              .map(
                p =>
                  p.required * (p.actualCost > 0 ? p.actualCost : p.retailCost)
              )
              .reduce(sumReducer);

            expect(converted.id).toBe(original.id);
            expect(converted.name).toBe(original.name);
            expect(converted.icon).toBe(original.icon);
            expect(converted.items).toBe(totalItems, 'Number of items');
            expect(converted.cost).toBe(totalCost, 'Total cost');
          }

          done();
        }
      });
    });
  });

  describe('Summary table — default view', () => {
    it('should display last updated date', () => {
      expect(pageObject.lastUpdated).toBeTruthy();
      const currentLocale = TestBed.get(LOCALE_ID);
      const expectedDate = formatDate(
        mockPartList.lastUpdate,
        'mediumDate',
        currentLocale
      );
      expect(pageObject.lastUpdated.textContent.trim()).toBe(expectedDate);
    });

    it('should display row for each category', () => {
      const rows = pageObject.summaryRows;
      expect(rows.length).toBe(mockPartList.categories.length);

      mockPartList.categories.forEach(c => {
        const relatedRow = pageObject.summaryRowForId(c.id);
        expect(relatedRow).toBeTruthy();

        const nameElement = relatedRow.querySelector(Selectors.name);
        expect(nameElement.textContent.trim()).toBe(c.name);

        const expectedCount = c.parts.map(p => p.required).reduce(sumReducer);
        const countElement = relatedRow.querySelector(Selectors.itemCountCell);
        expect(countElement.textContent.trim()).toBe('' + expectedCount);
      });
    });

    it('should display total item count', () => {
      expect(pageObject.totalItemCount.textContent.trim()).toBe(
        `${totalItemCount}`
      );
    });
  });

  describe('Summary table — full view', () => {
    beforeEach(() => {
      component.costsVisible = true;
      fixture.detectChanges();
    });

    it('should display cost header', () => {
      expect(pageObject.costHeader).toBeTruthy();
    });

    it('should display estimated cost for each category', () => {
      mockPartList.categories.forEach(c => {
        const relatedRow = pageObject.summaryRowForId(c.id);
        expect(relatedRow).toBeTruthy();

        const estimatedCost = c.parts
          .map(
            p => p.required * (p.actualCost > 0 ? p.actualCost : p.retailCost)
          )
          .reduce(sumReducer);
        const countElement = relatedRow.querySelector(
          Selectors.estimatedCostCell
        );
        expect(countElement.textContent.trim()).toBe(
          `${estimatedCost.toFixed(2)}`
        );
      });
    });

    it('should display estimated item cost in currency format', () => {
      expect(pageObject.estimatedItemCost.textContent.trim()).toBe(
        `${estimatedItemCost.toFixed(2)}`
      );
    });

    it('should toggle view when button clicked', () => {
      const initialView = component.costsVisible;
      pageObject.summaryViewButton.click();
      expect(component.costsVisible).not.toBe(initialView);
    });
  });
});

class PartSummaryPageObject extends PageObjectBase<PartSummaryComponent> {
  public get lastUpdated(): HTMLTimeElement {
    return this.select('[data-last-updated]');
  }

  public get costHeader(): HTMLTableHeaderCellElement {
    return this.select('[data-cost-header]');
  }

  public get summaryRows(): HTMLTableRowElement[] {
    return this.selectAll('[data-summary-row]');
  }

  public get totalItemCount(): HTMLTableDataCellElement {
    return this.select(
      `${Selectors.tableFooterRow} ${Selectors.itemCountCell}`
    );
  }

  public get estimatedItemCost(): HTMLTableDataCellElement {
    return this.select(
      `${Selectors.tableFooterRow} ${Selectors.estimatedCostCell}`
    );
  }

  public get summaryViewButton(): HTMLButtonElement {
    return this.select('[data-summary-view-toggle]');
  }

  public summaryRowForId(id: string): HTMLTableRowElement {
    const rows = this.summaryRows;
    return rows.find(r => r.dataset.summaryRow === id);
  }
}
