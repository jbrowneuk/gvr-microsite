import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { IMock, Mock } from 'typemoq';

import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store } from '@ngrx/store';

import { PartsListService } from '../parts-list.service';
import { LoadPartList, LoadPartListFailure, LoadPartListSuccess } from './part-browser.actions';
import { PartBrowserEffects } from './part-browser.effects';
import { PartBrowserState } from './part-browser.state';

describe('Part Browser effects', () => {
  const mockPartsList = {
    lastUpdate: '',
    categories: []
  };

  let actions: Observable<any>;
  let mockService: IMock<PartsListService>;
  let effects: PartBrowserEffects;

  beforeEach(() => {
    mockService = Mock.ofType<PartsListService>();

    TestBed.configureTestingModule({
      providers: [
        PartBrowserEffects,
        provideMockActions(() => actions),
        { provide: PartsListService, useFactory: () => mockService.object }
      ]
    });

    effects = TestBed.get(PartBrowserEffects);
  });

  describe('loadParts$', () => {
    it('should return LoadPartListSuccess action with the parts on success', () => {
      mockService
        .setup(s => s.fetchPartList())
        .returns(() => of(mockPartsList));

      const inputAction = new LoadPartList();
      const outcomeAction = new LoadPartListSuccess(mockPartsList);
      actions = hot('--a-', { a: inputAction });
      const expected = cold('--b', { b: outcomeAction });
      expect(effects.loadParts$).toBeObservable(expected);
    });

    it('should return LoadPartListFailure action on failure', () => {
      mockService
        .setup(s => s.fetchPartList())
        .returns(() => throwError('nope'));

      const inputAction = new LoadPartList();
      const outcomeAction = new LoadPartListFailure();
      actions = hot('--a-', { a: inputAction });
      const expected = cold('--b', { b: outcomeAction });
      expect(effects.loadParts$).toBeObservable(expected);
    });
  });
});
