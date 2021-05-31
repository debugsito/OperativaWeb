import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
        color: "var(--secondaryButtonColor)",
        fontWeight: 500
    }
}))
export default function Index({ children }) {
    const classes = useStyles()

    return (
        <span className={classes.root}>
            {children}
        </span>
    )
}
