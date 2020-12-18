import { action, createReducer } from 'typesafe-actions';
import { DEFAULT_REQUEST, DEFAULT_SUCCESS, DEFAULT_FAILURE, SELECT_DIVISION } from './actions';
import { DefaultState, DefaultAction, DivisionState } from './types';
import { divisionArr } from '../utils/filter';

const initialState: DefaultState = {
  default: { loading: false, error: null, data: null },
};

const initialDivision: DivisionState = {
  default: { data: divisionArr },
};

const defaultData = createReducer<DefaultState, DefaultAction>(initialState, {
  [DEFAULT_REQUEST]: (state) => ({
    ...state,
    default: {
      loading: true,
      error: null,
      data: null,
    },
  }),
  [DEFAULT_SUCCESS]: (state, action) => ({
    ...state,
    default: {
      loading: false,
      error: null,
      data: action.payload,
    },
  }),
  [DEFAULT_FAILURE]: (state, action) => ({
    ...state,
    default: {
      loading: false,
      error: action.payload,
      data: null,
    },
  }),
});

const selectDivision = createReducer<DivisionState, DefaultAction>(initialDivision, {
  [SELECT_DIVISION]: (state, action) => ({
    ...state,
    default: {
      data: action.payload,
    },
  }),
});

export { defaultData, selectDivision };
