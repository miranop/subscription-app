import{ useEffect, useState } from "react";
import { usePocket } from "../../context/AuthContext";
import { toSubscription, type Subscription } from "../../types/subscription";
import pb from "../../lib/pocketbase";

export function SubscriptionList(){
    const {user} = usePocket();
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(''); 

    useEffect(() =>{
        const getList = async () =>{
            try{
                const Lists = await pb.collection('subscription').getFullList({
                    filter: pb.filter('user = {:userId}',{userId: user?.id}),
                });
                setSubscriptions(Lists.map(toSubscription));
            }catch(e){
                setError("データの取得に失敗しました");
                console.error(e);
            }finally{
                setLoading(false);
            }
        };
        getList();
    },[user?.id]);

    if(loading) return <div>読み込み中...</div>
    if(error) return <div>{error}</div>

    return(
        <div>
            {subscriptions.map((sub) =>(
                <div key={sub.id}>{sub.name}</div>
            ))}
        </div>
    )
}