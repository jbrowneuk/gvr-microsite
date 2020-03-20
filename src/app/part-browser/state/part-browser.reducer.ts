import { PartBrowserActions, PartBrowserActionsType } from './part-browser.actions';
import { initalPartBrowserState, PartBrowserState } from './part-browser.state';

export function partBrowserReducer(
  state = initalPartBrowserState,
  action: PartBrowserActions
): PartBrowserState {
  switch (action.type) {
    case PartBrowserActionsType.LoadPartList: {
      return { ...state, listLoading: true };
    }

    case PartBrowserActionsType.LoadPartListFailure: {
      return { ...state, listLoading: false };
    }

    case PartBrowserActionsType.LoadPartListSuccess: {
      return { ...state, list: action.payload, listLoading: false };
    }

    default: {
      return state;
    }
  }
}
