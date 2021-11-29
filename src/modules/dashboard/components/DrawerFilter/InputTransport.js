import React from 'react'
import { FormControl, FormControlLabel, Grid, RadioGroup } from '@material-ui/core';
import { Radio, Typography } from '../../../shared/components';

function InputTransport({values, handleInputChange}) {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography>
                    El postulante declara que tiene facilidad para acceder a medios de transporte público o dispone de uno privado.
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <FormControl component="fieldset">
                    <RadioGroup row aria-label="hasTransport" name="hasTransport" value={values.hasTransport} onChange={handleInputChange}>
                        <FormControlLabel value="Si" control={<Radio />} label="Si" />
                        <FormControlLabel value="No" control={<Radio />} label="No" />
                    </RadioGroup>
                </FormControl>
            </Grid>

        </Grid>

    )
}

export default InputTransport
