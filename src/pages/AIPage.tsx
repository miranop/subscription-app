import { useEffect, useState, type FormEvent } from "react";
import pb from "../lib/pocketbase";
import { usePocket } from "../context/AuthContext";
import { toSubscription, } from "../types/subscription";
import Anthropic from "@anthropic-ai/sdk";

export function AiPage() {
    const { user } = usePocket();
    const [question,setquestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [usageCount, setUsageCount] = useState(0); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    useEffect(() =>{
      const UsageCount = async() => {
        try{
          const use_count = await pb.collection('ai_use').getFullList({
            filter: pb.filter('user = {:userId} && used_at >= {:today}',{
              userId: user?.id,
              today: new Date().toISOString().slice(0, 10) + ' 00:00:00'
            })
          });
          setUsageCount(use_count.length);
        }catch(e){
          setError("データの取得に失敗しました");
          console.error(e);
        }finally{
          setLoading(false);
        }
      }
      UsageCount();
    },[user?.id])

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        if(usageCount >= 5){
          setError('本日の使用回数を超えています');
          setLoading(false);
          return
        }else{
          const user_info = await pb.collection('subscription').getFullList({
            filter: pb.filter('user = {:userId}',{userId: user?.id}),
          });
          const subscriptions = user_info.map(toSubscription);
          const client = new Anthropic({
            apiKey: import.meta.env.VITE_CLAUDE_API,
            dangerouslyAllowBrowser: true,
          });
          const systemPrompt = `
            あなたはサブスクリプション管理のアドバイザーです。
            ユーザーのサブスク情報をもとにアドバイスしてください。

            ## ユーザーのサブスク一覧
            ${subscriptions.map(sub => 
              `- ${sub.name}: ¥${sub.price}/${sub.billing_cycle} (${sub.status})`
            ).join('\n')}
          `;
          const claude_answer = await client.messages.create({
            model: "claude-opus-4-6",
            max_tokens: 1024,
            system: systemPrompt,
            messages: [{role: 'user',content: question}]
          })

          const block = claude_answer.content[0];
          if (block.type === 'text') {
            await pb.collection('ai_use').create({
                user: user?.id,
                used_at: new Date().toISOString(),
            });
            setUsageCount(prev => prev + 1);
            setAnswer(block.text);
          }
        }
    };
    return(
      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-medium">AIに相談する</h2>
            <p className="text-sm text-gray-500 mt-1">サブスク情報をもとにアドバイスします</p>
          </div>
          <div className="bg-gray-50 rounded-lg px-4 py-2 text-center">
            <p className="text-xs text-gray-500">本日の残り</p>
            <p className="text-lg font-medium">{5 - usageCount} / 5</p>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-100 p-5 mb-4">
          <label className="block text-sm text-gray-500 mb-2">質問を入力してください</label>
          <textarea
            value={question}
            onChange={(e) => setquestion(e.target.value)}
            rows={4}
            placeholder="例：今月の支出が多いので、解約できるサブスクがあれば教えてください。"
            required
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex justify-end mt-3">
            <button
              type="submit"
              disabled={loading || usageCount >= 5}
              className="bg-gray-900 text-white text-sm px-5 py-2 rounded-lg disabled:bg-gray-300"
            >
              {loading ? '送信中...' : '送信する'}
            </button>
          </div>
        </form>

        {answer && (
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <p className="text-sm text-gray-500 mb-2">回答</p>
            <p className="text-sm text-gray-900 leading-relaxed whitespace-pre-wrap">{answer}</p>
          </div>
        )}
      </main>
    );
}