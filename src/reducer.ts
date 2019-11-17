import StoreType from './storeType';
const reducer = (state: StoreType, action: any) => {
    switch (action.type) {
        case 'setUser':
            return Object.assign({}, state, {
                user: action.payload
            });
        default:
            return state;
    }
};

export default reducer;