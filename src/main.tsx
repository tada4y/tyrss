/** @jsx jsx */
import React, {
    useState, 
    useEffect, 
    useContext,
    ReactElement, 
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
    const [url, setUrl] = useState('');
    const {state, dispatch} = useContext(Store);
    const saveFeed = () => {
        localforage.setItem('feed', state.feed).catch((err) => console.error(err));
    };
    const execAdd = () => {
        dispatch({type: 'addFeed', payload: url});
    };
    const execRemove = (idx: number) => {
        dispatch({type: 'removeFeed', payload: idx});
    };
    let urls: ReactElement[] = state.feed.map((url, idx) => {
        return (
            <li key={idx} className="list-group-item">
                <div className="row align-items-center">
                    <div className="col-9">
                        <span>{url}</span>
                    </div>
                    <div className="col-1 mx-auto">
                        <button className="btn btn-primary" onClick={() => {
                            execRemove(idx);
                        }}>delete</button>
                    </div>
                </div>
            </li>
        );
    });
    useEffect(() => {
        saveFeed();
    }, [state.feed])
    return (
        <div className="container" css={contentStyle}>
            <div className="row">
                <div className="col-sm-12">
                    <h2>Setting</h2>
                    <div className="form">
                        <div className="form-group form-row">
                            <div className="col-1"></div>
                            <div className="col-8">
                                <input className="form-control mb-2 mr-sm-2" type="text" onChange={(ev) => {
                                    setUrl(ev.currentTarget.value);
                                }} value={url} placeholder="feed url" />
                            </div>
                            <div className="col-3">
                                <button className="btn btn-primary mb-2 mr-sm-2" onClick={execAdd}>add</button>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <ul className="list-group">
                                {urls}           
                            </ul>
                        </div>
                    </div>
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
    };
    let loadFeed = () => {
        localforage.getItem<string[]>('feed').then((resp) => {
            dispatch({type: 'addFeeds', payload: resp});
        }).catch((err) => console.error(err));
    };
    useEffect(() => {
        loadToken();
        loadFeed();
        return () => {
            loadToken = null;
            loadFeed = null;
        };
    }, []);
    console.log(state);
    let login = null;
    let setting = null;
    if (state.user) {
        login = 'Logout';
        setting = <Link to="/setting">Setting</Link>
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
                {setting}
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