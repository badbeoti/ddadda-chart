import { defaultAsync } from './actions';
import { getData } from '../api/ddaddaData';
import { defaultDataType, ddaddaData, filterData } from '../utils/filter';
import { all, call, put, takeEvery, fork, take } from 'redux-saga/effects';

function* getDefaultDataSaga() {
  try {
    const defaultData: ddaddaData[] = yield call(getData);
    const filterDefaultData: defaultDataType = filterData(defaultData);
    yield put(defaultAsync.success(filterDefaultData));
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
