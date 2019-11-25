/** @jsx jsx */
import React from 'react';
import ReactDOM from 'react-dom';
import {
    HashRouter,
    Route,
    Switch
} from 'react-router-dom';
import { jsx } from '@emotion/core';
import { Provider } from './store';
import { containerStyle } from './styles';
import {
    Navi,
    Home,
    Login,
    Setting,
} from './components';

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