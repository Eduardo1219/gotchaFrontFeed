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
        userName: 'buinguinho',
        userLastName: 'b',
        nickName: 'buinguinho',
    }

    useEffect(() => {
        setIsLoading(true);
        getCurrentFeed()
            .then(t => {
                setFeed(t);
                setIsLoading(false);
            });
    }, []);

    return (
        <Sidebar user={newUser}>
            <GotchaPub user={newUser} />
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
