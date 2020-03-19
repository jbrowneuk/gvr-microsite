import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageObjectBase } from '../lib/testing/page-object.base';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let pageObject: HomeComponentPageObject;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        pageObject = new HomeComponentPageObject(fixture);
        fixture.detectChanges();
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have backdrop url with root path', () => {
    const backgroundImage = pageObject.backdrop.style.backgroundImage;
    expect(backgroundImage.startsWith(`url("${component.rootPath}`)).toBeTrue();
  });

  it('should calculate age of layout', () => {
    expect(component.ageLayout).toBeGreaterThan(0);
    expect(pageObject.taglineText).toContain(`${component.ageLayout} years`);
  });
});

class HomeComponentPageObject extends PageObjectBase<HomeComponent> {
  public get backdrop(): HTMLDivElement {
    return this.select('[data-backdrop]');
  }

  public get taglineText(): string {
    return this.select('[data-tagline]').textContent;
  }
}
