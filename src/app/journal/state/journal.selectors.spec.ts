import { getPostList, getPostListLoading, journalFeatureName } from './journal.selectors';
import { JournalState } from './journal.state';

const mockState: JournalState = {
  posts: {
    posts: [],
    page: 1,
    totalPages: 4
  },
  postsLoading: false
};

const appState = {};
appState[journalFeatureName] = mockState;

describe('getPostList', () => {
  it('should return post list from store', () => {
    const result = getPostList(appState);
    expect(result).toEqual(mockState.posts);
  });
});

describe('getPostListLoading', () => {
  it('should return loading state from store', () => {
    const result = getPostListLoading(appState);
    expect(result).toEqual(mockState.postsLoading);
  });
});
