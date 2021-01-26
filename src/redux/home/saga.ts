import { Alert } from 'react-native';
import { put, call, takeLatest } from 'redux-saga/effects';
import {
  FetchApartmentAction,
  SEARCH_APARTMENT,
  FETCH_APARTMENT,
  SET_APARTMENT,
  FETCH_APARTMENT_FAILED,
} from '../types/actions/home';
import API from '../../services/api';

export function* getApartmentListByQuery(action: FetchApartmentAction) {
  yield put({ type: SEARCH_APARTMENT });
  const response = yield call(API.fetchApartments, action.payload);
  if (response.status === 200) {
    yield put({
      type: SET_APARTMENT,
      payload: response.data.result.map((i: any) => ({
        ...i,
        images: JSON.parse(i.images),
      })),
    });
  } else {
    yield put({
      type: FETCH_APARTMENT_FAILED,
    });
    Alert.alert('Error', 'API failed');
  }
}

function* HomeSaga(): Generator {
  yield takeLatest(FETCH_APARTMENT, getApartmentListByQuery);
}

export default HomeSaga;
