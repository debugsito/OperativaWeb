import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '100%',
        backgroundColor: '#EF1C40',
    },

}))

export default function Footer(props) {
    const classes = useStyles()

    return (
        <div className={classes.root}>

        </div>
    )
}
