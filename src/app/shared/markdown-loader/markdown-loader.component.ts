import { Component, Input } from '@angular/core';

@Component({
  selector: 'gvr-markdown-loader',
  template: '<ngx-md *ngIf="path" [path]="path"></ngx-md>'
})
export class MarkdownLoaderComponent {
  @Input() public path: string;
}
