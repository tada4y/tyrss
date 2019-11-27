import { StoreType } from './storeType';
import { SET_USER, ADD_URL, ADD_URLS, REMOVE_URL, ADD_FEED, CLEAR_FEEDS, ADD_FILTER, CLEAR_FILTER } from './actions';
const reducer = (state: StoreType, action: any) => {
    switch (action.type) {
        case SET_USER:
            return Object.assign({}, state, {
                user: action.payload
            });
        case ADD_URL:
            return Object.assign({}, state, {
                urls: [...state.urls, action.payload]
            });
        case ADD_URLS:
            const payload = action.payload || [];
            return Object.assign({}, state, {
                urls: [
                    ...state.urls, 
                    ...payload
                ]
            });
        case REMOVE_URL:
            return Object.assign({}, state, {
                urls: [...state.urls.filter((e, idx) => idx !== action.payload)]
            });
        case ADD_FEED:
            return Object.assign({}, state, {
                feeds: [...state.feeds, action.payload]
            });
        case CLEAR_FEEDS:
            return Object.assign({}, state, {
                feeds: []
            });
        case ADD_FILTER: 
            return Object.assign({}, state, {
                filter: [...state.filter, action.payload]
            });
        case CLEAR_FILTER:
            return Object.assign({}, state, {
                filter: []
            });
        default:
            return state;
    }
};

export default reducer;