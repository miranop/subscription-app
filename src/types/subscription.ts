export type BillingCycle = 'monthly' | 'yearly' | 'weekly';
export type Status = 'active' | 'cancelled' | 'paused';
export type Category = 'entertainment' | 'productivity' | 'development' | 'health' |'other';

export interface Subscription {
  id: string;
  name: string;
  price: number;
  billing_cycle: BillingCycle;
  next_billing_date: string;
  category: Category;
  status: Status;
  note: string;
  user: string;
}