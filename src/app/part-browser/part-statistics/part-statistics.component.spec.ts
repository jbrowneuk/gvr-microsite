import { of } from 'rxjs';
import { PageObjectBase } from 'src/app/lib/testing/page-object.base';
import { PartCategory, PartList } from 'src/app/model';
import { IMock, Mock } from 'typemoq';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PartBrowserFacade } from '../state/part-browser.facade';
import { PartStatisticsComponent } from './part-statistics.component';

const mockLocoCategory: PartCategory = {
  id: 'locomotives',
  name: 'locomotives',
  icon: '',
  parts: [
    {
      id: 'loco-part',
      manufacturer: 'test',
      name: 'mock',
      image: '',
      retailCost: 1,
      actualCost: 1,
      required: 1,
      acquired: 1,
      data: {
        yearOfManufacture: 1984,
        depictedEra: 3,
        locomotiveType: 'Imaginary',
        wheelArrangement: '0-4-0'
      }
    },
    {
      id: 'loco-part-nodata',
      manufacturer: 'test',
      name: 'mock missing data',
      image: '',
      retailCost: 1,
      actualCost: 1,
      required: 1,
      acquired: 1,
      data: {
        yearOfManufacture: 1985
      }
    }
  ]
};

const mockNonLocoCategory: PartCategory = {
  id: 'test',
  name: 'test',
  icon: '',
  parts: [
    {
      id: 'non-loco-part',
      manufacturer: 'test',
      name: 'mock 2',
      image: '',
      retailCost: 1,
      actualCost: 1,
      required: 1,
      acquired: 1,
      data: {
        yearOfManufacture: 1995,
        depictedEra: 4
      }
    }
  ]
};

const mockPartList: PartList = {
  lastUpdate: '',
  categories: [mockLocoCategory, mockNonLocoCategory]
};

describe('Part Statistics Component', () => {
  let component: PartStatisticsComponent;
  let fixture: ComponentFixture<PartStatisticsComponent>;
  let pageObject: PartStatisticsPageObject;
  let mockFacade: IMock<PartBrowserFacade>;

  beforeEach(async(async () => {
    mockFacade = Mock.ofType<PartBrowserFacade>();
    mockFacade.setup(f => f.partList$).returns(() => of(mockPartList));

    await TestBed.configureTestingModule({
      declarations: [PartStatisticsComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: PartBrowserFacade, useFactory: () => mockFacade.object }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PartStatisticsComponent);
    pageObject = new PartStatisticsPageObject(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a page summary', () => {
    expect(pageObject.pageSummary).toBeTruthy();
  });

  it('should display locomotive type table', () => {
    const table = pageObject.locoTypeTable;
    expect(table).toBeTruthy();

    const rows = table.querySelectorAll('tbody tr');
    expect(rows.length).toBe(mockLocoCategory.parts.length);

    // Get representation for data with a known type
    const knownTypeData = mockLocoCategory.parts[0].data;
    const knownTypeKey = knownTypeData.locomotiveType.toLowerCase();
    const knownTypeRow = pageObject.locoTypeRowForKey(knownTypeKey);
    expect(knownTypeRow[0].textContent.trim()).toBe(
      knownTypeData.locomotiveType
    );
    expect(knownTypeRow[1].textContent.trim()).toBe('1');

    // Get representation for data with an unknown type
    const unknownType = 'Unknown';
    const unknownTypeKey = 'unknown';
    const unknownTypeRow = pageObject.locoTypeRowForKey(unknownTypeKey);
    expect(unknownTypeRow[0].textContent.trim()).toBe(unknownType);
    expect(unknownTypeRow[1].textContent.trim()).toBe('1');
  });

  it('should display manufacture decade table', () => {
    const table = pageObject.manufactureDecadeTable;
    expect(table).toBeTruthy();

    const rows = table.querySelectorAll('tbody tr');
    expect(rows.length).toBe(1); // 1984 and 1985 are grouped as a decade

    const rowKey = '1980s';
    const decadeRow = pageObject.manufactureDecadeForKey(rowKey);
    expect(decadeRow[0].textContent.trim()).toBe(rowKey);
    expect(decadeRow[1].textContent.trim()).toBe('2');
  });

  it('should only display model data for locomotives', () => {
    const table = pageObject.eraTable;
    expect(table).toBeTruthy();

    const rows = table.querySelectorAll('tbody tr');
    expect(rows.length).toBe(mockLocoCategory.parts.length);

    const rowKey = mockNonLocoCategory.parts[0].data.depictedEra;
    const decadeRow = pageObject.manufactureDecadeForKey(rowKey);
    expect(decadeRow.length).toBe(0);
  });
});

class PartStatisticsPageObject extends PageObjectBase<PartStatisticsComponent> {
  readonly tableSelectors = {
    type: '[data-table-title=type]',
    manufactureDecade: '[data-table-title=decade-model-manufactured]',
    era: '[data-table-title=depicted-era-of-model]'
  };

  public get locoTypeTable(): HTMLTableElement {
    return this.select(this.tableSelectors.type);
  }

  public locoTypeRowForKey(key: string): HTMLTableDataCellElement[] {
    return this.selectAll(
      `${this.tableSelectors.type} [data-row=row-${key}] td`
    );
  }

  public get manufactureDecadeTable(): HTMLTableElement {
    return this.select(this.tableSelectors.manufactureDecade);
  }

  public manufactureDecadeForKey(key: string): HTMLTableDataCellElement[] {
    return this.selectAll(
      `${this.tableSelectors.manufactureDecade} [data-row=row-${key}] td`
    );
  }

  public get eraTable(): HTMLTableElement {
    return this.select(this.tableSelectors.era);
  }

  public eraForKey(key: string): HTMLTableDataCellElement[] {
    return this.selectAll(
      `${this.tableSelectors.era} [data-row=row-${key}] td`
    );
  }

  public get pageSummary(): HTMLElement {
    return this.select('[data-page-overview]');
  }
}
