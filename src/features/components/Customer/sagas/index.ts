import { call, put, takeLatest, all, select } from 'redux-saga/effects';
import { customerService } from '../services';
import { 
  fetchCustomersRequest, 
  fetchCustomersSuccess, 
  fetchCustomersFailure,
  createCustomerRequest,
  createCustomerSuccess,
  createCustomerFailure,
  updateCustomerRequest,
  updateCustomerSuccess,
  updateCustomerFailure
} from '../reducers';
import { Customer } from '../types';
import { PayloadAction } from '@reduxjs/toolkit';
import { setItem, getItem } from '../../../../utilities/async_storage';
import { RootState } from '../../../../store';

const CUSTOMERS_STORAGE_KEY = 'CUSTOMERS_STORAGE_KEY';

function* handleFetchCustomers() {
  try {
    let customers: Customer[] = yield call(getItem, CUSTOMERS_STORAGE_KEY);
    
    if (!customers || customers.length === 0) {
      customers = yield call(customerService.fetchCustomers);
      yield call(setItem, CUSTOMERS_STORAGE_KEY, customers);
    }
    
    yield put(fetchCustomersSuccess(customers));
  } catch (error: any) {
    yield put(fetchCustomersFailure(error.message || 'Failed to fetch customers'));
  }
}

function* handleCreateCustomer(action: PayloadAction<Omit<Customer, 'id'>>) {
  try {
    const newCustomer: Customer = yield call(customerService.createCustomer, action.payload);
    yield put(createCustomerSuccess(newCustomer));
    
    const customers: Customer[] = yield select((state: RootState) => state.customer.customers);
    yield call(setItem, CUSTOMERS_STORAGE_KEY, customers);
  } catch (error: any) {
    yield put(createCustomerFailure(error.message || 'Failed to create customer'));
  }
}

function* handleUpdateCustomer(action: PayloadAction<Customer>) {
  try {
    const updatedCustomer: Customer = yield call(customerService.updateCustomer, action.payload);
    yield put(updateCustomerSuccess(updatedCustomer));
    
    const customers: Customer[] = yield select((state: RootState) => state.customer.customers);
    yield call(setItem, CUSTOMERS_STORAGE_KEY, customers);
  } catch (error: any) {
    yield put(updateCustomerFailure(error.message || 'Failed to update customer'));
  }
}

export function* watchCustomerSagas() {
  yield takeLatest(fetchCustomersRequest.type, handleFetchCustomers);
  yield takeLatest(createCustomerRequest.type, handleCreateCustomer);
  yield takeLatest(updateCustomerRequest.type, handleUpdateCustomer);
}

export default function* customerSaga() {
  yield all([
    watchCustomerSagas(),
  ]);
}
