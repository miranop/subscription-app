import { useEffect, useState, type FormEvent } from "react";
import { usePocket } from "../../context/AuthContext";
import type { BillingCycle, Category, Status, Subscription } from "../../types/subscription";
import pb from "../../lib/pocketbase";

interface Props{
    isOpen: boolean,
    onClose: () => void;
    onSuccess: () => void;
    subscription?: Subscription; //フォーム編集用
}
export function SubscriptionForm({isOpen,onClose,onSuccess,subscription}: Props){
    const { user } = usePocket();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
    const [nextBillingDate, setNextBillingDate] = useState('');
    const [category, setCategory] = useState<Category>('entertainment');
    const [status, setStatus] = useState<Status>('active');
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const isEditing = subscription !== undefined;

    useEffect(() => {
        if(subscription){
            setName(subscription.name);
            setPrice(String(subscription.price));
            setBillingCycle(subscription.billing_cycle);
            setNextBillingDate(subscription.next_billing_date.slice(0, 10));
            setCategory(subscription.category);
            setStatus(subscription.status);
            setNotes(subscription.notes);
        }else{
            setName('');
            setPrice('');
            setBillingCycle('monthly');
            setNextBillingDate('');
            setCategory('entertainment');
            setStatus('active');
            setNotes('');
        }
    },[subscription,isOpen]);
    
    if(!isOpen) return null;

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try{
            const data = {
                name,
                price: Number(price),
                billing_cycle: billingCycle,
                next_billing_date: nextBillingDate,
                category,
                status,
                notes,
                user: user?.id,
            };
            if(isEditing){
                await pb.collection('subscription').update(subscription.id,data);
            }else{
                await pb.collection('subscription').create(data);
            }
            onSuccess();
            onClose();
        }catch(e){
            setError('追加に失敗しました');
            console.error(e);
        }finally{
            setLoading(false);
        }
    };
    return (
        <div
        className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
        onClick={onClose}
        >
        <div
            className="bg-white rounded-xl p-6 w-full max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium">{isEditing ? 'サブスクを編集' : 'サブスクを追加'}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>

            {error && (
            <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
                {error}
            </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
                <label className="block text-sm font-medium mb-1">サービス名</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">金額（円）</label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">サイクル</label>
                <select value={billingCycle} onChange={(e) => setBillingCycle(e.target.value as BillingCycle)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="monthly">月払い</option>
                <option value="yearly">年払い</option>
                <option value="weekly">週払い</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">次回請求日</label>
                <input type="date" value={nextBillingDate} onChange={(e) => setNextBillingDate(e.target.value)} required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">カテゴリ</label>
                <select value={category} onChange={(e) => setCategory(e.target.value as Category)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="entertainment">entertainment</option>
                <option value="productivity">productivity</option>
                <option value="development">development</option>
                <option value="health">health</option>
                <option value="other">other</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">ステータス</label>
                <select value={status} onChange={(e) => setStatus(e.target.value as Status)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="active">active</option>
                <option value="paused">paused</option>
                <option value="cancelled">cancelled</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">メモ</label>
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <button type="submit" disabled={loading}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg text-sm disabled:bg-gray-400">
                {loading ? '処理中...' : isEditing ? '更新する' : '追加する'}
            </button>
            </form>
        </div>
        </div>
    );
}