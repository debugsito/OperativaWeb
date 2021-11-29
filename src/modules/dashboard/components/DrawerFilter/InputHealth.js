import React from 'react'
import { FormControl, FormControlLabel, Grid, RadioGroup, FormLabel } from '@material-ui/core';
import { Radio } from '../../../shared/components';

export default function InputHealth({values,handleInputChange}) {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <FormControl component="fieldset">
                <FormLabel>1. ¿Sufre de alguna alergia?</FormLabel>
                    <RadioGroup row aria-label="1. ¿Sufre de alguna alergia?" name="hasAllergies" value={values.hasAllergies} onChange={handleInputChange}>
                        <FormControlLabel value="Si" control={<Radio />} label="Si" />
                        <FormControlLabel value="No" control={<Radio />} label="No" />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl component="fieldset">
                <FormLabel>2. ¿Tiene alguna operación?</FormLabel>
                    <RadioGroup row aria-label="2. ¿Tiene alguna operación?" name="hasOperation" value={values.hasOperation} onChange={handleInputChange}>
                        <FormControlLabel value="Si" control={<Radio />} label="Si" />
                        <FormControlLabel value="No" control={<Radio />} label="No" />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl component="fieldset">
                <FormLabel>3. ¿Ha presentado problemas en la columna?</FormLabel>
                    <RadioGroup row aria-label="3. ¿Ha presentado problemas en la columna?" name="hasProblemOfColumn" value={values.hasProblemOfColumn} onChange={handleInputChange}>
                        <FormControlLabel value="Si" control={<Radio />} label="Si" />
                        <FormControlLabel value="No" control={<Radio />} label="No" />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl component="fieldset">
                <FormLabel>4. ¿Sufre de diabetes?</FormLabel>
                    <RadioGroup row aria-label="¿Sufre de diabetes?" name="hasDiabetes" value={values.hasDiabetes} onChange={handleInputChange}>
                        <FormControlLabel value="Si" control={<Radio />} label="Si" />
                        <FormControlLabel value="No" control={<Radio />} label="No" />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl component="fieldset">
                <FormLabel>5. ¿Usa lentes?</FormLabel>
                    <RadioGroup row aria-label="5. ¿Usa lentes?" name="hasLenses" value={values.hasLenses} onChange={handleInputChange}>
                        <FormControlLabel value="Si" control={<Radio />} label="Si" />
                        <FormControlLabel value="No" control={<Radio />} label="No" />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl component="fieldset">
                <FormLabel>6. ¿Ha tenido covid-19?</FormLabel>
                    <RadioGroup row aria-label="6. ¿Ha tenido covid-19?" name="hasCovid" value={values.hasCovid} onChange={handleInputChange}>
                        <FormControlLabel value="Si" control={<Radio />} label="Si" />
                        <FormControlLabel value="No" control={<Radio />} label="No" />
                    </RadioGroup>
                </FormControl>
            </Grid>
        </Grid>
    )
}
