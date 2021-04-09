import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    containerTitle: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    titleAbout: {
        [theme.breakpoints.down('sm')]: {
            marginTop: '1rem',
            fontSize: '1.5rem',
        },
        [theme.breakpoints.up('md')]: {
            marginTop: '3.5rem',
            fontSize: '3rem',
        },
        marginBottom: '0.5rem',
        fontFamily: "Roboto-Bold",
        textAlign: 'center'

    },
    lineRed: {
        [theme.breakpoints.down('sm')]: {
            borderBottom: '6px solid #EF1C40',
            width: '4.5rem',
        },
        [theme.breakpoints.up('md')]: {
            borderBottom: '8px solid #EF1C40',
            width: '6.5rem',
        },

    },
}))

export default function TitleWithLineRed({ children }) {
    const classes = useStyles();

    return (
        <div className={classes.containerTitle}>
            <h1 className={classes.titleAbout}>{children}</h1>
            <div className={classes.lineRed} />
        </div>
    )
}
