import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Link } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    button: {
        background: "#46A9D4",
        color: '#fff !important',
        borderRadius: '10px',
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        fontWeight: 500,
        padding: '.55rem 1.95rem',
        fontSize: '1.15rem',
        '&:hover': {
            background: '#72b924'
        },
    },
}))

export default function ButtonRegister({ children, ...props }) {
    const classes = useStyles();
    return (
        <>
            <Link
                className={classes.button}
                component="button"
                variant="body2"
                underline="none"
                {...props}
            >
                {children}
            </Link>
        </>

    )
}
