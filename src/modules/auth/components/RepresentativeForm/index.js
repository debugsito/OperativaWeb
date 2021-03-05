import React, { useState, useEffect } from 'react'
import { Divider, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';
import { Button, TextInput } from '../../../shared/components';
import { useForm } from "../../../hooks";
import { useHistory } from "react-router-dom"
import { isEmailCorporate } from '../../../shared/libs/validators';

const initialValues = {
    first_name: '',
    last_name: '',
    email: '',
    cargo_input: '',
    area_input: '',
}

export default function Index({ goNextForm }) {

    const history = useHistory();

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('first_name' in fieldValues)
            temp.first_name = fieldValues.first_name ? "" : "El campo es requerido."
        if ('last_name' in fieldValues)
            temp.last_name = fieldValues.last_name ? "" : "El campo es requerido."
        if ('email' in fieldValues)
            temp.email = fieldValues.email ? (isEmailCorporate(fieldValues.email) ? "" : "Ingrese su correo corporativo") : "El campo es requerido."
        if ('cargo_input' in fieldValues)
            temp.cargo_input = fieldValues.cargo_input ? "" : "El campo es requerido."
        if ('area_input' in fieldValues)
            temp.area_input = fieldValues.area_input ? "" : "El campo es requerido."

        setErrors({
            ...temp
        })

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


    const handleClickButtonNext = () => {
        if (!disabledButtonState) {
            goNextForm(values);
        } else {
            validate()
            return
        }
    }

    return (

        <>
            <Grid item xs={12} justify="center">
                <Typography variant="h6" component="h6">
                    DATOS DEL REPRESENTANTE
                </Typography>
            </Grid>
            <Grid item xs={12} justify="center">
                <TextInput
                    fullWidth
                    name="first_name"
                    label="Nombre"
                    value={values.first_name}
                    onChange={handleInputChange}
                    error={errors.first_name ? true : false}
                    helperText={errors.first_name}
                />
            </Grid>
            <Grid item xs={12} justify="center">
                <TextInput
                    fullWidth
                    name="last_name"
                    label="Apellidos"
                    value={values.last_name}
                    onChange={handleInputChange}
                    error={errors.last_name ? true : false}
                    helperText={errors.last_name}
                />
            </Grid>
            <Grid item xs={12} justify="center">
                <TextInput
                    fullWidth
                    name="email"
                    label="Correo Electronico"
                    value={values.email}
                    onChange={handleInputChange}
                    error={errors.email ? true : false}
                    helperText={errors.email}
                />
            </Grid>
            <Grid item xs={12} justify="center">
                <TextInput
                    fullWidth
                    name="cargo_input"
                    label="Cargo"
                    value={values.cargo_input}
                    onChange={handleInputChange}
                    error={errors.cargo_input ? true : false}
                    helperText={errors.cargo_input}
                />
            </Grid>
            <Grid item xs={12} justify="center">
                <TextInput
                    fullWidth
                    name="area_input"
                    label="Area"
                    value={values.area_input}
                    onChange={handleInputChange}
                    error={errors.area_input ? true : false}
                    helperText={errors.area_input}
                />
            </Grid>
            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="outlined" size="large" onClick={() => history.goBack()}>regresar</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button variant="contained" size="large" onClick={handleClickButtonNext} disabled={disabledButtonState}>Siguiente</Button>
            </Grid>

        </>
    )
}
