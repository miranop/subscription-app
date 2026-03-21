import type { Subscription } from '../../types/subscription';

interface Props {
  subscription: Subscription;
}

const billingCycleLabel: Record<string, string> = {
  monthly: '月払い',
  yearly: '年払い',
  weekly: '週払い',
};

const statusColor: Record<string, string> = {
  active: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
  paused: 'bg-yellow-100 text-yellow-700',
};

export function SubscriptionCard({ subscription }: Props) {
  const formattedDate = new Date(subscription.next_billing_date).toLocaleDateString('ja-JP');

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5">
      <p className="text-xl font-medium text-gray-900 mb-4">{subscription.name}</p>
      <div className="border-t border-gray-100 pt-3 flex flex-col gap-2">
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">金額</span>
          <span className="text-sm text-gray-900">¥{subscription.price.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">次回請求日</span>
          <span className="text-sm text-gray-900">{formattedDate}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">サイクル</span>
          <span className="text-sm text-gray-900">{billingCycleLabel[subscription.billing_cycle]}</span>
        </div>
      </div>
      <div className="border-t border-gray-100 mt-4 pt-3 flex gap-2">
        <span className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-700">
          {subscription.category}
        </span>
        <span className={`text-xs px-3 py-1 rounded-full ${statusColor[subscription.status]}`}>
          {subscription.status}
        </span>
      </div>
    </div>
  );
}