import React, { Children } from 'react'
import { makeStyles } from '@material-ui/core'
import BackButton from "../../images/dashboard/back_button.svg";
import { Typography } from "../";

const useStyles = makeStyles(theme => ({
    title: {
        display: "flex",
        flexDirection: "column",
    },

    titleMain: {
        display: "flex",
        alignItems: "center",
        marginBottom: "0.5rem"
    },
    titleButton: {
        cursor: "pointer",
        marginRight: "0.5rem"
    },
}))
export default function TitlePage({ children, description = null, handleClick }) {
    const classes = useStyles()

    return (
        <div className={classes.title}>
            <div className={classes.titleMain}>
                <div className={classes.titleButton} onClick={handleClick}>
                    <img src={BackButton} alt="atras" />
                </div>
                <div className={classes.titleText}>
                    <Typography variant="h4"><b>{children}</b></Typography>
                </div>
            </div>
            <div className={classes.titleDescription}>
                {
                    description &&
                    <Typography variant="body2">{description}</Typography>
                }
            </div>

        </div>
    )
}
