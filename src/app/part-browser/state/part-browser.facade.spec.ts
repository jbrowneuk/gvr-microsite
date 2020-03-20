import { of } from 'rxjs';
import { IMock, It, Mock, Times } from 'typemoq';

import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';

import { PartsListService } from '../parts-list.service';
import { LoadPartList } from './part-browser.actions';
import { PartBrowserFacade } from './part-browser.facade';
import { getPartList, getPartListLoading } from './part-browser.selectors';
import { PartBrowserState } from './part-browser.state';

describe('Part Browser facade', () => {
  const mockPartsList = {
    lastUpdate: '',
    categories: []
  };

  let mockStore: IMock<Store<PartBrowserState>>;
  let facade: PartBrowserFacade;

  beforeEach(() => {
    mockStore = Mock.ofType<Store<PartBrowserState>>();
    mockStore
      .setup(store => store.select(It.is(s => <any>s === getPartList)))
      .returns(() => of(mockPartsList));
    mockStore
      .setup(store => store.select(It.is(s => <any>s === getPartListLoading)))
      .returns(() => of(false));

    facade = new PartBrowserFacade(mockStore.object);
  });

  it('should dispatch load part list action', () => {
    facade.loadPartList();
    const action = new LoadPartList();
    mockStore.verify(s => s.dispatch(It.isValue(action)), Times.once());
    expect().nothing();
  });

  it('should dispatch load part list action only once if called multiple times', () => {
    for (let i = 0; i < 16; i++) {
      facade.loadPartList();
    }

    const action = new LoadPartList();
    mockStore.verify(s => s.dispatch(It.isValue(action)), Times.once());
    expect().nothing();
  });
});
