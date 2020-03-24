import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FormattedTextComponent } from './formatted-text.component';

const mockTestContent = 'Mock test content';

@Component({
  selector: 'ngx-md', // tslint:disable-line
  template: '<ng-content></ng-content>'
})
class MockMarkdownComponent {}

@Component({
  selector: 'gvr-test-wrapper',
  template: `
    <gvr-formatted-text>${mockTestContent}</gvr-formatted-text>
  `
})
class TestComponent {}

describe('FormattedTextComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MockMarkdownComponent,
        FormattedTextComponent,
        TestComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should contain a markdown component', () => {
    const mdElement = fixture.debugElement.query(By.css('gvr-formatted-text'));
    expect(mdElement).toBeTruthy();
  });

  it('should pass data to markdown component', async(async () => {
    const mdElement = fixture.debugElement.query(
      By.css('gvr-formatted-text ngx-md')
    );
    expect(mdElement.nativeElement.innerHTML.trim()).toBe(mockTestContent);
  }));
});
