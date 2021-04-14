import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        '& h1': {
            color: '#fff'
        }
    }
}))
export default function DescriptionSlide({ numberImg, text }) {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <div>
                <img src={numberImg} />
            </div>
            {text}
        </div>
    )
}
