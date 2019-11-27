/** @jsx jsx */
import React, {
    useContext, useEffect,
} from 'react';
import { Link } from 'react-router-dom';
import { jsx } from '@emotion/core';
import * as localforage from 'localforage';
import { Store } from '../store';
import { 
    ADD_URLS, CLEAR_FILTER, ADD_FILTER,
} from '../actions';
import {
    naviStyle, naviContainerStyle, filterItemStyle,
} from '../styles';

export default function Navi() {
    const {state, dispatch} = useContext(Store);
    let loadToken = () => {
        localforage.getItem<string>('token').then((resp) => {
            dispatch({type: 'setUser', payload: resp});
        }).catch((err) => console.error(err));
    };
    let loadFeed = () => {
        localforage.getItem<string[]>('feed').then((resp) => {
            dispatch({type: ADD_URLS, payload: resp});
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
    let filter = state.urls.map((e, idx) => {
        return (
            <li key={idx} className="list-group-item" css={filterItemStyle} onClick={() => {
                dispatch({type: ADD_FILTER, payload: e});
            }}>
                {e}
            </li>
        );
    });
    return (
        <div css={naviContainerStyle}>
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
            <br/>
            <ul css={naviStyle} className="list-group list-group-flush">
                <li className="list-group-item" css={filterItemStyle} onClick={() => {
                    dispatch({type: CLEAR_FILTER});
                }}>all</li>
                {filter}
            </ul>
        </div>
    );
};