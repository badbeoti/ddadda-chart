import { combineReducers } from 'redux';
import { defaultData } from './reducers';
import ddaddaSaga from './sagas';
import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({ defaultData });

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

export function* rootSaga() {
  yield all([ddaddaSaga()]);
}
