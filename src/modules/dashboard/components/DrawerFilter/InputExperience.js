import React from 'react'
import { FormGroup, Grid, Typography } from '@material-ui/core';
import { Checkbox } from '../../../shared/components';

export default function InputExperience({ values, handleInputChange }) {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="subtitle1"><b>Con experiencia:</b></Typography>
            </Grid>
            <Grid item xs={12}>
                <FormGroup>
                    <Checkbox label="Menos de 6 meses" name="experience_one" onChange={handleInputChange} checked={values.experience_one} />
                    <Checkbox label="1 año" name="experience_two" onChange={handleInputChange} checked={values.experience_two}/>
                    <Checkbox label="2 años" name="experience_three" onChange={handleInputChange} checked={values.experience_three}/>
                    <Checkbox label="3 años a más" name="experience_four" onChange={handleInputChange} checked={values.experience_four}/>
                </FormGroup>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="subtitle1"><b>Sin experiencia:</b></Typography>
            </Grid>
            <Grid item xs={12}>
                <FormGroup>
                    <Checkbox label="Realizó Voluntariado" name="whitout_experience_one" onChange={handleInputChange} checked={values.whitout_experience_one} />
                    <Checkbox label="Disponible para horario rotativos" name="whitout_experience_two" onChange={handleInputChange} checked={values.whitout_experience_two}/>
                    <Checkbox label="Disponible para horas extras." name="whitout_experience_three" onChange={handleInputChange} checked={values.whitout_experience_three}/>
                    <Checkbox label="Disponible para fines de semana." name="whitout_experience_four" onChange={handleInputChange} checked={values.whitout_experience_four}/>
                    <Checkbox label="Disponible para viajar." name="whitout_experience_five" onChange={handleInputChange} checked={values.whitout_experience_five}/>
                </FormGroup>
            </Grid>
        </Grid>
    )
}
