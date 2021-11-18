import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';


export default function SimpleTooltips({ children, title, ...props }) {

    return (
        <Tooltip title={title}>
            <IconButton {...props}>
                {children}
            </IconButton>
        </Tooltip>
    );
}

SimpleTooltips.propTypes = {
    title: PropTypes.string.isRequired,
    ["aria-label"]: PropTypes.string,
    color: PropTypes.string,
};