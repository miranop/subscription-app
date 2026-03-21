import { Link, useLocation } from 'react-router-dom';
import { usePocket } from "../../context/AuthContext"

export function Header(){
    const {user,logout} = usePocket();
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path

    return(
        <header className='bg-white border-b border-gray-200'>
            <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
                {/*アプリ名*/}
                <Link to={'/'}>
                    サブスク相談ツール
                </Link>

                {/*ナビゲーション(主にダッシュボードとAIへの相談機能)*/}
                <div className="flex items-center gap-1">
                    <Link
                        to="/"
                        className={`text-sm px-3 py-1.5 rounded-md transition-colors ${
                        isActive('/')
                            ? 'text-gray-900 bg-gray-100'
                            : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                    >
                        ダッシュボード
                    </Link>
                    <Link to={'/ai'}
                     className={`text-sm px-3 py-1.5 rounded-md transition-colors ${
                        isActive('/ai')
                        ? 'text-gray-900 bg-gray-100'
                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                    }`}>
                        AIに聞く
                    </Link>
                </div>

                {/*ログインするときにどうするかみたいな*/}
                <div>
                    {user ?(
                        <button
                            onClick={logout}
                            className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 text-sm font-medium flex items-center justify-center hover:bg-blue-100 transition-colors"
                            title={user.name}
                        >
                            {user.name?.charAt(0).toUpperCase()}
                        </button>
                    ) : (
                        <Link to={'/login'}className="text-sm px-3 py-1.5 rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors">
                            ログイン
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}