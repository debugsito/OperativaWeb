import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

const useStylesBootstrap = makeStyles((theme) => ({
    arrow: {
        color: theme.palette.common.black,
    },
    tooltip: {
        backgroundColor: theme.palette.common.black,
    },
}));

export default function SimpleTooltips({ children, title }) {
    const classes = useStylesBootstrap();

    return (
        <Tooltip title={title} placement="top" arrow classes={classes}>

            {children}

        </Tooltip>
    );
}

SimpleTooltips.propTypes = {
    title: PropTypes.string.isRequired,
    ["aria-label"]: PropTypes.string,
    color: PropTypes.string,
};