'use client'

import GotchaFeed from "@/components/GotchaFeed/GotchaFeed";
import GotchaPub from "@/components/GotchaPub/GotchaPub";
import Sidebar from "@/components/Sidebar/Sidebar";
import { FeedEntity, FeedGotcha } from "@/model/Feed";
import { User } from "@/model/User";
import { getCurrentFeed } from "@/services/feedService";
import { useUserStore } from "@/store/user/userStore";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useRouter } from 'next/navigation'
import "react-loading-skeleton/dist/skeleton.css";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Feed() {
    const [feed, setFeed] = useState<FeedEntity>();
    const [feedGotchas, setFeedGotchas] = useState<FeedGotcha[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { data } = useUserStore();
    const [moreData, setMoreData] = useState(true);
    const [latest, setLatest] = useState(true);
    const [page, setPage] = useState(0);
    const itemsPage = 5;

    const myCallBack = () => {
        getFeed(false);
    }

    useEffect(() => {
        getFeed(true);
    }, []);

    const getFeed = (isLoad: boolean) => {
        setIsLoading(isLoad);
        getCurrentFeed()
            .then(t => {
                setFeed(t);
                console.log(t)
                setFeedGotchas(t.feed.slice(0, itemsPage));
                setMoreData(t.feed.length > itemsPage);
                setPage(1);
                setIsLoading(false);
            });
    }

    const filterFeed = (latestFl: boolean) => {
        setLatest(latestFl);
        if (latestFl) {
            let orderByCreation = feed!?.feed.sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime());
            setFeedGotchas(orderByCreation);
            return;
        }

        var filterTrend = feedGotchas.filter(f => !f.isRepost).sort((a, b) => b.qntdRepost - a.qntdRepost);
        setFeedGotchas(filterTrend!);
    }

    const filterOnType = (type: string) => {
        if (type === '') {
            setFeedGotchas(feed?.feed!);
            filterFeed(latest);
            return;
        }
        var filterType = feedGotchas?.filter(f => !f.isRepost && f.content.toLocaleLowerCase().includes(type.toLocaleLowerCase()));

        if (!latest) {
            setFeedGotchas(filterType!.sort((a, b) => b.qntdRepost - a.qntdRepost) ?? []);
        }

        setFeedGotchas(filterType! ?? []);
    }

    const incrementScroll = () => {
        var newItems = feedGotchas;
        const initialPosition = page * itemsPage;
        const range = initialPosition + itemsPage > feed!?.feed.length ? feed!?.feed.length : (initialPosition + itemsPage);
        for (let i = (page * itemsPage); i < range; i++) {
            newItems.push(feed!?.feed[i]);
        }
        setFeedGotchas(newItems);
        setPage(page + 1);
        setMoreData(newItems.length < feed!?.feed.length);
    }

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
                ) : feedGotchas && (
                    <InfiniteScroll next={incrementScroll} hasMore={moreData} loader={<p>loading...</p>} dataLength={feedGotchas.length}>
                        <GotchaFeed gotchaFeed={feedGotchas} filterFeed={filterFeed} filterOnType={filterOnType} />
                    </InfiniteScroll>
                )}
        </Sidebar>
    );
}
