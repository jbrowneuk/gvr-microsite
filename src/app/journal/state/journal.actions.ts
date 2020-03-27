import { Action } from '@ngrx/store';

import { PostDataWrapper } from '../model';

export enum JournalActionsType {
  LoadPosts = '[Journal] Load Start',
  LoadPostsSuccess = '[Journal] Load Successful',
  LoadPostsFailure = '[Journal] Load Failure'
}

export class LoadPosts implements Action {
  readonly type = JournalActionsType.LoadPosts;

  constructor(public payload: number) {}
}

export class LoadPostsSuccess implements Action {
  readonly type = JournalActionsType.LoadPostsSuccess;

  constructor(public payload: PostDataWrapper) {}
}

export class LoadPostsFailure implements Action {
  readonly type = JournalActionsType.LoadPostsFailure;
}

export type JournalActions = LoadPosts | LoadPostsSuccess | LoadPostsFailure;
