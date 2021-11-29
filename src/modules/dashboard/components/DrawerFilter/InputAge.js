import React from 'react'
import { Grid} from '@material-ui/core';
import { TextInput } from '../../../shared/components';

export default function InputSalaryExpectations({values, handleInputChange}) {
    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
            <TextInput
                    fullWidth
                    label="Desde"
                    variant="outlined"
                    name="age_from"
                    value={values.age_from}
                    onChange={handleInputChange}
                    helperText="Ejemplo: 20"
                />
            </Grid>
            <Grid item xs={6}>
            <TextInput
                    fullWidth
                    label="Hasta"
                    variant="outlined"
                    name="age_to"
                    value={values.age_to}
                    onChange={handleInputChange}
                    helperText="Ejemplo: 35"
                />
            </Grid>
        </Grid>
    )
}
