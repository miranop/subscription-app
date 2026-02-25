import {useState,  } from "react";
import { usePocket } from "../../context/AuthContext";

export function LoginForm(){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = usePocket();

    const handleSubmit = async (e: SubmitEvent) =>{
        e.preventDefault();
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
        <div></div>
    )
}