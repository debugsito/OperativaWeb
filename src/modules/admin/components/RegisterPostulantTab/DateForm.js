import React from 'react'
import { DateTime } from "luxon";
import { Grid } from '@material-ui/core';
import { useSelector, useDispatch } from "react-redux";

import { useForm } from "../../../hooks";
import { Button, TextInput } from "../../../shared/components";
import { setDateOfReport } from "../../../../store/actions/admin/admin.action";

export default function Dateform({ updateReport }) {
    const dispatch = useDispatch()
    const dateMax = DateTime.utc().toFormat("yyyy-LL-dd")
    const { dateOfReport } = useSelector(state => state?.admin)

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
    } = useForm(dateOfReport, true, validate);

    const handleChange = (e) => {
        handleInputChange(e)
        dispatch(setDateOfReport({ [e.target.name]: e.target.value }))
    }

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
            <Grid item xs={12} md={4}>
                <TextInput
                    id="date"
                    fullWidth
                    type="date"
                    name="startDate"
                    label="Fecha de inicio"
                    value={values.startDate}
                    onChange={handleChange}
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
            <Grid item xs={12} md={4}>
                <TextInput
                    id="date"
                    fullWidth
                    type="date"
                    name="finishDate"
                    label="Fecha fin"
                    value={values.finishDate}
                    onChange={handleChange}
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
            <Grid item xs={12} md={4}>
                <Button variant="contained" size="large" onClick={handleClick}>ACEPTAR</Button>
            </Grid>
        </Grid>
    )
}
