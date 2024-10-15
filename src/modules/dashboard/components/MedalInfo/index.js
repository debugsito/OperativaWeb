import React from 'react'
import { makeStyles } from '@material-ui/core'
import { Typography } from "../../../shared/components";
import { MedalIcon } from "../../images";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
    }
}))
export default function Index({ text, account }) {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <img src={MedalIcon} alt="icono" />
            <div>
                <Typography variant="body2">{text}</Typography>
                <Typography variant="body2" color="secondary"><b>{account}</b></Typography>
            </div>
        </div>
    )
}
