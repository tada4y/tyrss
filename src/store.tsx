import React, {
    useReducer
} from 'react';
import reducer from './reducer';
import { StoreType } from './storeType';

const initState: StoreType = {
    user: null,
    urls: [],
    feeds: [],
};

const Store = React.createContext<{state: StoreType, dispatch: React.Dispatch<any>}>({
    state: null, dispatch: null
});

const Provider = ({children}: {children:JSX.Element}) => {
    const [state, dispatch] = useReducer(reducer, initState);
    return (
        <Store.Provider value={{state, dispatch}}>
            {children}
        </Store.Provider>
    );
};

export { Store, Provider };