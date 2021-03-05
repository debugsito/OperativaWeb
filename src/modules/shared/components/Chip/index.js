import React from 'react';
import Chip from '@material-ui/core/Chip';

import './index.css'

export default function CustomChip({ children, ...props }) {
    return (
        <Chip {...props} />
    );
};
