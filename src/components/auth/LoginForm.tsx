import {useState, type FormEvent, } from "react";
import { usePocket } from "../../context/AuthContext";

export function LoginForm(){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = usePocket();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        setLoading(true);
        try{
            await login(email,password);
        }catch (error) {
            setError('ログインに失敗しました');
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    return(
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">ログイン</h2>
        
        {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
            </div>
        )}
        
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
        
        <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
            {loading ? 'ログイン中...' : 'ログイン'}
        </button>
        </form>
    );
}