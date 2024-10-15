import React from 'react'
import { Paper, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    paper: {
        padding: "3rem"
    }
}))

export default function PaperCustom({ children }) {
    const classes = useStyles()

    return (
        <Paper className={classes.paper}>
            {children}
        </Paper>
    )
}
