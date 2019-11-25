/** @jsx jsx */
import React, {
    useState, useContext, useEffect, ReactElement,
} from 'react';
import { jsx } from '@emotion/core';
import * as localforage from 'localforage';
import { Store } from '../store';
import { 
    ADD_URL,
    REMOVE_URL,
} from '../actions';
import {
    contentStyle,
} from '../styles';

export default function Setting() {
    const [url, setUrl] = useState('');
    const {state, dispatch} = useContext(Store);
    const saveFeed = () => {
        localforage.setItem('feed', state.urls).catch((err) => console.error(err));
    };
    const execAdd = () => {
        dispatch({type: ADD_URL, payload: url});
    };
    const execRemove = (idx: number) => {
        dispatch({type: REMOVE_URL, payload: idx});
    };
    let urls: ReactElement[] = state.urls.map((url, idx) => {
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
    }, [state.urls])
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