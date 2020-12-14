import { AxiosError } from 'axios';
import { createAsyncAction } from 'typesafe-actions';
import { mapFilterDataType } from '../utils/filter';

export const DEFAULT_REQUEST = 'DEFAULT_REQUEST';
export const DEFAULT_SUCCESS = 'DEFAULT_SUCCESS';
export const DEFAULT_FAILURE = 'DEFAULT_FAILURE';

export const defaultAsync = createAsyncAction(DEFAULT_REQUEST, DEFAULT_SUCCESS, DEFAULT_FAILURE)<
  undefined,
  mapFilterDataType,
  AxiosError
>();
