import { ROOT_PATH } from 'src/app/variables';

import { Component, Inject, Optional } from '@angular/core';

@Component({
  selector: 'gvr-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public rootPath: string;

  constructor(@Optional() @Inject(ROOT_PATH) rootPath: string) {
    this.rootPath = rootPath || '/';
  }

  public get ageLayout(): number {
    return new Date().getFullYear() - 1995;
  }
}
