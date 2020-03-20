import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { PartsListService } from '../parts-list.service';
import {
    LoadPartListFailure, LoadPartListSuccess, PartBrowserActionsType
} from './part-browser.actions';

@Injectable()
export class PartBrowserEffects {
  @Effect()
  public loadParts$ = this.actions.pipe(
    ofType(PartBrowserActionsType.LoadPartList),
    switchMap(() =>
      this.service.fetchPartList().pipe(
        map(r => new LoadPartListSuccess(r)),
        catchError(() => of(new LoadPartListFailure()))
      )
    )
  );

  constructor(private actions: Actions, private service: PartsListService) {}
}
