import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

// import './index.css'

const useStyles = makeStyles(theme => ({
    root: {
        color: 'var(--secondaryButtonColor) !important',
    }

}))

export default function CustomLink({ children, ...props }) {
    const classes = useStyles()
    return (
        <Link
            className={classes.root}
            {...props}>
            {children}
        </Link>
    );
};
