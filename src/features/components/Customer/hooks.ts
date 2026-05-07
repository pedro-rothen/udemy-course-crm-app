import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../store';
import { 
  fetchCustomersRequest, 
  createCustomerRequest, 
  updateCustomerRequest 
} from './reducers';
import { Customer } from './types';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useCustomers = () => {
  const dispatch = useAppDispatch();
  const { customers, loading, error } = useAppSelector((state) => state.customer);

  const fetchAll = () => dispatch(fetchCustomersRequest());
  const create = (customer: Omit<Customer, 'id'>) => dispatch(createCustomerRequest(customer));
  const update = (customer: Customer) => dispatch(updateCustomerRequest(customer));

  return {
    customers,
    loading,
    error,
    fetchAll,
    create,
    update,
  };
};
