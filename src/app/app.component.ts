import { Component, Inject, Optional } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { RouteTransitions } from './route-transitions';
import { ROOT_PATH } from './variables';

@Component({
  selector: 'gvr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: RouteTransitions
})
export class AppComponent {
  public readonly rootPath: string;

  constructor(@Optional() @Inject(ROOT_PATH) rootPath: string) {
    this.rootPath = rootPath || '/';
  }

  public prepareRouteTransition(outlet: RouterOutlet): any {
    if (!outlet.isActivated) {
      return undefined;
    }

    return outlet.activatedRoute.component.toString();
  }
}
