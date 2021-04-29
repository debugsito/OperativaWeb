import React from 'react'
import { makeStyles } from '@material-ui/core'
import ListSlides from "./ListSlides";
import Slides from "./Slides";
import './index.css'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
}))

export default function ProcessCorousel(props) {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Slides />
            {/* <ListSlides /> */}

        </div>

    )
}
