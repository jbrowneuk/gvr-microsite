import { of } from 'rxjs';
import { IMock, Mock } from 'typemoq';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { PageObjectBase } from '../lib/testing/page-object.base';
import { ROOT_PATH } from '../variables';
import { StaticPageComponent } from './static-page.component';

const testRoot = '/test/';

describe('Static Page Component', () => {
  let component: StaticPageComponent;
  let fixture: ComponentFixture<StaticPageComponent>;
  let pageObject: LayoutComponentPageObject;

  async function setupTestBed(route: IMock<ActivatedRoute>): Promise<void> {
    await TestBed.configureTestingModule({
      declarations: [StaticPageComponent],
      providers: [
        { provide: ROOT_PATH, useValue: testRoot },
        { provide: ActivatedRoute, useFactory: () => route.object }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(StaticPageComponent);
    pageObject = new LayoutComponentPageObject(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  describe('when pageOverride is provided', () => {
    const pageOverride = 'my-overriden-page';

    beforeEach(async(async () => {
      const mockRoute = Mock.ofType<ActivatedRoute>();
      mockRoute.setup(s => s.data).returns(() => of({ pageOverride }));
      mockRoute.setup(s => s.params).returns(() => of({}));

      await setupTestBed(mockRoute);
    }));

    it('should load page from pageOverride route data', () => {
      expect(pageObject.markdownContainer).toBeTruthy();
      expect((pageObject.markdownContainer as any).path).toContain(
        `${testRoot}pages/${pageOverride}.md`
      );
    });
  });

  describe('when pageOverride is not provided', () => {
    const page = 'my-actual-page';

    beforeEach(async(async () => {
      const mockRoute = Mock.ofType<ActivatedRoute>();
      mockRoute.setup(s => s.data).returns(() => of(undefined));
      mockRoute.setup(s => s.params).returns(() => of({ page }));

      await setupTestBed(mockRoute);
    }));

    it('should load page from page route param', () => {
      expect(pageObject.markdownContainer).toBeTruthy();
      expect((pageObject.markdownContainer as any).path).toContain(
        `${testRoot}pages/${page}.md`
      );
    });
  });
});

class LayoutComponentPageObject extends PageObjectBase<StaticPageComponent> {
  public get markdownContainer(): HTMLElement {
    return this.select('[data-page-content]');
  }
}
