import React from 'react'
import { makeStyles, Typography } from '@material-ui/core'

const colors = ["#B8EA71", "#FBC547", "#731D88", "#8FA5DD", "#F96E6E", "#3F7DF6", "#D280BB", "#FFBE9D", "#78AD80", "#867789"]

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
        backgroundColor: colors[props.index],
        height: "30px",
        width: `calc((90% * ${props.value})/100)`,
        marginRight: "0.5rem",
        borderRadius: 0
    })
    ,
});

export default function CustomLinearProgress(props) {
    const classes = useStyles(props)
    return (
        <div className={classes.root} key={props.index}>
            <Typography variant="body2">{props.name.toUpperCase()}</Typography>
            <div className={classes.containerBar}>
                <div className={classes.bar}></div>
                <Typography variant="body2">{props.total}</Typography>
            </div>
        </div>
    )
}
