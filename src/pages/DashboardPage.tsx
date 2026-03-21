import { SubscriptionList } from '../components/subscription/SubscriptionList';
import { usePocket } from '../context/AuthContext';

export function DashboardPage() {
  const { user } = usePocket();
  return (
    <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">ダッシュボード</h2>
        <p className="text-gray-600">ようこそ、{user?.name}さん！</p>
        <SubscriptionList />
      </div>
    </main>
  );
}