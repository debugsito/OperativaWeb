import React, { useState, useEffect } from 'react'
import { Grid, makeStyles } from "@material-ui/core";
import { Button, Typography, SnackbarsAlert } from "../../../shared/components";
import { FormAddQuestion, DialogQuestion } from "../";
import { produce } from "immer";

const useStyles = makeStyles(theme => ({
    form: {
        background: "#fff",
        padding: "3rem",
        marginBottom: "2rem",
    },
    sectionInfo: {
        background: "#F5F7F9",
        padding: "2rem",
    },
    buttons: {
        marginTop: "1rem",
        width:"100%"
    }
}))

const initialValues = [{
    question: "",
    type_question: "",
}]

export default function TabEvaluation({ nextTab }) {
    const classes = useStyles();
    const [showInfo, setShowInfo] = useState(true)
    const [openModal, setOpenModal] = useState(false)
    const [values, setValues] = useState(initialValues)
    const [fields, setFields] = useState(initialValues)
    const [notification, setNotification] = useState({
        open: false,
        message: `Para agregar otra pregunta, rellene los campos`,
        vertical: 'top',
        horizontal: 'right',
        severity: "warning"
    })

    const { horizontal, vertical, open, message, severity } = notification;

    useEffect(() => {
        const index = values.length - 1
        if(values[index].type_question === "answer-multiple"){
            console.log("eleji pregunta multiple")
        }
    }, [values])

    const addValues = () => {
        if (validate(values)) {
            setValues(currentValue => [...currentValue, {
                question: "",
                type_question: "",
            }])
        } else {
            setNotification({ ...notification, open: true })
        }
    }

    const addFields = () => {
        if (validate(fields)) {
            setFields(currentValue => [...currentValue, {
                question: "",
                type_question: "",
            }])
        } else {
            setNotification({ ...notification, open: true })
        }
    }


    const handleValues = (e, index) => {
        setValues(currentValue => produce(currentValue, (v) => {
            v[index][e.target.name] = e.target.value
        }))
    }

    const handleFields = (e, index) => {
        setFields(currentValue => produce(currentValue, (v) => {
            v[index][e.target.name] = e.target.value
        }))
    }

    const deletedValues = (index) => {
        if (index === 0) { //Tiene un solo elemento
            setValues(initialValues)
        } else {
            const newValues = [...values]
            newValues.splice(index, 1)
            setValues(newValues)
        }
    }

    const deletedFields = (index) => {
        if (index === 0) { //Tiene un solo elemento
            setFields(initialValues)
        } else {
            const newfields = [...fields]
            newfields.splice(index, 1)
            setFields(fields)
        }
    }

    const saveQuestions = () => {
        setValues(initialValues)
        setFields(initialValues)
        setOpenModal(false)
    }

    const cleanForm = () => {
        setFields(initialValues)
        setValues(initialValues)
    }

    const validate = (array) => {
        let result;
        array.map((item) => {
            result = Object.values(item).every((x) => x != "")
            if (!result) return
        })
        return result
    }

    return (
        <div>
            {
                JSON.stringify(values)
            }
            {
                showInfo &&
                <div className={classes.form}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant="body1">Realiza una evaluación tecnico a tu postulante</Typography>
                        </Grid>
                        <section className={classes.sectionInfo}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant="body1">Formula una lista de preguntas, estas pueden ser:</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <ul>
                                        <li><b>Pregunta abierta:</b> El postulante deberá fundamentar su respuesta</li>
                                        <li><b>Pregunta cerrada:</b> El postulante tendrán que elgir solo una opción</li>
                                        <li><b>Pregunta múltiple:</b> El postulante podrá elegir entre 1 o más opciones</li>
                                    </ul>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body1">Si tienes las preguntas cerradas y respuestas en un documento de Excel o CVS, podrás cargar tu documento en la opción <b>IMPORTAR</b>, la correción se realiza automáticamente.</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant="contained" size="large" onClick={() => setShowInfo(false)}>ME QUEDA CLARO</Button>
                                </Grid>
                            </Grid>
                        </section>
                    </Grid>
                </div>
            }
            {
                !showInfo &&
                <>
                    <div className={classes.form}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Typography variant="h6" color="secondary">Crea un formulario para la Evaluación de experiencia</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={3}>
                                    {
                                        values.map((item, index) => (
                                            <FormAddQuestion
                                                key={index}
                                                index={index}
                                                values={item}
                                                handleChange={handleValues}
                                                length={values.length}
                                                deletedValues={deletedValues}
                                            />
                                        ))
                                    }
                                </Grid>
                            </Grid>
                            <Grid item xs={3}>
                                <Button color="secondary" size="large" onClick={addValues}> + AÑADIR PREGUNTA</Button>
                            </Grid>
                        </Grid>
                    </div>
                    <div className={classes.form}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Typography variant="h6" color="secondary">Crea un formulario para Preguntas adicionales</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={3}>
                                    {
                                        fields.map((item, index) => (
                                            <FormAddQuestion
                                                key={index}
                                                index={index}
                                                values={item}
                                                handleChange={handleFields}
                                                deletedValues={deletedFields} />
                                        ))
                                    }
                                </Grid>
                            </Grid>
                            <Grid item xs={3}>
                                <Button color="secondary" size="large" onClick={addFields}> + AÑADIR PREGUNTA</Button>
                            </Grid>
                        </Grid>
                    </div>
                    <div className={classes.buttons}>
                        <Grid container spacing={2} justifyContent="flex-end">
                            <Grid item>
                                <Button variant="outlined" size="large">CANCELAR</Button>
                            </Grid>
                            <Grid item>
                                <Button variant="outlined" size="large" onClick={cleanForm}>Limpiar</Button>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" size="large" onClick={nextTab}>Guardar</Button>
                            </Grid>
                            <Grid item>
                                <Button variant="outlined" size="large" onClick={nextTab}>Continuar</Button>
                            </Grid>
                        </Grid>
                    </div>
                </>
            }
            <DialogQuestion open={openModal} onClose={() => setOpenModal(false)} saveQuestion={saveQuestions} length={values.length} />
            <SnackbarsAlert
                open={open}
                anchorOrigin={{ vertical, horizontal }}
                message={message}
                handleClose={() => setNotification({ ...notification, open: false })}
                onClose={() => setNotification({ ...notification, open: false })}
                severity={severity}
                autoHideDuration={5000}
            />
        </div >
    )
}
