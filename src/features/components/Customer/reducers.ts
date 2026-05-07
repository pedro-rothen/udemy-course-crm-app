import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Customer, CustomerState } from './types';

const initialState: CustomerState = {
  customers: [],
  loading: false,
  error: null,
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    fetchCustomersRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCustomersSuccess: (state, action: PayloadAction<Customer[]>) => {
      state.loading = false;
      state.customers = action.payload;
    },
    fetchCustomersFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    createCustomerRequest: (state, _action: PayloadAction<Omit<Customer, 'id'>>) => {
      state.loading = true;
      state.error = null;
    },
    createCustomerSuccess: (state, action: PayloadAction<Customer>) => {
      state.loading = false;
      state.customers.push(action.payload);
    },
    createCustomerFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateCustomerRequest: (state, _action: PayloadAction<Customer>) => {
      state.loading = true;
      state.error = null;
    },
    updateCustomerSuccess: (state, action: PayloadAction<Customer>) => {
      state.loading = false;
      const index = state.customers.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.customers[index] = action.payload;
      }
    },
    updateCustomerFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { 
  fetchCustomersRequest, 
  fetchCustomersSuccess, 
  fetchCustomersFailure,
  createCustomerRequest,
  createCustomerSuccess,
  createCustomerFailure,
  updateCustomerRequest,
  updateCustomerSuccess,
  updateCustomerFailure,
} = customerSlice.actions;

export default customerSlice.reducer;
