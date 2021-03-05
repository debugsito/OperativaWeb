import React from 'react';
import Link from '@material-ui/core/Link';

import './index.css'

export default function CustomLink({ children, ...props }) {
    return (
        <Link {...props}>
            {children}
        </Link>
    );
};
