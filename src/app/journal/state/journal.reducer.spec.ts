import { PostDataWrapper } from '../model';
import { LoadPosts, LoadPostsFailure, LoadPostsSuccess } from './journal.actions';
import { journalReducer } from './journal.reducer';
import { JournalState } from './journal.state';

describe('Journal reducer', () => {
  const initialState: JournalState = {
    posts: null,
    postsLoading: false
  };

  const mockPostData: PostDataWrapper = {
    posts: [],
    page: 1,
    totalPages: 4
  };

  it('should set loading to true on LoadPosts action', () => {
    const action = new LoadPosts(1);
    const result = journalReducer(initialState, action);
    expect(result.postsLoading).toBeTrue();
  });

  it('should set loading to false on LoadPostsSuccess action', () => {
    const action = new LoadPostsSuccess(mockPostData);
    const result = journalReducer(initialState, action);
    expect(result.postsLoading).toBeFalse();
  });

  it('should set post data on LoadPostsSuccess action', () => {
    const action = new LoadPostsSuccess(mockPostData);
    const result = journalReducer(initialState, action);
    expect(result.posts).toEqual(mockPostData);
  });

  it('should set loading to false on LoadPostsFailure action', () => {
    const action = new LoadPostsFailure();
    const result = journalReducer(initialState, action);
    expect(result.postsLoading).toBeFalse();
  });

  it('should not change post data on LoadPostsFailure action', () => {
    const action = new LoadPostsFailure();
    const result = journalReducer(initialState, action);
    expect(result.postsLoading).toBeFalse();
    expect(result.posts).toEqual(initialState.posts);
  });
});
