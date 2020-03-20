import {
    LoadPartList, LoadPartListFailure, LoadPartListSuccess, PartBrowserActionsType
} from './part-browser.actions';

describe('Load Part List action', () => {
  it('should have correct type', () => {
    const action = new LoadPartList();
    expect(action.type).toBe(PartBrowserActionsType.LoadPartList);
  });
});

describe('Load Part List Success action', () => {
  const mockPartList = {
    lastUpdate: '',
    categories: []
  };

  it('should have correct type', () => {
    const action = new LoadPartListSuccess(mockPartList);
    expect(action.type).toBe(PartBrowserActionsType.LoadPartListSuccess);
  });

  it('should have correct payload', () => {
    const action = new LoadPartListSuccess(mockPartList);
    expect(action.payload).toBe(mockPartList);
  });
});

describe('Load Part List Failure action', () => {
  it('should have correct type', () => {
    const action = new LoadPartListFailure();
    expect(action.type).toBe(PartBrowserActionsType.LoadPartListFailure);
  });
});
