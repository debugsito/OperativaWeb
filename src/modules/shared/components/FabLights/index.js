import React from 'react'
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    fab: (props) => ({
        pointerEvents: "none",
        borderRadius: "50% !important",
        background: Math.round(props.value) <= 10 ? "var(--redLight)" : (Math.round(props.value) >= 11 && Math.round(props.value) <= 60 ? "var(--orangeLight)" : "var(--greenLight)")
    }),
}));

export default function Index(props) {
    const classes = useStyles(props);

    return (
        <Fab color="primary" size="small" className={classes.fab}>{`${Math.round(props.value)}%`}</Fab>
    )
}
