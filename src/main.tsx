/** @jsx jsx */
import React, {
    useState, 
    useEffect, 
    useContext, 
    useReducer
} from 'react';
import ReactDOM from 'react-dom';
import {
    HashRouter,
    Route,
    Link,
    Switch
} from 'react-router-dom';
import { jsx, Global } from '@emotion/core';
import { Store, Provider } from './store';
import {
    naviStyle, bodyStyle,
} from './styles';

const Home = () => {
    return (
        <React.Fragment>
            <h2>Home</h2>
        </React.Fragment>
    );
};

const Login = () => {
    return (
        <React.Fragment>
            <h2>Login/Logout</h2>
        </React.Fragment>
    );
};

const Navi = () => {
    const {state, dispatch} = useContext(Store);
    console.log(state, dispatch);
    let login = null;
    if (state.user) {
        login = 'Logout';
    } else {
        login = 'Login';
    }
    return (
        <ul css={naviStyle}>
            <li>
                <h1>TYRss</h1>
            </li>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/login">{login}</Link>
            </li>
        </ul>
    );
};

const App = () => {
    return (
        <HashRouter>
            <Provider>
                <React.Fragment>
                    <Global styles={bodyStyle} />
                    <Navi />
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                    </Switch>
                </React.Fragment>
            </Provider>
        </HashRouter>
    );
};

ReactDOM.render(<App />, document.getElementById('app'));

/*fetch('https://tyrssbackend.herokuapp.com/').then((resp) => {
    return resp.text();
}).then((text) => {
    console.log(text);
}).catch((err) => {
    console.error(err);
});*/