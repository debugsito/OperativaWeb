import React from 'react';
import Typography from '@material-ui/core/Typography';

import './index.css'

export default function CustomTypography({ children, ...props }) {
    return (
        <Typography {...props}>
            {children}
        </Typography>
    );
};
