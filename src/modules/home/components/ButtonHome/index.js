import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Link, Hidden } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    button: {
        border: '3px solid #fff',
        '&:hover': {
            border: '3px solid #72b924',
            background: '#72b924'
        },
        borderRadius: '7px',
        color: '#fff !important',
        fontWeight: 600,
        padding: '.55rem 2.5rem',
        fontSize: '1.15rem',
        [theme.breakpoints.down('sm')]: {
            padding: '.375rem 0.75rem',
        }
    },

}))

export default function ButtonHome({ children, ...props }) {
    const classes = useStyles();
    return (
        <>
            <Hidden smDown>
                <Link
                    className={classes.button}
                    component="button"
                    variant="body2"
                    underline="none"
                    {...props}
                >
                    {children}
                </Link>
            </Hidden>
            <Hidden mdUp>
                <Link
                    className={classes.button}
                    component="button"
                    variant="body2"
                    underline="none"
                    {...props}
                >
                    {children}
                </Link>
            </Hidden>
        </>

    )
}
