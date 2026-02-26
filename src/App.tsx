import { useState } from 'react';
import { AuthProvider, usePocket } from './context/AuthContext';
import { LoginForm } from './components/auth/LoginForm';
import { SignupForm } from './components/auth/SignupForm';



function AuthPage(){
  const [isLogin, setIsLogin] = useState(true);

  return(
    <div>
    {isLogin ? <LoginForm/> : <SignupForm/>}
    <div className="mt-4 text-center text-sm">
          {isLogin ? (
            <p>
              アカウントをお持ちでないですか？{' '}
              <button 
                onClick={() => setIsLogin(false)}
                className="text-blue-500 hover:text-blue-600 font-medium"
              >
                新規登録
              </button>
            </p>
          ) : (
            <p>
              アカウントをお持ちですか？{' '}
              <button 
                onClick={() => setIsLogin(true)}
                className="text-blue-500 hover:text-blue-600 font-medium"
              >
                ログイン
              </button>
            </p>
          )}
        </div>
  </div>
  )
  
}

function AppContent() {
  const { user,logout } = usePocket();

  if (!user) {
    return <AuthPage />;
  }
  return(
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              サブスク管理
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-gray-700">
                {user.name}さん
              </span>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
              >
                ログアウト
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">ダッシュボード</h2>
          <p className="text-gray-600">ようこそ、{user.name}さん！</p>
          <p className="text-gray-500 mt-2">サブスク一覧機能は後で実装します。</p>
        </div>
      </main>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
       <AppContent />
    </AuthProvider>
  );
}

export default App;