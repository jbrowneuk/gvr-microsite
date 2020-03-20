import { getPartList, getPartListLoading, partBrowserFeatureName } from './part-browser.selectors';
import { PartBrowserState } from './part-browser.state';

const mockState: PartBrowserState = {
  list: {
    lastUpdate: '2020-03-20',
    categories: []
  },
  listLoading: false
};

const appState = {};
appState[partBrowserFeatureName] = mockState;

describe('getPartList', () => {
  it('should return part list from store', () => {
    const result = getPartList(appState);
    expect(result).toEqual(mockState.list);
  });
});

describe('getPartListLoading', () => {
  it('should return loading state from store', () => {
    const result = getPartListLoading(appState);
    expect(result).toEqual(mockState.listLoading);
  });
});
