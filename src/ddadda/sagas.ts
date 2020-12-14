import { defaultAsync } from './actions';
import { getData } from '../api/ddaddaData';
import {
  defaultDataType,
  ddaddaData,
  filterData,
  mapFilterData,
  mapFilterDataType,
  sortFilterData,
} from '../utils/filter';
import { all, call, put, takeEvery, fork, take } from 'redux-saga/effects';

function* getDefaultDataSaga() {
  try {
    const defaultData: ddaddaData[] = yield call(getData);
    const filterDefaultData: defaultDataType = filterData(defaultData);
    const mapDefaultData: mapFilterDataType = mapFilterData(filterDefaultData);
    yield put(defaultAsync.success(mapDefaultData));
  } catch (error) {
    yield put(defaultAsync.failure(error));
  }
}

function* watchSaga() {
  yield takeEvery(defaultAsync.request, getDefaultDataSaga);
}

export default function* ddaddaSaga() {
  yield all([fork(watchSaga)]);
}
