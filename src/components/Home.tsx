/** @jsx jsx */
import React, {
    useState, useEffect, useContext
} from 'react';
import { jsx } from '@emotion/core';
import { Store } from '../store';
import {
    contentStyle,
} from '../styles';
import { 
    ADD_FEED,
    CLEAR_FEEDS
} from '../actions';
import { FeedType } from '../storeType';
import { FeedItem } from './FeedItem';

export default function Home() {
    const {state, dispatch} = useContext(Store);
    const fetchXml = (rssUrl: string) => {
        const url = 'https://tyrssbackend.herokuapp.com/rss';
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
                body: JSON.stringify({token: state.user, url: rssUrl})
            }).then((resp) => {
                if (resp.status === 200) {
                    return resp.json()
                } else {
                    reject(new Error('response error'));
                }
            }).then((json) => {
                resolve(json);
            }).catch((err) => {
                reject(err);
            });
        });
    };
    const parseItems = (xml: any): FeedType[] => {
        let items: FeedType[] = [];
        if (xml.rss !== undefined) {
            xml.rss.channel.item.map((e: any) => {
                items.push({
                    channel: xml.rss.channel.title["_text"],
                    title: e.title["_text"],
                    link: e.link["_text"],
                    date: new Date(e.pubDate["_text"]),
                    desc: e.description ? e.description["_text"] : e.title["_text"],
                });
            });
        } else if (xml["rdf:RDF"] !== undefined) {
            xml["rdf:RDF"].item.map((e: any) => {
                items.push({
                    channel: xml["rdf:RDF"].channel.title["_text"],
                    title: e.title["_text"],
                    link: e.link["_text"],
                    date: new Date(e["dc:date"]["_text"]),
                    desc: e.description ? e.description["_cdata"] || e.description["_text"] : e.title["_text"],
                });
            });
        }
        return items;
    };
    const showState = useState(true);
    useEffect(() => {
        if (state.user) {
            state.urls.forEach((e) => {
                fetchXml(e).then((xml) => {
                    const items = parseItems(xml);
                    dispatch({type: ADD_FEED, payload: items});
                }).catch((err) => {
                    console.error(err);
                });
            });
        }
        return () => {
            dispatch({type: CLEAR_FEEDS});
        };
    }, [state.urls]);
    let feedItems: FeedType[] = [];
    state.feeds.forEach((feed) => {
        const ls = [...feedItems, ...feed.map((e) => e)];
        feedItems = ls.sort((a, b) => a.date > b.date ? -1:0);
    });
    const items = feedItems.map((e, idx) => {
        return <FeedItem key={idx} item={e} state={showState} />
    });
    return (
        <div className="container" css={contentStyle}>
            <div className="row">
                <div className="col-sm-12">
                    <h2>Home</h2>
                    <ul className="list-group">
                        {items}
                    </ul>
                </div>
            </div>
        </div>
    );
};
