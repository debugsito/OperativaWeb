import React from 'react';
import { LinearProgress } from '@material-ui/core';

import './index.css'

export default function CustomLinearProgress({ variant, value, ...props }) {
    return (
        <LinearProgress {...props} variant={variant} value={value} />
    );
};
