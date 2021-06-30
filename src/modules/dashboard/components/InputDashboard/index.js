import React from 'react'
// Luxon
import { DateTime } from "luxon";

//Hook
import { useForm } from "../../../hooks";

//componentes
import { Grid } from "@material-ui/core";
import { Button, TextInput } from "../../../shared/components";

export default function InputDashboard({ initialValues, getJobs }) {
    const dateMax = DateTime.utc().toFormat("yyyy-LL-dd")

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('from_date' in fieldValues)
            temp.from_date = fieldValues.from_date ? "" : "El campo es requerido."
        if ('to_date' in fieldValues)
            temp.to_date = fieldValues.to_date ? "" : "El campo es requerido."

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
        getJobs(values)
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
                <TextInput
                    fullWidth
                    type="date"
                    name="from_date"
                    label="Fecha de inicio"
                    value={values.from_date}
                    onChange={handleInputChange}
                    error={errors.from_date ? true : false}
                    helperText={errors.from_date}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        max: dateMax
                    }}
                />
            </Grid>
            <Grid item xs={12} md={3}>
                <TextInput
                    fullWidth
                    type="date"
                    name="to_date"
                    label="Fecha final"
                    value={values.to_date}
                    onChange={handleInputChange}
                    error={errors.to_date ? true : false}
                    helperText={errors.to_date}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        max: dateMax
                    }}
                />
            </Grid>
            <Grid item xs={12} md={3}>
                <Button variant="contained" size="large" onClick={handleClick}>ACEPTAR</Button>
            </Grid>
        </Grid>
    )
}
