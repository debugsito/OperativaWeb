import React from 'react'
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
    },

}))

export default function SectionAbout(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <h1>Sobre Nosotros</h1>
        </div>
    )
}
