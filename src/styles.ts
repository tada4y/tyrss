import { css } from '@emotion/core';

const bodyStyle = css({
    margin: 0,
    padding: 0,
});

const naviStyle = css({
    listStyleType: 'none',
    margin: 0,
    paddingLeft: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    '& h1': {
        margin: 0,
        paddingRight: 8,
        fontSize: 26
    },
    '& li': {
        paddingRight: 8
    }
});

export {
    bodyStyle,
    naviStyle,
};