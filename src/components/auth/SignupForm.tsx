import { type FormEvent, useState } from "react";
import { usePocket } from "../../context/AuthContext";

export function SignupForm() {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [name, setName] = useState('');
    const {register} = usePocket();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        setError('');

        if(password != passwordConfirm){
            setError("パスワードが一致しません");
            return;
        }
        setLoading(true);

        try{
            await register(email,password,name);
        }catch(error){
            setError("サインアップに失敗しました");
            console.error(error);
        }finally{
            setLoading(false);
        }
    }
    return(
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6">
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                名前
                </label>
                <input
                id="name"
                type="text"
                placeholder=""
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                メールアドレス
                </label>
                <input
                id="email"
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            
            <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                パスワード
                </label>
                <input
                id="password"
                type="password"
                placeholder="パスワード"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="mb-6">
                <label htmlFor="passwordConfirm" className="block text-sm font-medium mb-2">
                パスワード（確認）
                </label>
                <input
                id="passwordConfirm"
                type="password"
                placeholder="パスワードを再入力"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                required
                minLength={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            
            <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                {loading ? '登録中...' : '新規登録'}
            </button>
        </form>
    )
}