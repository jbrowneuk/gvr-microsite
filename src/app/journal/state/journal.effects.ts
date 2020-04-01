import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { JournalService } from '../journal.service';
import {
    JournalActionsType, LoadPosts, LoadPostsFailure, LoadPostsSuccess, LoadSinglePost,
    LoadSinglePostFailure, LoadSinglePostSuccess
} from './journal.actions';

@Injectable()
export class JournalEffects {
  @Effect()
  public loadPosts$ = this.actions.pipe(
    ofType(JournalActionsType.LoadPosts),
    switchMap((action: LoadPosts) =>
      this.service.fetchPosts(action.payload).pipe(
        map(r => new LoadPostsSuccess(r)),
        catchError(() => of(new LoadPostsFailure()))
      )
    )
  );

  @Effect()
  public loadSinglePost$ = this.actions.pipe(
    ofType(JournalActionsType.LoadSinglePost),
    switchMap((action: LoadSinglePost) =>
      this.service.fetchPostBySlug(action.payload).pipe(
        map(r => new LoadSinglePostSuccess(r)),
        catchError(() => of(new LoadSinglePostFailure()))
      )
    )
  );

  constructor(private actions: Actions, private service: JournalService) {}
}
