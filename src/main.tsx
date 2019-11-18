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
    naviStyle,
    containerStyle, 
    contentStyle,
} from './styles';

const Home = () => {
    return (
        <div css={contentStyle}>
            <h2>Home</h2>
        </div>
    );
};

const Login = () => {
    const [name, setName] = useState('');
    const [pass, setPass] = useState('');
    const {state, dispatch} = useContext(Store);
    const execLogin = () => {
        const url = 'https://tyrssbackend.herokuapp.com/login';
        fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({name, pass})
        }).then((resp) => {
            if (resp.status === 200) {
                return resp.text();
            } else {
                throw new Error(resp.statusText);
            }
        }).then((text) => {
            dispatch({type: 'setUser', payload: text});
        }).catch((err) => console.error(err));
    };
    const execLogout = () => {
        dispatch({type: 'setUser', payload: null});
    };
    let form = null;
    if (state.user) {
        form = <React.Fragment>
            <p>
                <button onClick={execLogout}>logout</button>
            </p>
        </React.Fragment>
    } else {
        form = <React.Fragment>
            <p>
                <span>name</span><br/>
                <input type="text" onChange={(ev) => {
                    setName(ev.currentTarget.value);
                }} value={name} />
                <br/>
                <span>password</span><br/>
                <input type="password" onChange={(ev) => {
                    setPass(ev.currentTarget.value);
                }} value={pass} />
            </p>
            <p>
                <button onClick={execLogin}>login</button>
            </p>
        </React.Fragment>
    }
    return (
        <div css={contentStyle}>
            <h2>Login/Logout</h2>
            {form}
        </div>
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
            <li></li>
        </ul>
    );
};

const App = () => {
    return (
        <HashRouter>
            <Provider>
                <div css={containerStyle}>
                    <Navi />
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                    </Switch>
                </div>
            </Provider>
        </HashRouter>
    );
};

ReactDOM.render(<App />, document.getElementById('app'));