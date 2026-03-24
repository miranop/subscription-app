import { useState } from 'react';
import { SubscriptionList } from '../components/subscription/SubscriptionList';
import { usePocket } from '../context/AuthContext';
import { SubscriptionForm } from '../components/subscription/SubscriptionForm';
import type { Subscription } from '../types/subscription';

export function DashboardPage() {
  const { user } = usePocket();
  const [isOpen, setIsOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [editingSubscription, setEditingSubscription] = useState<Subscription | undefined>(undefined);
  return (
    <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">ダッシュボード</h2>
        <p className="text-gray-600">ようこそ、{user?.name}さん！</p>
        <div>
          <button
          onClick={() => setIsOpen(true)}className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-lg">
            追加
          </button>
        </div>
        <SubscriptionForm isOpen={isOpen} onClose={() => setIsOpen(false)}onSuccess={() => setRefreshKey(prev => prev + 1)} 
        subscription={editingSubscription}/>
        <SubscriptionList refreshKey={refreshKey}  onEdit={(sub) => { setEditingSubscription(sub); setIsOpen(true); }}/>
      </div>
    </main>
  );
}