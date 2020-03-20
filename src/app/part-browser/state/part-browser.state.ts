import { PartList } from 'src/app/model';

export interface PartBrowserState {
  list: PartList;
  listLoading: boolean;
}

export const initalPartBrowserState: PartBrowserState = {
  list: null,
  listLoading: false
};
