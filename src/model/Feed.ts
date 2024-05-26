export interface FeedEntity {
    feed: FeedGotcha[];
}

export interface FeedGotcha {
    id: string;
    userId: string;
    gotchaId: string;
    creationDate: Date;
    userName: string;
    userLastName: string;
    userNickname: string;
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
    qntdRepost: number;
}
