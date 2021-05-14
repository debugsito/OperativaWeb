import React from 'react'
import { makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
        border: "1px solid #DDD"
    },
    header: {
        background: "#46A9D4",
        height: "4rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        '& h6': {
            color: "white !important",
            textAlign: "center",
            fontSize: "1rem"
        }
    },
    body: {
        height: "in",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }
}))
export default function CardReport({ title, children }) {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <Typography variant="h6">{title}</Typography>
            </div>
            <div className={classes.body}>
                {children}
            </div>
        </div>
    )
}
