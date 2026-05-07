import { all } from 'redux-saga/effects';
import customerSaga from '../features/components/Customer/sagas';

export default function* rootSaga() {
  yield all([
    customerSaga(),
  ]);
}
