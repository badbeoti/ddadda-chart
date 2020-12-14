import * as actions from './actions';
import { ActionType } from 'typesafe-actions';
import { mapFilterDataType } from '../utils/filter';

export type DefaultAction = ActionType<typeof actions>;

export type DefaultState = {
  default: { loading: boolean; error: Error | null; data: mapFilterDataType | null };
};
