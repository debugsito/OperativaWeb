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
                    name="salary_from"
                    value={values.salary_from}
                    onChange={handleInputChange}
                    helperText="En soles Neto S/"
                />
            </Grid>
            <Grid item xs={6}>
            <TextInput
                    fullWidth
                    label="Hasta"
                    variant="outlined"
                    name="salary_to"
                    value={values.salary_to}
                    onChange={handleInputChange}
                    helperText="En soles Neto S/"
                />
            </Grid>
        </Grid>
    )
}
