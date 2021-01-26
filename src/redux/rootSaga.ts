import { all } from 'redux-saga/effects';
import HomeSaga from './home/saga';

export default function* rootSaga(): Generator {
  yield all([HomeSaga()]);
}
