import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageObjectBase } from '../lib/testing/page-object.base';
import { ROOT_PATH } from '../variables';
import { LayoutComponent } from './layout.component';

const testRoot = '/test/';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  let pageObject: LayoutComponentPageObject;

  beforeEach(async(async () => {
    await TestBed.configureTestingModule({
      declarations: [LayoutComponent],
      providers: [{ provide: ROOT_PATH, useValue: testRoot }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    pageObject = new LayoutComponentPageObject(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should have page content', () => {
    console.log(pageObject.markdownContainer);
    expect(pageObject.markdownContainer).toBeTruthy();
    expect((pageObject.markdownContainer as any).path).toContain(
      `${testRoot}pages/layout.md`
    );
  });
});

class LayoutComponentPageObject extends PageObjectBase<LayoutComponent> {
  public get markdownContainer(): HTMLElement {
    return this.select('[data-page-content]');
  }
}
