import type { AuthModel } from "pocketbase";
import React, { createContext, useContext, useEffect, useState } from "react";
import pb from "../lib/pocketbase";

// 型定義
interface AuthContextType {
  register: (email: string, password: string, name: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  user: AuthModel | null;
  token: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState(pb.authStore.token);
    const [user, setUser] = useState<AuthModel | null>(pb.authStore.record);

    useEffect(() => {
        return pb.authStore.onChange((token,record) => {
            setToken(token);
            setUser(record);
        });
    },[])

    async function register(email: string, password: string, name: string){
        try{
            const data = {
                email,
                password,
                passwordConfirm: password,
                name,
            }
            //ユーザー作成とログインをそのまま行う
            await pb.collection("users").create(data);
            await pb.collection("users").authWithPassword(email,password);
        }catch(error){
            console.error("Registration error:", error);
            throw error;
        }
    }
    async function login(email:string,password: string) {
        await pb.collection("users").authWithPassword(email, password);
    }
    async function logout() {
        pb.authStore.clear();
    }
    return(
        <AuthContext.Provider value={{register,login,logout,user,token}}>
            {children}
        </AuthContext.Provider>
    )
}
// eslint-disable-next-line react-refresh/only-export-components
export const usePocket = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("usePocket must be used within an AuthProvider");
  }
  return context;
};