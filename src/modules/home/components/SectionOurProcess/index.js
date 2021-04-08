import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
        backgroundColor: '#EF1C40'
    }
}))

export default function SectionOurProcess(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>

        </div>
    )
}
