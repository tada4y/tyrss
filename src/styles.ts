import { css } from '@emotion/core';

const bodyStyle = css({
    margin: 0,
    padding: 0,
});

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
        fontSize: 26
    },
    '& li': {
    }
});

const contentStyle = css({
    width: '100%',
    '& h2': {
        margin: 0,
        fontsize: 24,
    }
});

export {
    bodyStyle,
    containerStyle,
    naviStyle,
    contentStyle,
};