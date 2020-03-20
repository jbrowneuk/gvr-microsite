import { PartList } from 'src/app/model';

import { Action } from '@ngrx/store';

export enum PartBrowserActionsType {
  LoadPartList = '[Parts List] Load Start',
  LoadPartListSuccess = '[Parts List] Load Successful',
  LoadPartListFailure = '[Parts List] Load Failure'
}

export class LoadPartList implements Action {
  readonly type = PartBrowserActionsType.LoadPartList;
}

export class LoadPartListSuccess implements Action {
  readonly type = PartBrowserActionsType.LoadPartListSuccess;
  constructor(public payload: PartList) {}
}

export class LoadPartListFailure implements Action {
  readonly type = PartBrowserActionsType.LoadPartListFailure;
}

export type PartBrowserActions =
  | LoadPartList
  | LoadPartListSuccess
  | LoadPartListFailure;
