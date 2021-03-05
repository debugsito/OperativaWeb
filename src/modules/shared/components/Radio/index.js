import React from 'react';
import Radio from '@material-ui/core/Radio';

import './index.css'

export default function CustomTypography({ children, ...props }) {
    return (
        <Radio {...props}>
            {children}
        </Radio>
    );
};
