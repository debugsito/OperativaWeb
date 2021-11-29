import React from 'react'
import { FormGroup, Grid, Typography } from '@material-ui/core';
import { Checkbox } from '../../../shared/components';

export default function InputRubro({ values, handleInputChange }) {
    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography variant="body1">El postulante manifiesta:</Typography>
            </Grid>
            <Grid item xs={12}>
                <FormGroup>
                    <Checkbox label="Viajaría al interior del país" name="question_one" onChange={handleInputChange} checked={values.question_one} />
                    <Checkbox label="Trabajar en horarios rotativos" name="question_two" onChange={handleInputChange} checked={values.question_two}/>
                    <Checkbox label="Trabajar horas extras" name="question_three" onChange={handleInputChange} checked={values.rubro_call_center}/>
                    <Checkbox label="Trabajar fines de semana?" name="question_four" onChange={handleInputChange} checked={values.question_three}/>
                </FormGroup>
            </Grid>
        </Grid>
    )
}
