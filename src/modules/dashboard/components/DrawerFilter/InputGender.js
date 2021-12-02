import React from 'react'
import { FormGroup, Grid, Typography } from '@material-ui/core';
import { Checkbox } from '../../../shared/components';

export default function InputGender({values, handleInputChange}) {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <FormGroup>
                    <Checkbox label="Masculino" name="gender_men" onChange={handleInputChange} checked={values.gender_men} />
                    <Checkbox label="Femenino" name="gender_women" onChange={handleInputChange} checked={values.gender_women}/>
                    <Checkbox label="Otro" name="gender_other" onChange={handleInputChange} checked={values.gender_other}/>
                </FormGroup>
            </Grid>
    </Grid>
    )
}
