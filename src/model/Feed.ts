export interface FeedEntity {
    feed: FeedGotcha[];
    id: string;
}

export interface FeedGotcha {
    id: string;
    userId: string;
    gotchaId: string;
    creationDate: Date;
    userName: string;
    userLastName: string;
    userNickname: string;
    userImg: string;
    content: string;
    qntdRepost: number;
    isRepost: boolean;
    repostedGotcha?: FeedRepostedGotcha;
}

export interface FeedRepostedGotcha {
    id: string;
    userId: string;
    gotchaId: string;
    creationDate: Date;
    userName: string;
    userLastName: string;
    userNickname: string;
    content: string;
    userImg: string;
    qntdRepost: number;
}
