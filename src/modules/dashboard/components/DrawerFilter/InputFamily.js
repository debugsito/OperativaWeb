import React from 'react'
import { FormControl, FormControlLabel, Grid, RadioGroup, FormLabel } from '@material-ui/core';
import { Radio } from '../../../shared/components';

export default function InputLabor({values,handleInputChange}) {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <FormControl component="fieldset">
                <FormLabel>1. ¿Tiene hijos?</FormLabel>
                    <RadioGroup row aria-label="¿Tiene hijos?" name="hasChildren" value={values.hasChildren} onChange={handleInputChange}>
                        <FormControlLabel value="Si" control={<Radio />} label="Si" />
                        <FormControlLabel value="No" control={<Radio />} label="No" />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl component="fieldset">
                <FormLabel>2. ¿Tiene alguna persona bajo su responsabilidad?</FormLabel>
                    <RadioGroup row aria-label="¿Tiene alguna persona bajo su responsabilidad?" name="hasResponsabilityPerson" value={values.hasResponsabilityPerson} onChange={handleInputChange}>
                        <FormControlLabel value="Si" control={<Radio />} label="Si" />
                        <FormControlLabel value="No" control={<Radio />} label="No" />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl component="fieldset">
                <FormLabel>3. Vive solo/a.</FormLabel>
                    <RadioGroup row aria-label="Vive solo/a" name="hasAlone" value={values.hasAlone} onChange={handleInputChange}>
                        <FormControlLabel value="Si" control={<Radio />} label="Si" />
                        <FormControlLabel value="No" control={<Radio />} label="No" />
                    </RadioGroup>
                </FormControl>
            </Grid>
        </Grid>
    )
}
