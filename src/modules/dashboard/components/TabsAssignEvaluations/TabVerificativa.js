import React, { useState } from 'react'
import { FormControl, FormGroup, Grid, makeStyles } from "@material-ui/core";
import { Button, Checkbox, TextInput, Typography } from "../../../shared/components";
import { MedalInfo, DialogMessageSentEvaluativa } from "../";

//images
import { ClientIcon, WarningIcon } from "../../images";

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
        background: "#fff",
        cursor: "pointer",
    },
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
    const [showForm, setShowForm] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)

    const goVerification = () => {
        setShowForm(true)
    }

    const handleNextTab = () => {
        setOpenDialog(true)
    }

    return (
        <div>
            {
                !showForm ?
                    <div className={classes.root}>
                        <div className={classes.card} onClick={goVerification}>
                            <img src={ClientIcon} alt="icono" />
                            <Typography variant="h6"><b>Soy cliente nuevo</b></Typography>
                        </div>
                        <div className={classes.card}>
                            <img src={ClientIcon} alt="icono" />
                            <Typography variant="h6"><b>Ya soy cliente</b></Typography>
                        </div>
                    </div>
                    :
                    <div className={classes.form}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h6" color="secondary">Verificación de antecedentes personales</Typography>
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
            }

            <div className={classes.buttons}>
                <Grid container spacing={2} justifyContent="flex-end">
                    <Grid item xs={2}>
                        <Button variant="outlined" size="large">CANCELAR</Button>
                    </Grid>
                    <Grid item xs={2}>
                        <Button variant="contained" size="large" onClick={handleNextTab}>CONTINUAR</Button>
                    </Grid>
                </Grid>
            </div>

            <DialogMessageSentEvaluativa open={openDialog} onClose={() => setOpenDialog(false)} nextTab={nextTab} title="Verificativa"/>
        </div>
    )
}


