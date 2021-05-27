import React from 'react'
import { FormControl, FormControlLabel, FormLabel, Grid, RadioGroup, Typography } from '@material-ui/core';
import { Button, Radio } from "../../../shared/components";
import { useForm } from "../../../hooks"

const initialValues = {
    accountType: "",
}
export default function SignInPostulantDialog(props) {

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('accountType' in fieldValues)
            temp.accountType = fieldValues.accountType ? "" : "El campo es requerido."

        setErrors({ ...temp })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        disabledButtonState,
    } = useForm(initialValues, true, validate);


    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Typography variant="h6" component="h6">
                    Cuéntanos
                </Typography>
                <Typography variant="body1" component="p">
                    ¿Para quién desea crear la cuenta?
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <RadioGroup aria-label="accountType">
                    <FormControlLabel value="company" name="empresa" control={<Radio />} label="Empresa" />
                    <FormControlLabel value="municipality" name="municipalidad" control={<Radio />} label="Municipalidad" />
                    <FormControlLabel value="applicant" name="postulante" control={<Radio />} label="Postulante" />
                </RadioGroup>
            </Grid>
            <Grid item xs={12}>
                <Grid container justify="center">
                    <Grid item xs={6}>
                        <Button variant="outlined" size="large">cancelar</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" size="large">aceptar</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
