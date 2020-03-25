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
      providers: [{ provide: ROOT_PATH, useValue: testRoot }]
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    pageObject = new LayoutComponentPageObject(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should have image of layout', () => {
    expect(pageObject.image).toBeTruthy();
    expect(pageObject.image.src).toContain(
      `${testRoot}assets/images/layout.png`
    );
  });
});

class LayoutComponentPageObject extends PageObjectBase<LayoutComponent> {
  public get image(): HTMLImageElement {
    return this.select('[data-image]');
  }
}
