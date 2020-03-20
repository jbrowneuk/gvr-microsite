import { createFeatureSelector, createSelector } from '@ngrx/store';

import { PartBrowserState } from './part-browser.state';

export const partBrowserFeatureName = 'PartBrowser';

export const getPartBrowserState = createFeatureSelector<PartBrowserState>(
  partBrowserFeatureName
);

export const getPartList = createSelector(
  getPartBrowserState,
  state => state.list
);

export const getPartListLoading = createSelector(
  getPartBrowserState,
  state => state.listLoading
);
