import { PostDataWrapper } from '../model';
import {
    JournalActionsType, LoadPosts, LoadPostsFailure, LoadPostsSuccess
} from './journal.actions';

describe('Load Post action', () => {
  it('should have correct type', () => {
    const action = new LoadPosts(1);
    expect(action.type).toBe(JournalActionsType.LoadPosts);
  });

  it('should have page number as payload', () => {
    const page = 42069;
    const action = new LoadPosts(page);
    expect(action.payload).toBe(page);
  });
});

describe('Load Posts Success action', () => {
  const mockPostData: PostDataWrapper = {
    posts: [],
    page: 1,
    totalPages: 5
  };

  it('should have correct type', () => {
    const action = new LoadPostsSuccess(mockPostData);
    expect(action.type).toBe(JournalActionsType.LoadPostsSuccess);
  });

  it('should have correct payload', () => {
    const action = new LoadPostsSuccess(mockPostData);
    expect(action.payload).toBe(mockPostData);
  });
});

describe('Load Posts Failure action', () => {
  it('should have correct type', () => {
    const action = new LoadPostsFailure();
    expect(action.type).toBe(JournalActionsType.LoadPostsFailure);
  });
});
