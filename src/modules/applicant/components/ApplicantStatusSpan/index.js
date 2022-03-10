import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    statusProgreso: {
        position: 'absolute',
        top: '-.5rem',
        left: '-.5rem',
        background: '#B8EA71',
        borderRadius: '100px',
        padding: '4px 16px',
    },
    statusFinalizado: {
        position: 'absolute',
        top: '-.5rem',
        left: '-.5rem',
        background: '#AAAAAA',
        borderRadius: '100px',
        padding: '4px 16px',
    },
}))

export default function ApplicantStatusSpan(props) {
    const classes = useStyles();
    const { status = null } = props;

    const getStatus = (option) => {
        if (option == 1 || option == 2) {
            return (
                <div className={classes.statusProgreso}>
                    <span>Activo</span>
                </div>
            )
        }
        else if (option == 3) {
            return (
                <div className={classes.statusFinalizado}>
                    <span>Finalizado</span>
                </div>
            )
        }
        else {
            return (<></>)
        }
    }

    return (
        <>
            {getStatus(status)}
        </>
    )
}