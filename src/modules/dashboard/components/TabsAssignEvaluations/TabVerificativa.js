import React, { useState } from 'react'
import { FormControl, FormGroup, Grid, makeStyles } from "@material-ui/core";
import { Button, Checkbox, TextInput, Typography } from "../../../shared/components";
import { MedalInfo, DialogMessageSentEvaluativa } from "../";

//images
import { ClientIcon, WarningIcon } from "../../images";

//services
import serviceDashboard from "../../../../store/services/dashboard/dashboard.service";

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
    },
    cleanLink:{
        textDecoration: 'none',
        color: "inherit"
    }

}))

const initialValues = {
    veri_domiciliaria: false,
    veri_antecendentes_penales: false,
    veri_antecendentes_policiales: false,
    veri_historial_crediticio: false,
    veri_contact:false,
    question:""
  }
  
  const OPTIONS = {
    0:"Verificación domiciliaria",
    1:"Antecedentes penales",
    2:"Antecedentes policiales",
    3:"Historial crediticio",
    4:"Deseo ser contactado para un servicio de verificación especial",
  }

export default function TabVerificativa({ nextTab, backTab }) {
    const classes = useStyles()
    const [showForm, setShowForm] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)
    const [values, setValues] = React.useState(initialValues);

    const handleChange = (event) => {
      setValues({ ...values, [event.target.name]: event.target.checked });
    };

    const goVerification = () => {
        setShowForm(true)
    }

    const handleNextTab = () => {
        if(showForm){
            setOpenDialog(true)
        }else{
            
            nextTab()
        }
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
                        <a href="https://plataforma.verificativa.com/login" target="_blank" rel="noopener noreferrer" className={classes.cleanLink}>
                        <div className={classes.card}>
                            <img src={ClientIcon} alt="icono" />
                            <Typography variant="h6"><b>Ya soy cliente</b></Typography>
                        </div>
                        </a>
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
                                        <Checkbox label="Antecedentes penales" name="veri_antecendentes_penales" checked={values.veri_domiciliaria} onChange={handleChange}/>
                                        <Checkbox label="Antecedentes policiales" name="veri_antecendentes_policiales" checked={values.veri_domiciliaria} onChange={handleChange}/>
                                        <Checkbox label="Historial crediticio" name="veri_historial_crediticio" checked={values.veri_domiciliaria} onChange={handleChange}/>
                                        <Checkbox label="Deseo ser contactado para un servicio de verificación especial" name="veri_contact" checked={values.veri_contact} onChange={handleChange} />
                                    </FormGroup>
                                    {/* <FormHelperText>Be careful</FormHelperText> */}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextInput
                                    fullWidth
                                    name="question"
                                    label="Escribe tu consulta o duda sobre este servicio"
                                    value={values.question}
                                    onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value})}
                                />
                            </Grid>

                        </Grid>
                    </div>
            }

            <div className={classes.buttons}>
                <Grid container spacing={2} justifyContent="flex-end">
                    <Grid item>
                        <Button variant="outlined" size="large" onClick={backTab}>REGRESAR</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" size="large" onClick={handleNextTab}>CONTINUAR</Button>
                    </Grid>
                </Grid>
            </div>

            <DialogMessageSentEvaluativa open={openDialog} onClose={() => setOpenDialog(false)} nextTab={nextTab} title="Verificativa"/>
        </div>
    )
}


