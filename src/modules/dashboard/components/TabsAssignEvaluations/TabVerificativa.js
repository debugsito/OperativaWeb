import React from 'react'
import { Grid, makeStyles } from "@material-ui/core";
import { Button, Typography } from "../../../shared/components";

//images
import { ClientIcon } from "../../images";

const useStyles = makeStyles(theme => ({
    root: {
        background: "#fff",
        padding: "3rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "2em"
    },
    card: {
        padding: "4rem",
        boxShadow: "0px 5px 15px -6px rgba(213, 216, 223, 0.5)",
        bordeRadius: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#fff"
    },
    buttons: {
        marginTop: "2rem"
    }

}))

export default function TabVerificativa(props) {
    const classes = useStyles()

    return (
        <div>
            <div className={classes.root}>
                <div className={classes.card}>
                    <img src={ClientIcon} alt="icono" />
                    <Typography variant="h6"><b>Soy cliente nuevo</b></Typography>
                </div>
                <div className={classes.card}>
                    <img src={ClientIcon} alt="icono" />
                    <Typography variant="h6"><b>Ya soy cliente</b></Typography>
                </div>
            </div>
            <div className={classes.buttons}>
                <Grid container spacing={2} justifyContent="flex-end">
                    <Grid item xs={2}>
                        <Button variant="outlined" size="large">CANCELAR</Button>
                    </Grid>
                    <Grid item xs={2}>
                        <Button variant="contained" size="large">CONTINUAR</Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}
