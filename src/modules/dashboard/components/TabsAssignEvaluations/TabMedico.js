import React from 'react'
import { Grid, makeStyles } from "@material-ui/core";
import { Button, TextInput, Typography } from "../../../shared/components";
import { useForm } from "../../../hooks";

const useStyles = makeStyles(theme => ({
    form: {
        background: "#fff",
        padding: "3rem",
    },
    buttons: {
        marginTop: "2rem"
    }
}))

const initialValues = {
    name: "",
    address: "",
    reference: "",
    recomendation: ""
}

export default function Tabmedico({ nextTab, backTab }) {
    const classes = useStyles()

    const validate = (fieldValues = values) => {
        let temp = { ...errors }

        if ('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "El campo es requerido."
        if ('address' in fieldValues)
            temp.address = fieldValues.address ? "" : "El campo es requerido."
        if ('reference' in fieldValues)
            temp.reference = fieldValues.reference ? "" : "El campo es requerido."
        if ('recomendation' in fieldValues)
            temp.recomendation = fieldValues.recomendation ? "" : "El campo es requerido."


        setErrors({ ...temp })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        errors,
        setErrors,
        handleInputChange,
        disabledButtonState,
    } = useForm(initialValues, true, validate);

    const saveForm = () => {
        if (!disabledButtonState) {
            nextTab()
        } else {
            validate()
        }
    }

    return (
        <div>
            <div className={classes.form}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" color="secondary"><b>Análisis médico</b></Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2">Indica a tu postulante la clinica y direccion donde realizará su evaluación médica</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextInput
                            fullWidth
                            name="name"
                            label="Nombre de la clínica"
                            onChange={handleInputChange}
                            error={errors.name ? true : false}
                            helperText={errors.name}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextInput
                            fullWidth
                            name="address"
                            label="Dirección"
                            onChange={handleInputChange}
                            error={errors.address ? true : false}
                            helperText={errors.address}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextInput
                            fullWidth
                            name="reference"
                            label="Referencia"
                            onChange={handleInputChange}
                            error={errors.reference ? true : false}
                            helperText={errors.reference}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextInput
                            fullWidth
                            name="recomendation"
                            label="Recomendaciones para el examen"
                            onChange={handleInputChange}
                            error={errors.recomendation ? true : false}
                            helperText={errors.recomendation}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        
                        <TextInput
                            type="file"
                            name="recomendation"
                        />
                    </Grid>


                </Grid>
            </div>

            <div className={classes.buttons}>
                <Grid container spacing={2} justifyContent="flex-end">
                    <Grid item>
                        <Button variant="outlined" size="large" onClick={backTab}>REGRESAR</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" size="large" onClick={saveForm}>CONTINUAR</Button>
                    </Grid>
                </Grid>
            </div>

        </div>
    )
}
