import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"

import { Grid, MenuItem, Typography } from '@material-ui/core'
import { Select, Button } from "../../../shared/components";

import { actions_Utils } from "../../../../store/actions";
import { useForm } from "../../../hooks";

const defaultValues = {
    interest_rubro_id: ""
}

export default function Index({ userData, handleSaveAreasOfInterest }) {
    const dispatch = useDispatch()
    const { items } = useSelector(state => state.utils)

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('interest_rubro_id' in fieldValues)
            temp.interest_rubro_id = fieldValues.interest_rubro_id ? "" : "El campo es requerido."

        setErrors({ ...temp })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        disabledButtonState,
    } = useForm(defaultValues, true, validate);

    useEffect(() => {
        dispatch(actions_Utils.getItems())
    }, [])

    return (
        <Grid container spacing={3} style={{ padding: 20 }}>
            <Grid item xs={10} sm={10} md={10} lg={10}>
                <Typography variant="body1" component="p" className="title-color">
                    Seleccione el rubro principal de su interés.
                </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                <Select
                    label="Rubro"
                    name="interest_rubro_id"
                    value={values.interest_rubro_id}
                    onChange={handleInputChange}
                    error={errors.interest_rubro_id ? true : false}
                    helperText={errors.interest_rubro_id}
                >
                    {items.length > 0 && items.map(element =>
                        <MenuItem key={element.id} value={element.id}>{element.name}</MenuItem>
                    )}

                </Select>
            </Grid>
            <Grid item xs={12} className="justify-center">
                {/* <Button variant="outlined" size="large" onClick={() => history.push('/')}>Cancelar</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
                <Button variant="contained" size="large" onClick={() => handleSaveAreasOfInterest(values)} disabled={disabledButtonState}>Finalizar</Button>
            </Grid>
        </Grid>
    )
}
