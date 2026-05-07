import { Customer } from './types';

export const customerService = {
  fetchCustomers: async (): Promise<Customer[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [];
  },

  createCustomer: async (customer: Omit<Customer, 'id'>): Promise<Customer> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { ...customer, id: Math.random().toString(36).substr(2, 9) };
  },

  updateCustomer: async (customer: Customer): Promise<Customer> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return customer;
  },
};
