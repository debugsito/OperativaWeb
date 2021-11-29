import React from 'react'
import { FormGroup, Grid } from '@material-ui/core';
import { Checkbox } from '../../../shared/components';

export default function InputRubro({ values, handleInputChange }) {
    return (
        <Grid container>
            <Grid item xs={12}>
                <FormGroup>
                    <Checkbox label="Produccion y Operaciones" name="rubro_production" onChange={handleInputChange} checked={values.rubro_production} />
                    <Checkbox label="Mantenimiento y Limpieza" name="rubro_mantenaiment" onChange={handleInputChange} checked={values.rubro_mantenaiment}/>
                    <Checkbox label="Call center y Ventas" name="rubro_call_center" onChange={handleInputChange} checked={values.rubro_call_center}/>
                    <Checkbox label="Motorizados y Courier" name="rubro_motorizados" onChange={handleInputChange} checked={values.rubro_motorizados}/>
                    <Checkbox label="Construccion y Obras" name="rubro_construction" onChange={handleInputChange} checked={values.rubro_construction}/>
                </FormGroup>
            </Grid>
        </Grid>
    )
}
