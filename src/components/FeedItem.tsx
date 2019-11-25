/** @jsx jsx */
import React, {
    useState, useEffect
} from 'react';
import { jsx } from '@emotion/core';
import { FeedType } from '../storeType';
import { feedItemStyle } from '../styles';

type FeedItemType = {
    item: FeedType;
    state: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
};

const FeedItem = ({item, state}: FeedItemType) => {
    const [show, setShow] = useState(false);
    const [read, setRead] = useState(false);
    const [flag, setFlag] = useState(false);
    const lst = item.desc.lastIndexOf('...');
    useEffect(() => {
        setShow(flag);
        return () => {
            setFlag(false);
        };
    }, [state[0]]);
    return (
        <li className={'list-group-item ' + (read ? 'read' : '')} css={feedItemStyle} onClick={() => {
            state[1](!state[0]);
            setRead(true);
            setFlag(true);
        }}>
            <div>
                <span className="title">{item.title}</span>
                <span className="channel">{item.channel}</span>
                <br/>
                <p className={'desc ' + (show ? '' : 'hide')}>
                    {item.desc.substring(0, lst !== -1 ? lst : item.desc.length)}
                    <br/>
                    <a href={item.link}>visit web site</a>
                </p>
            </div>
        </li>
    );
};

export {
    FeedItem,
};