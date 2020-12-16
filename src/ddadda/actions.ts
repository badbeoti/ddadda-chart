import { AxiosError } from 'axios';
import { createAsyncAction, createAction } from 'typesafe-actions';
import { defaultDataType } from '../utils/filter';

export const DEFAULT_REQUEST = 'DEFAULT_REQUEST';
export const DEFAULT_SUCCESS = 'DEFAULT_SUCCESS';
export const DEFAULT_FAILURE = 'DEFAULT_FAILURE';

export const defaultAsync = createAsyncAction(DEFAULT_REQUEST, DEFAULT_SUCCESS, DEFAULT_FAILURE)<
  undefined,
  defaultDataType,
  AxiosError
>();

export const SELECT_DIVISION = 'SELECT_DIVISION';

export const selectDivision = createAction(SELECT_DIVISION)();
