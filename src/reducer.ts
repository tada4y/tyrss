import StoreType from './storeType';
const reducer = (state: StoreType, action: any) => {
    switch (action.type) {
        case 'setUser':
            return Object.assign({}, state, {
                user: action.payload
            });
        case 'addFeed':
            return Object.assign({}, state, {
                feed: [...state.feed, action.payload]
            });
        case 'addFeeds':
            const payload = action.payload || [];
            return Object.assign({}, state, {
                feed: [
                    ...state.feed, 
                    ...payload
                ]
            });
        case 'removeFeed':
            return Object.assign({}, state, {
                feed: [...state.feed.filter((e, idx) => idx !== action.payload)]
            });
        default:
            return state;
    }
};

export default reducer;