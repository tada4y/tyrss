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
import { Store, Provider } from './store';

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
    return (
        <ul>
            <li>
                <h1>TYRss</h1>
            </li>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
        </ul>
    );
};

const App = () => {
    return (
        <HashRouter>
            <Provider>
                <React.Fragment>
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