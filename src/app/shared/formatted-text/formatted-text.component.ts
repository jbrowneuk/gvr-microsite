import { Component, Input } from '@angular/core';

@Component({
  selector: 'gvr-formatted-text',
  template: `
    <ngx-md [data]="text" class="text-area" data-text-area></ngx-md>
  `
})
export class FormattedTextComponent {
  @Input() public text = '';
}
