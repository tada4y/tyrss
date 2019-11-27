interface StoreType {
    user: any;
    urls: string[];
    feeds: FeedType[][];
    filter: string[];
};

interface FeedType {
    channel: string;
    title: string;
    link: string;
    date: Date;
    desc: string;
}

export {
    StoreType,
    FeedType,
};