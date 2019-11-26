import { css } from '@emotion/core';

const containerStyle = css({
    display: 'flex',
    flexDirection: 'row',
});

const naviContainerStyle = css({
    width: 170,
});

const naviStyle = css({
    listStyleType: 'none',
    margin: 0,
    paddingLeft: 0,
    '& h1': {
        margin: 0,
        fontSize: 26,
        letterSpacing: 4,
    },
    '& li': {
    }
});

const contentStyle = css({
    width: '100%',
    '& h2': {
        margin: 0,
        marginBottom: 22,
        fontSize: 24,
    }
});

const feedItemStyle = css({
    '& span.channel': {
        color: 'gray',
        fontSize: 14,
        paddingLeft: 8,
    },
    '& p.desc': {
        margin: 0,
        padding: 8,
    },
    '& p.desc.hide': {
        display: 'none',
    }
});

export {
    containerStyle,
    naviContainerStyle,
    naviStyle,
    contentStyle,
    feedItemStyle,
};