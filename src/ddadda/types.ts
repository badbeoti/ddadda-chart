import * as actions from './actions';
import { ActionType } from 'typesafe-actions';
import { defaultDataType } from '../utils/filter';

export type DefaultAction = ActionType<typeof actions>;

export type DefaultState = {
  default: {
    loading: boolean;
    error: Error | null;
    data: defaultDataType | null;
  };
};

export type DivisionState = {
  default: {
    data: DivisionItemState[];
  };
};

export type DivisionItemState = { name: string; id: number; isSelect: boolean };
