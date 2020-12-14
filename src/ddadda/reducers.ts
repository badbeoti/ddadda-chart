import { createReducer } from 'typesafe-actions';
import { DEFAULT_REQUEST, DEFAULT_SUCCESS, DEFAULT_FAILURE } from './actions';
import { DefaultState, DefaultAction } from './types';

const initialState: DefaultState = {
  default: { loading: false, error: null, data: null },
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

export { defaultData };
