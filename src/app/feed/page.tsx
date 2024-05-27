'use client'

import GotchaFeed from "@/components/GotchaFeed/GotchaFeed";
import GotchaPub from "@/components/GotchaPub/GotchaPub";
import Sidebar from "@/components/Sidebar/Sidebar";
import { FeedEntity } from "@/model/Feed";
import { User } from "@/model/User";
import { getCurrentFeed } from "@/services/feedService";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Feed() {
    const [feed, setFeed] = useState<FeedEntity>();
    const [isLoading, setIsLoading] = useState(false);

    const newUser: User = {
        userId: '3a154232-c94d-4e47-8348-484a13be0a51',
        userName: 'buinguinho',
        userLastName: 'b',
        nickName: 'buinguinho',
    }

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
        getFeed(true);
    }, []);

    return (
        <Sidebar user={newUser}>
            <GotchaPub user={newUser} callback={myCallBack} />
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
