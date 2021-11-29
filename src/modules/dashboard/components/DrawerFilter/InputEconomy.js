import React from 'react'
import { FormControl, FormControlLabel, Grid, RadioGroup, FormLabel } from '@material-ui/core';
import { Radio, Typography } from '../../../shared/components';

export default function InputEconomy({values,handleInputChange}) {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography>
                Conoce a tu postulante filtrando según lo que respondió en el cuestionario de registro:
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <FormControl component="fieldset">
                <FormLabel>1. La vivienda del postulante es propia:</FormLabel>
                    <RadioGroup row aria-label="La vivienda del postulante es propia" name="ownHome" value={values.ownHome} onChange={handleInputChange}>
                        <FormControlLabel value="Si" control={<Radio />} label="Si" />
                        <FormControlLabel value="No" control={<Radio />} label="No" />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl component="fieldset">
                <FormLabel>2. Percibió bonificación extra.</FormLabel>
                    <RadioGroup row aria-label="Percibió bonificación extra" name="receivedBonus" value={values.receivedBonus} onChange={handleInputChange}>
                        <FormControlLabel value="Si" control={<Radio />} label="Si" />
                        <FormControlLabel value="No" control={<Radio />} label="No" />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl component="fieldset">
                <FormLabel>3. Ayuda económicamente en su hogar.</FormLabel>
                    <RadioGroup row aria-label="Ayuda económicamente en su hogar" name="financialAssistanceAtHome" value={values.financialAssistanceAtHome} onChange={handleInputChange}>
                        <FormControlLabel value="Si" control={<Radio />} label="Si" />
                        <FormControlLabel value="No" control={<Radio />} label="No" />
                    </RadioGroup>
                </FormControl>
            </Grid>

        </Grid>
    )
}
