import React from 'react'
import { Container } from "@material-ui/core";
import { makeStyles } from '@material-ui/styles';
import ShapeTopImg from "../../images/main/shape_top.webp";
import ShapeBottonImg from "../../images/main/shape_bottom_.webp";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        position: "relative",
        padding: "2rem",
        background: "#FAFBFF",
        // zIndex: 99,
    },
    imageTop: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "50%",
        height: '500px',
        backgroundImage: `url(${ShapeTopImg})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        zIndex: -1
    },
    imageBottom: {
        position: "absolute",
        bottom: 0,
        right: 0,
        width: "32%",
        height: '500px',
        backgroundImage: `url(${ShapeBottonImg})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        zIndex: -1
    }
}))
export default function ContainerCustom({ children }) {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <div className={classes.imageTop}>
            </div>
            {children}
            <div className={classes.imageBottom}>
            </div>
        </div>
    )
}
