import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { RouteTransitions } from './route-transitions';

@Component({
  selector: 'gvr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: RouteTransitions
})
export class AppComponent {
  public readonly rootPath = '/';

  public prepareRouteTransition(outlet: RouterOutlet): any {
    if (!outlet.isActivated) {
      return undefined;
    }

    return outlet.activatedRoute.component.toString();
  }
}
