/** @jsx jsx */
import React, {
    useState, useEffect, useContext
} from 'react';
import { jsx } from '@emotion/core';
import * as localforage from 'localforage';
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
    const loadItems = (url: string): Promise<FeedType[] | null> => {
        return new Promise((resolve, reject) => {
            localforage.getItem('item').then((resp: any[]) => {
                if (!resp) {
                    resolve(null);
                }
                const result = resp.filter((e: any) => e.url === url);
                if (result.length > 0) {
                    resolve(result[0].items);
                } else {
                    resolve(null);
                }
            }).catch((err) => reject(err));
        });  
    };
    const saveItems = (url: string, items: FeedType[]): Promise<Boolean> => {
        let flag = false;
        return new Promise((resolve, reject) => {
            localforage.getItem('item').then((resp: any[]) => {
                if (!resp) {
                    resp = [];
                }
                const filtered = resp.filter((e: any) => e.url === url);
                if (filtered.length > 0) {
                    let target = filtered[0];
                    items.forEach((item) => {
                        const flted = target.items.filter((e: any) => item.link === e.link);
                        if (flted.length === 0) {
                            target.items.unshift(item);
                            flag = true;
                        }
                    });
                } else {
                    resp.push({url, items});
                }
                return localforage.setItem('item', resp);
            }).then(() => {
                resolve(flag);
            }).catch((err) => console.error(err));
        });
    };
    const showState = useState(true);
    useEffect(() => {
        if (state.user) {
            state.urls.forEach((e) => {
                let fetched: FeedType[] | null = null;
                loadItems(e).then((resp) => {
                    dispatch({type: ADD_FEED, payload: resp});
                    return fetchXml(e);
                }).then((xml) => {
                    fetched = parseItems(xml);
                    return saveItems(e, fetched);
                }).then((result) => {
                    if (result) {
                        loadItems(e).then((resp) => {
                            dispatch({type: ADD_FEED, payload: resp});
                        }).catch((err) => console.error(err));
                    }
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
