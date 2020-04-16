import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MarkdownLoaderComponent } from './markdown-loader.component';

@Component({
  selector: 'ngx-md', // tslint:disable-line
  template: '<div>{{ path }}</div>'
})
class MockMarkdownComponent {
  @Input() public path: string;
}

describe('Markdown Loader Component', () => {
  let component: MarkdownLoaderComponent;
  let fixture: ComponentFixture<MarkdownLoaderComponent>;

  beforeEach(async(async () => {
    await TestBed.configureTestingModule({
      declarations: [MockMarkdownComponent, MarkdownLoaderComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MarkdownLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should pass path to markdown component', async(() => {
    const path = '/path/to/file';
    component.path = path;
    fixture.detectChanges();

    const mockMd = fixture.debugElement.query(
      By.directive(MockMarkdownComponent)
    ).componentInstance;
    expect(mockMd.path).toBe(path);
  }));
});
