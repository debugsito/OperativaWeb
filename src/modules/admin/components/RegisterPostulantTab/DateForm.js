import React from 'react'
import { DateTime } from "luxon";
import { Grid } from '@material-ui/core';

import { useForm } from "../../../hooks";
import { Button, TextInput } from "../../../shared/components";

const initialValues = {
    startDate: "2021-03-19",
    finishDate: "2021-03-31",
}

export default function Dateform({ updateReport }) {
    const dateMax = DateTime.utc().toFormat("yyyy-LL-dd")

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('startDate' in fieldValues)
            temp.startDate = fieldValues.startDate ? "" : "El campo es requerido."
        if ('finishDate' in fieldValues)
            temp.finishDate = fieldValues.finishDate ? "" : "El campo es requerido."

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

    const handleClick = () => {
        if (!disabledButtonState) {
            updateReport(values)
        } else {
            validate();
            return
        }
    }

    return (
        <Grid container spacing={2} alignItems="center">
            <Grid item xs={4}>
                <TextInput
                    id="date"
                    fullWidth
                    type="date"
                    name="startDate"
                    label="Fecha de inicio"
                    value={values.startDate}
                    onChange={handleInputChange}
                    error={errors.startDate ? true : false}
                    helperText={errors.startDate}
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
                    name="finishDate"
                    label="Fecha fin"
                    value={values.finishDate}
                    onChange={handleInputChange}
                    error={errors.finishDate ? true : false}
                    helperText={errors.finishDate}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        max: dateMax
                    }}
                />
            </Grid>
            <Grid item xs={4}>
                <Button variant="contained" size="large" onClick={handleClick}>ACEPTAR</Button>
            </Grid>
        </Grid>
    )
}
