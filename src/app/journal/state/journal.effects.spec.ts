import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { IMock, Mock } from 'typemoq';

import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';

import { JournalService } from '../journal.service';
import { PostDataWrapper } from '../model';
import { LoadPosts, LoadPostsFailure, LoadPostsSuccess } from './journal.actions';
import { JournalEffects } from './journal.effects';

describe('Journal effects', () => {
  const mockPostData: PostDataWrapper = {
    posts: [],
    page: 1,
    totalPages: 4
  };

  let actions: Observable<any>;
  let mockService: IMock<JournalService>;
  let effects: JournalEffects;

  beforeEach(() => {
    mockService = Mock.ofType<JournalService>();

    TestBed.configureTestingModule({
      providers: [
        JournalEffects,
        provideMockActions(() => actions),
        { provide: JournalService, useFactory: () => mockService.object }
      ]
    });

    effects = TestBed.inject(JournalEffects);
  });

  describe('loadPosts$', () => {
    it('should return LoadPostsSuccess action with the parts on success', () => {
      const page = 1;
      mockService
        .setup(s => s.fetchPosts(page))
        .returns(() => of(mockPostData));

      const inputAction = new LoadPosts(page);
      const outcomeAction = new LoadPostsSuccess(mockPostData);
      actions = hot('--a-', { a: inputAction });
      const expected = cold('--b', { b: outcomeAction });
      expect(effects.loadPosts$).toBeObservable(expected);
    });

    it('should return LoadPostsFailure action on failure', () => {
      const page = 1;
      mockService
        .setup(s => s.fetchPosts(page))
        .returns(() => throwError('nope'));

      const inputAction = new LoadPosts(page);
      const outcomeAction = new LoadPostsFailure();
      actions = hot('--a-', { a: inputAction });
      const expected = cold('--b', { b: outcomeAction });
      expect(effects.loadPosts$).toBeObservable(expected);
    });
  });
});
