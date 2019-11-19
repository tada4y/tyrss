import { css } from '@emotion/core';

const containerStyle = css({
    display: 'flex',
    flexDirection: 'row',
});

const naviStyle = css({
    listStyleType: 'none',
    width: 170,
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

export {
    containerStyle,
    naviStyle,
    contentStyle,
};