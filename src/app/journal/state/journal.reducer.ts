import { JournalActions, JournalActionsType } from './journal.actions';
import { initialJournalState, JournalState } from './journal.state';

export function journalReducer(
  state = initialJournalState,
  action: JournalActions
): JournalState {
  switch (action.type) {
    case JournalActionsType.LoadPosts: {
      return { ...state, postsLoading: true };
    }

    case JournalActionsType.LoadPostsFailure: {
      return { ...state, postsLoading: false };
    }

    case JournalActionsType.LoadPostsSuccess: {
      return { ...state, posts: action.payload, postsLoading: false };
    }

    default: {
      return state;
    }
  }
}
