import React, { useState } from 'react'
import { FormControl, FormGroup, Grid, makeStyles } from "@material-ui/core";
import { Button, Checkbox, TextInput, Typography } from "../../../shared/components";
import { MedalInfo, DialogMessageSentEvaluativa } from "../";

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
    const [openDialog, setOpenDialog] = useState(false)

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
                        <Typography variant="h6">Quiero que Verificativa realice</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl component="div">
                            <FormGroup>
                                <Checkbox label="Verificación domiciliaria" name="veri_domiciliaria" />
                                <Checkbox label="Antecedentes penales" name="veri_antecendentes_penales" />
                                <Checkbox label="Antecedentes policiales" name="veri_antecendentes_policiales" />
                                <Checkbox label="Historial crediticio" name="veri_historial_crediticio" />
                                <Checkbox label="Deseo ser contactado para un servicio de verificación especial" name="veri_especial" />
                            </FormGroup>
                            {/* <FormHelperText>Be careful</FormHelperText> */}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextInput
                            fullWidth
                            name="question"
                            label="Escribe tu consulta o duda sobre este servicio"
                        />
                    </Grid>

                </Grid>
            </div>


            <div className={classes.buttons}>
                <Grid container spacing={2} justifyContent="flex-end">
                    <Grid item xs={2}>
                        <Button variant="outlined" size="large">CANCELAR</Button>
                    </Grid>
                    <Grid item xs={2}>
                        <Button variant="contained" size="large" onClick={() => setOpenDialog(true)}>CONTINUAR</Button>
                    </Grid>
                </Grid>
            </div>

            <DialogMessageSentEvaluativa open={openDialog} onClose={() => setOpenDialog(false)} nextTab={nextTab} title="Evaluativa"/>

        </div>
    )
}
