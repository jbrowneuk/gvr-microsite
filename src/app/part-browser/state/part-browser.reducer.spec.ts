import { LoadPartList, LoadPartListFailure, LoadPartListSuccess } from './part-browser.actions';
import { partBrowserReducer } from './part-browser.reducer';
import { PartBrowserState } from './part-browser.state';

describe('Part Browser reducer', () => {
  const initialState: PartBrowserState = {
    list: null,
    listLoading: false
  };

  const mockPartList = {
    lastUpdate: '',
    categories: []
  };

  it('should set loading to true on LoadPartList action', () => {
    const action = new LoadPartList();
    const result = partBrowserReducer(initialState, action);
    expect(result.listLoading).toBeTrue();
  });

  it('should set loading to false on LoadPartListSuccess action', () => {
    const action = new LoadPartListSuccess(mockPartList);
    const result = partBrowserReducer(initialState, action);
    expect(result.listLoading).toBeFalse();
  });

  it('should set part list on LoadPartListSuccess action', () => {
    const action = new LoadPartListSuccess(mockPartList);
    const result = partBrowserReducer(initialState, action);
    expect(result.list).toEqual(mockPartList);
  });

  it('should set loading to false on LoadPartListFailure action', () => {
    const action = new LoadPartListFailure();
    const result = partBrowserReducer(initialState, action);
    expect(result.listLoading).toBeFalse();
  });

  it('should not change part list on LoadPartListFailure action', () => {
    const action = new LoadPartListFailure();
    const result = partBrowserReducer(initialState, action);
    expect(result.listLoading).toBeFalse();
    expect(result.list).toEqual(initialState.list);
  });
});
