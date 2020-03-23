import { of } from 'rxjs';
import { PageObjectBase } from 'src/app/lib/testing/page-object.base';
import { Part, PartData, PartList } from 'src/app/model';
import { SharedModule } from 'src/app/shared/shared.module';
import { IMock, Mock } from 'typemoq';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { PartBrowserFacade } from '../state/part-browser.facade';
import { PartDetailComponent } from './part-detail.component';

const mockPartBase = {
  id: 'test-id',
  manufacturer: 'test-manufacturer',
  name: 'a test part',
  retailCost: 100,
  actualCost: 99.99,
  required: 10,
  acquired: 1
};

const mockImageUrl = 'image-url.png';

const mockData: PartData = {
  notes: 'Some notes'
};

const mockPartAllData: Part = Object.assign(
  { image: mockImageUrl, data: mockData },
  mockPartBase
);

describe('Part Detail Component', () => {
  let component: PartDetailComponent;
  let fixture: ComponentFixture<PartDetailComponent>;
  let pageObject: PartDetailPageObject;

  async function setupTestBed(
    mockRoute: IMock<ActivatedRoute>,
    mockFacade: IMock<PartBrowserFacade>
  ) {
    await TestBed.configureTestingModule({
      declarations: [PartDetailComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, SharedModule],
      providers: [
        { provide: ActivatedRoute, useFactory: () => mockRoute.object },
        { provide: PartBrowserFacade, useFactory: () => mockFacade.object }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PartDetailComponent);
    pageObject = new PartDetailPageObject(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  describe('Part with full data', () => {
    beforeEach(async(() => {
      const categoryId = 'test';

      const partList: PartList = {
        lastUpdate: '2020-02-02T20:20',
        categories: [
          {
            name: 'test',
            id: categoryId,
            icon: 'test',
            parts: [mockPartAllData]
          }
        ]
      };

      const mockRoute = Mock.ofType<ActivatedRoute>();
      mockRoute
        .setup(r => r.params)
        .returns(() => of({ category: categoryId, id: mockPartAllData.id }));

      const mockFacade = Mock.ofType<PartBrowserFacade>();
      mockFacade.setup(f => f.partListLoading$).returns(() => of(false));
      mockFacade.setup(f => f.partList$).returns(() => of(partList));

      setupTestBed(mockRoute, mockFacade);
    }));

    it('should have name as title', () => {
      expect(pageObject.title.textContent.trim()).toBe(mockPartAllData.name);
    });

    it('should have manufacturer and id as identifier', () => {
      expect(pageObject.partIdentifier.textContent.trim()).toBe(
        `${mockPartAllData.manufacturer} ${mockPartAllData.id}`
      );
    });

    it('should display image', () => {
      expect(pageObject.imageArea).toBeTruthy();
      expect(pageObject.imageArea.src).toContain(mockImageUrl);
    });

    it('should display description', () => {
      expect(pageObject.description).toBeTruthy();
      expect(pageObject.description.textContent.trim()).toBe(mockData.notes);
    });

    it('should display properties table with rows', () => {
      expect(pageObject.propertiesTable).toBeTruthy();
      expect(pageObject.properties.length).toBeGreaterThan(0);
    });
  });
});

class PartDetailPageObject extends PageObjectBase<PartDetailComponent> {
  get title(): HTMLHeadingElement {
    return this.select('[data-name]');
  }

  get partIdentifier(): HTMLDivElement {
    return this.select('[data-part-identifier]');
  }

  get imageArea(): HTMLImageElement {
    return this.select('[data-image]');
  }

  get description(): HTMLDivElement {
    return this.select('[data-description]');
  }

  get propertiesTable(): HTMLTableElement {
    return this.select('[data-part-details]');
  }

  get properties(): HTMLTableRowElement[] {
    return this.selectAll('[data-properties] tr');
  }
}
