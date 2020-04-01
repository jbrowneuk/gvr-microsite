import { PostData, PostDataWrapper } from '../model';

export interface JournalState {
  posts: PostDataWrapper;
  currentPost: PostData;
  postsLoading: boolean;
}

export const initialJournalState: JournalState = {
  posts: null,
  currentPost: null,
  postsLoading: false
};
