/** @jsx jsx */
import React, {
    useState, useContext
} from 'react';
import { jsx } from '@emotion/core';
import * as localforage from 'localforage';
import { Store } from '../store';
import { 
    SET_USER} from '../actions';
import {
    contentStyle,
} from '../styles';

export default function Login() {
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
            dispatch({type: SET_USER, payload: text});
        }).catch((err) => console.error(err));
    };
    const execLogout = () => {
        dispatch({type: SET_USER, payload: null});
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