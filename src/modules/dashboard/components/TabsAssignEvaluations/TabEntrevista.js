import React, { useState } from 'react'
import { FormControl, FormGroup, Grid, makeStyles } from "@material-ui/core";
import { Button, Checkbox, TextInput, Typography } from "../../../shared/components";
import { MedalInfo, TableInterviewSchedule } from "../";

//images
import { WarningIcon } from "../../images";

const useStyles = makeStyles(theme => ({
    form: {
        background: "#fff",
        padding: "3rem",
    },
    sectionInfo: {
        background: "#F5F7F9",
        padding: "1.5rem",
        borderRadius: "10px",
        display: "flex",
        gap: "0.5rem"
    },
    buttons: {
        marginTop: "2rem"
    }

}))

export default function TabVerificativa({ nextTab }) {
    const classes = useStyles()

    return (
        <div>
            <div className={classes.form}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6" color="secondary">Evaluacion</Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <section className={classes.sectionInfo}>
                            <img src={WarningIcon} alt="icono" />
                            <Typography variant="body2">Recuerda que esta etapa de la evaluación es realizada por Verificativa, recuerda que este paso es opcional al proceso...</Typography>
                        </section>
                    </Grid>
                    <Grid item xs={2} className="justify-center">
                        <MedalInfo text="Solo con" account="Premium" />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">La entrevista será</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TableInterviewSchedule />
                    </Grid>

                </Grid>
            </div>


            <div className={classes.buttons}>
                <Grid container spacing={2} justifyContent="flex-end">
                    <Grid item xs={2}>
                        <Button variant="outlined" size="large">CANCELAR</Button>
                    </Grid>
                    <Grid item xs={2}>
                        <Button variant="contained" size="large" onClick={nextTab}>CONTINUAR</Button>
                    </Grid>
                </Grid>
            </div>

        </div>
    )
}
