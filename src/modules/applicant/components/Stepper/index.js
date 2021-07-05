import React from 'react'
import { Typography, makeStyles } from "@material-ui/core";
import { checkImg } from "../../../shared/images/postulant";



const useStyles = makeStyles(theme => ({
    rootStepper: {
        marginTop: "3rem",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(5,1fr)"
    },
    containerStep: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    img: {
        width: "45px"
    }
}))

function CustomStepper({ step }) {
    const classes = useStyles()
    return (
        <div className={classes.rootStepper}>
            {step.map((item, index) => (
                <div key={index} className={classes.containerStep}>
                    <img src={checkImg} className={classes.img} />
                    <Typography variant="body1">{item}</Typography>
                </div>
            ))}
        </div>
    )
}

export default CustomStepper
