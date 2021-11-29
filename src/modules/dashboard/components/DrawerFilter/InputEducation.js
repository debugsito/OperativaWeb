import React from 'react'
import { FormGroup, Grid } from '@material-ui/core';
import { Checkbox } from '../../../shared/components';

export default function InputEducation({ values, handleInputChange }) {
    return (
        <Grid container>
            <Grid item xs={12}>
                <FormGroup>
                    <Checkbox label="Sin Estudios" name="education_whitout" onChange={handleInputChange} checked={values.education_whitout} />
                    <Checkbox label="Primaria incompleta" name="education_primary_incomplete" onChange={handleInputChange} checked={values.education_primary_incomplete}/>
                    <Checkbox label="Primaria completa" name="education_primary_complete" onChange={handleInputChange} checked={values.education_primary_complete}/>
                    <Checkbox label="Secundaria incompleta" name="education_secundary_incomplete" onChange={handleInputChange} checked={values.education_secundary_incomplete}/>
                    <Checkbox label="Secundaria completa" name="education_secundary_complete" onChange={handleInputChange} checked={values.education_secundary_complete}/>
                    <Checkbox label="Técnico superior incompleto" name="education_tecnic_incomplete" onChange={handleInputChange} checked={values.education_tecnic_incomplete}/>
                    <Checkbox label="Técnico superior completo" name="education_tecnic_complete" onChange={handleInputChange} checked={values.education_tecnic_complete}/>
                </FormGroup>
            </Grid>
        </Grid>
    )
}
