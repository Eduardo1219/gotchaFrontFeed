'use client'

import GotchaFeed from "@/components/GotchaFeed/GotchaFeed";
import GotchaPub from "@/components/GotchaPub/GotchaPub";
import Sidebar from "@/components/Sidebar/Sidebar";
import { FeedEntity } from "@/model/Feed";
import { User } from "@/model/User";
import { getCurrentFeed } from "@/services/feedService";
import { useUserStore } from "@/store/user/userStore";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useRouter } from 'next/navigation'
import "react-loading-skeleton/dist/skeleton.css";

export default function Feed() {
    const [feed, setFeed] = useState<FeedEntity>();
    const [isLoading, setIsLoading] = useState(false);
    const { data } = useUserStore();
    const router = useRouter()

    const myCallBack = () => {
        getFeed(false);
    }

    const getFeed = (isLoad: boolean) => {
        setIsLoading(isLoad);
        getCurrentFeed()
            .then(t => {
                setFeed(t);
                setIsLoading(false);
            });
    }

    const repostItem = () => {

    }

    useEffect(() => {
        console.log(data, 'user data?')
        if (data.id == '' || data.id == null) {
            router.push('/')
            return;
        }
        getFeed(true);
    }, []);

    return (
        <Sidebar user={data}>
            <GotchaPub callback={myCallBack} />
            {
                isLoading ? (
                    <Skeleton
                        height={180}
                        width={'100%'}
                        style={{ marginTop: 30 }}
                        highlightColor={'white'}
                        baseColor={'gray'} />
                ) : feed && (
                    <GotchaFeed gotchaFeed={feed} />
                )}
        </Sidebar>
    );
}
