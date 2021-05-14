import React from 'react'
import { DateTime } from "luxon";
import { Grid } from '@material-ui/core';

import { useForm } from "../../../hooks";
import { Button, TextInput } from "../../../shared/components";

const initialValues = {
    firstDate: "",
    lastDate: "",
}

export default function Dateform(props) {
    const dateMax = DateTime.utc().toFormat("yyyy-LL-dd")

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('firstDate' in fieldValues)
            temp.firstDate = fieldValues.firstDate ? "" : "El campo es requerido."
        if ('lastDate' in fieldValues)
            temp.lastDate = fieldValues.lastDate ? "" : "El campo es requerido."

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

    return (
        <Grid container spacing={2} alignItems="center">
            <Grid item xs={4}>
                <TextInput
                    id="date"
                    fullWidth
                    type="date"
                    name="firstDate"
                    label="Fecha de inicio"
                    value={values.firstDate}
                    onChange={handleInputChange}
                    error={errors.firstDate ? true : false}
                    helperText={errors.firstDate}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        max: dateMax
                    }}
                />
            </Grid>
            <Grid item xs={4}>
                <TextInput
                    id="date"
                    fullWidth
                    type="date"
                    name="lastDate"
                    label="Fecha fin"
                    value={values.lastDate}
                    onChange={handleInputChange}
                    error={errors.lastDate ? true : false}
                    helperText={errors.lastDate}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        max: dateMax
                    }}
                />
            </Grid>
            <Grid item xs={4}>
                <Button variant="contained" size="large">ACEPTAR</Button>
            </Grid>
        </Grid>
    )
}
