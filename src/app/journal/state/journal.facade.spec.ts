import { of } from 'rxjs';
import { IMock, It, Mock, Times } from 'typemoq';

import { Store } from '@ngrx/store';

import { PostDataWrapper } from '../model';
import { LoadPosts } from './journal.actions';
import { JournalFacade } from './journal.facade';
import { getPostList, getPostListLoading } from './journal.selectors';
import { JournalState } from './journal.state';

describe('Journal facade', () => {
  const mockPostData: PostDataWrapper = {
    posts: [],
    page: 1,
    totalPages: 4
  };

  let mockStore: IMock<Store<JournalState>>;
  let facade: JournalFacade;

  beforeEach(() => {
    mockStore = Mock.ofType<Store<JournalState>>();
    mockStore
      .setup(store => store.select(It.is((s: any) => s === getPostList)))
      .returns(() => of(mockPostData));
    mockStore
      .setup(store => store.select(It.is((s: any) => s === getPostListLoading)))
      .returns(() => of(false));

    facade = new JournalFacade(mockStore.object);
  });

  it('should dispatch load posts action', () => {
    const page = 1;
    facade.loadPostList(page);
    const action = new LoadPosts(page);
    mockStore.verify(s => s.dispatch(It.isValue(action)), Times.once());
    expect().nothing();
  });
});
