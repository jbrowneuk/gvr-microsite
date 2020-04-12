import { Component, Inject, Optional } from '@angular/core';

import { ROOT_PATH } from '../variables';

@Component({
  selector: 'gvr-layout',
  templateUrl: './static-page.component.html'
})
export class LayoutComponent {
  public rootPath: string;

  constructor(@Optional() @Inject(ROOT_PATH) rootPath: string) {
    this.rootPath = rootPath || '/';
  }
}
