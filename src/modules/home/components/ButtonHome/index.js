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
        fontFamily: 'Roboto-bold',
        padding: '.55rem 2.5rem',
        fontSize: '1.15rem',
    },
    buttonMovil: {
        border: '3px solid #fff',
        '&:hover': {
            border: '3px solid #72b924',
            background: '#72b924'
        },
        borderRadius: '7px',
        color: '#fff !important',
        fontFamily: 'Roboto-bold',
        padding: '.375rem 0.75rem',
        fontSize: '1.15rem',
    }

}))
export default function Button({ children }) {
    const classes = useStyles();

    return (
        <>
            <Hidden smDown>
                <Link
                    className={classes.button}
                    component="button"
                    variant="body2"
                    underline="none"
                    onClick={() => {
                        console.info("I'm a button.");
                    }}
                >
                    {children}
                </Link>
            </Hidden>
            <Hidden mdUp>
                <Link
                    className={classes.buttonMovil}
                    component="button"
                    variant="body2"
                    underline="none"
                    onClick={() => {
                        console.info("I'm a button.");
                    }}
                >
                    {children}
                </Link>
            </Hidden>
        </>

    )
}
