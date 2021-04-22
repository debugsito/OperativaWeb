import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    containerTitle: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    titleAbout: props => ({
        [theme.breakpoints.down('sm')]: {
            marginTop: '0.8rem',
            fontSize: '1.5rem',
        },
        [theme.breakpoints.up('md')]: {
            marginTop: '2rem',
            fontSize: '3rem',
        },
        marginBottom: '0.5rem',
        fontFamily: 'Roboto-Bold, sans-serif',
        textAlign: 'center',
        color: props.colorText
    }),
    lineRed: props => ({
        [theme.breakpoints.down('sm')]: {
            borderBottom: `6px solid ${props.colorLine}`,
            width: '4.5rem',
        },
        [theme.breakpoints.up('md')]: {
            borderBottom: `8px solid ${props.colorLine}`,
            width: '6.5rem',
        },
    }),
}))

export default function TitleWithLine({ children, ...props }) {
    const classes = useStyles(props);

    return (
        <div className={classes.containerTitle}>
            <h1 className={classes.titleAbout}>{children}</h1>
            <div className={classes.lineRed} />
        </div>
    )
}
