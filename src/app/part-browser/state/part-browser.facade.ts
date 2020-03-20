import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { LoadPartList } from './part-browser.actions';
import { getPartList, getPartListLoading } from './part-browser.selectors';
import { PartBrowserState } from './part-browser.state';

@Injectable({ providedIn: 'root' })
export class PartBrowserFacade {
  public readonly partList$ = this.store.select(getPartList);
  public readonly partListLoading$ = this.store.select(getPartListLoading);

  private hasRequested: boolean;

  constructor(private store: Store<PartBrowserState>) {}

  public loadPartList(): void {
    if (this.hasRequested) {
      return;
    }

    this.hasRequested = true;
    this.store.dispatch(new LoadPartList());
  }
}
