import { PostDataWrapper } from '../model';

export interface JournalState {
  posts: PostDataWrapper;
  postsLoading: boolean;
}

export const initialJournalState = {
  posts: null,
  postsLoading: false
};
