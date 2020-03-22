import { of } from 'rxjs';
import { PageObjectBase } from 'src/app/lib/testing/page-object.base';
import { Part, PartList } from 'src/app/model';
import { IMock, Mock, Times } from 'typemoq';

import { formatDate } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Params } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { PartBrowserFacade } from '../state/part-browser.facade';
import { PartListComponent } from './part-list.component';

const mockPart: Part = {
  id: 'part-a',
  manufacturer: 'me',
  name: 'Part-A',
  image: '',
  retailCost: 10,
  actualCost: 5,
  required: 10,
  acquired: 5
};

const mockCategory = {
  id: 'category',
  name: 'category name',
  parts: [mockPart, mockPart],
  icon: 'smile'
};

const mockPartList: PartList = {
  lastUpdate: '2020-03-20',
  categories: [mockCategory]
};

describe('Part List Component', () => {
  let component: PartListComponent;
  let fixture: ComponentFixture<PartListComponent>;
  let pageObject: PartListPageObject;
  let mockFaçade: IMock<PartBrowserFacade>;
  let mockRoute: IMock<ActivatedRoute>;

  async function setupFixture(params: Params): Promise<void> {
    mockFaçade = Mock.ofType<PartBrowserFacade>();
    mockFaçade.setup(f => f.partList$).returns(() => of(mockPartList));
    mockFaçade.setup(f => f.partListLoading$).returns(() => of(false));

    mockRoute = Mock.ofType<ActivatedRoute>();
    mockRoute.setup(r => r.params).returns(() => of(params));

    await TestBed.configureTestingModule({
      declarations: [PartListComponent],
      providers: [
        { provide: PartBrowserFacade, useFactory: () => mockFaçade.object },
        { provide: ActivatedRoute, useFactory: () => mockRoute.object }
      ],
      imports: [RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PartListComponent);
    pageObject = new PartListPageObject(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  describe('valid category', () => {
    beforeEach(async(() => {
      setupFixture({ category: mockCategory.id });
    }));

    it('should create and load part list', () => {
      expect(component).toBeTruthy();
      mockFaçade.verify(f => f.loadPartList(), Times.once());
    });

    it('should return correct category data', done => {
      component.category$.subscribe({
        next: category => {
          expect(category).toEqual(mockCategory);
          done();
        }
      });
    });

    it('should cache the last updated date when retrieving category data', done => {
      component.category$.subscribe({
        next: () => {
          expect(component.lastUpdated).toEqual(mockPartList.lastUpdate);
          done();
        }
      });
    });

    it('should display category title', () => {
      expect(pageObject.name.textContent).toContain(mockCategory.name);
    });

    it('should display category icon', () => {
      expect(pageObject.icon.classList).toContain(`fa-${mockCategory.icon}`);
    });

    it('should display thumbnails', () => {
      expect(pageObject.itemThumbnails.length).toBe(mockCategory.parts.length);
    });

    it('should display last updated date', () => {
      expect(pageObject.lastUpdated).toBeTruthy();
      const currentLocale = TestBed.inject(LOCALE_ID);
      const expectedDate = formatDate(
        mockPartList.lastUpdate,
        'mediumDate',
        currentLocale
      );
      expect(pageObject.lastUpdated.textContent.trim()).toContain(expectedDate);
    });
  });

  describe('invalid category', () => {
    beforeEach(async(() => {
      setupFixture({ category: 'vaughn' });
    }));

    it('should display no category error state', () => {
      expect(pageObject.invalidCategoryState).toBeTruthy();
    });
  });
});

class PartListPageObject extends PageObjectBase<PartListComponent> {
  get name(): HTMLHeadingElement {
    return this.select('[data-name]');
  }

  get icon(): HTMLSpanElement {
    return this.select('[data-icon]');
  }

  get lastUpdated(): HTMLDivElement {
    return this.select('[data-last-update]');
  }

  get itemThumbnails(): HTMLElement[] {
    return this.selectAll('[data-items] gvr-part-thumbnail');
  }

  get loadingState(): HTMLDivElement {
    return this.select('[data-loading]');
  }

  get invalidCategoryState(): HTMLDivElement {
    return this.select('[data-no-category]');
  }
}
