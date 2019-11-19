/** @jsx jsx */
import React, {
    useState, 
    useEffect, 
    useContext, 
} from 'react';
import ReactDOM from 'react-dom';
import {
    HashRouter,
    Route,
    Link,
    Switch
} from 'react-router-dom';
import { jsx } from '@emotion/core';
import * as localforage from 'localforage';
import { Store, Provider } from './store';
import {
    naviStyle,
    containerStyle, 
    contentStyle,
} from './styles';

const Home = () => {
    return (
        <div className="container" css={contentStyle}>
            <div className="row">
                <div className="col-sm-12">
                    <h2>Home</h2>
                </div>
            </div>
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
            localforage.setItem('token', text).catch((err) => console.error(err));
            dispatch({type: 'setUser', payload: text});
        }).catch((err) => console.error(err));
    };
    const execLogout = () => {
        dispatch({type: 'setUser', payload: null});
    };
    let form = null;
    if (state.user) {
        form = <div className="col-sm-4">
            <div className="form-group">
                <button className="btn btn-primary" onClick={execLogout}>logout</button>
            </div>
        </div>
    } else {
        form = <div className="col-sm-4">
            <div className="form-group">
                <label>name</label><br/>
                <input className="form-control" type="text" onChange={(ev) => {
                    setName(ev.currentTarget.value);
                }} value={name} />
            </div>
            <div className="form-group">
                <label>password</label><br/>
                <input className="form-control" type="password" onChange={(ev) => {
                    setPass(ev.currentTarget.value);
                }} value={pass} />
            </div>
            <div className="form-group">
                <button className="btn btn-primary" onClick={execLogin}>login</button>
            </div>
        </div>
    }
    return (
        <div className="container" css={contentStyle}>
            <div className="row">
                <div className="col-sm-12">
                    <h2>Login/Logout</h2>
                </div>
            </div>
            <div className="row">
                {form}
            </div>
        </div>
    );
};

const Setting = () => {
    return (
        <div className="container" css={contentStyle}>
            <div className="row">
                <div className="col-sm-12">
                    <h2>Setting</h2>
                </div>
            </div>
        </div>
    );
};

const Navi = () => {
    const {state, dispatch} = useContext(Store);
    let loadToken = () => {
        localforage.getItem<string>('token').then((resp) => {
            dispatch({type: 'setUser', payload: resp});
        }).catch((err) => console.error(err));
        loadToken = () => {};
    };
    useEffect(() => {
        loadToken();
        return () => {
            loadToken = null;
        };
    }, []);
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
            <li>
                <Link to="/setting">Setting</Link>
            </li>
        </ul>
    );
};

const App = () => {
    return (
        <HashRouter>
            <Provider>
                <div className="container" css={containerStyle}>
                    <Navi />
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/setting">
                            <Setting />
                        </Route>
                    </Switch>
                </div>
            </Provider>
        </HashRouter>
    );
};

ReactDOM.render(<App />, document.getElementById('app'));