import { useEffect, useState } from 'react';
import pb from './lib/pocketbase';

function App() {
  const [health, setHealth] = useState<string>('接続確認中...');

  useEffect(() => {
    const checkConnection = async () => {
      try {
        // PocketBaseのヘルスチェック
        await pb.health.check();
        setHealth('✅ PocketBaseに接続成功！');
        
        // 追加でコレクション一覧を取得してみる
        const collections = await pb.collections.getFullList();
        console.log('利用可能なコレクション:', collections);
      } catch (error) {
        setHealth('❌ PocketBaseに接続失敗');
        console.error('接続エラー:', error);
      }
    };

    checkConnection();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>PocketBase 接続テスト</h1>
      <p>{health}</p>
      <p>PocketBase URL: {import.meta.env.POCKETBASE_URL}</p>
    </div>
  );
}

export default App;