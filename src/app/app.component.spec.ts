import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { PageObjectBase } from './lib/testing/page-object.base';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let pageObject: AppComponentPageObject;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        pageObject = new AppComponentPageObject(fixture);
        fixture.detectChanges();
      });
  }));

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should show and hide menu when toggled', done => {
    expect(pageObject.menuShown).toBeFalse();

    pageObject.toggleMenu();
    fixture.detectChanges();

    setTimeout(() => {
      expect(pageObject.menuControlElement.checked).toBeTrue();
      expect(pageObject.menuShown).toBeTrue();
      done();
    });
  });
});

class AppComponentPageObject extends PageObjectBase<AppComponent> {
  public get menuToggleElement(): HTMLLabelElement {
    return this.select('#menu-toggle');
  }

  public get menuControlElement(): HTMLInputElement {
    return this.select('#menu-box');
  }

  public get menuContainer(): HTMLInputElement {
    return this.select('#menu-container');
  }

  public get menuShown(): boolean {
    return this.menuContainer.classList.contains('opened');
  }

  public toggleMenu(): void {
    this.menuToggleElement.click();
  }
}
