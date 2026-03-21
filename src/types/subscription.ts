import type { RecordModel } from "pocketbase";

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
  notes: string;
  user: string;
}

export function toSubscription(record: RecordModel): Subscription {
  return {
    id: record.id,
    name: record.name,
    price: record.price,
    billing_cycle: record.billing_cycle,
    next_billing_date: record.next_billing_date,
    category: record.category,
    status: record.status,
    notes: record.notes,
    user: record.user,
  };
}