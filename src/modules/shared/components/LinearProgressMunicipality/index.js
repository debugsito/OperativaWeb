import React from 'react'
import { makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles({
    root: {
        width: "95%",
        display: "grid",
        gridTemplateColumns: "5fr 8fr",
        margin: "0.5rem"
    },
    containerBar: {
        display: "flex",
        alignItems: "center"
    },
    bar: props => ({
        borderRadius: 5,
        backgroundColor: props.colorBar,
        height: "20px",
        width: `calc((90% * ${props.value})/100)`,
        marginRight: "0.5rem",
        borderRadius: 0
    }),
});

export default function CustomLinearProgress(props) {
    const classes = useStyles(props)
    return (
        <div className={classes.root}>
            <Typography variant="body2">{props.name}</Typography>
            <div className={classes.containerBar}>
                <div className={classes.bar} color={props.colorBar}></div>
                <Typography variant="body2">{props.number}</Typography>
            </div>
        </div>
    )
}
