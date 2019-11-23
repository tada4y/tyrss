interface StoreType {
    user: any;
    urls: string[];
    feeds: FeedType[][];
};

interface FeedType {
    channel: string;
    title: string;
    link: string;
    date: Date;
}

export {
    StoreType,
    FeedType,
};