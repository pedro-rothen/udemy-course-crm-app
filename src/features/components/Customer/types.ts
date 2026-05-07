export interface Customer {
  id: string;
  name: string;
  email: string;
  region: string;
  company: string;
  status: 'Active' | 'Inactive';
}

export interface CustomerState {
  customers: Customer[];
  loading: boolean;
  error: string | null;
}
