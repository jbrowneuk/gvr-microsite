import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';

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

class AppComponentPageObject {
  constructor(private fixture: ComponentFixture<AppComponent>) {}

  private get nativeElement(): HTMLElement {
    return this.fixture.nativeElement;
  }

  public get menuToggleElement(): HTMLLabelElement {
    return this.nativeElement.querySelector('#menu-toggle');
  }

  public get menuControlElement(): HTMLInputElement {
    return this.nativeElement.querySelector('#menu-box');
  }

  public get menuContainer(): HTMLInputElement {
    return this.nativeElement.querySelector('#menu-container');
  }

  public get menuShown(): boolean {
    return this.menuContainer.classList.contains('opened');
  }

  public toggleMenu(): void {
    this.menuToggleElement.click();
  }
}
