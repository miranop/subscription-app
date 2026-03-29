import { useState } from "react";
import { LoginForm } from "../components/auth/LoginForm";
import { SignupForm } from "../components/auth/SignupForm";
import { usePocket } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export function AuthPage(){
  const { user } = usePocket();
  const [isLogin, setIsLogin] = useState(true);

  if(user){
    return <Navigate to="/"/>
  }

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