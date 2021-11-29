import React from 'react'
import { MenuItem, Grid } from '@material-ui/core'
import { Select } from '../../../shared/components'

export default function InputGender({values, handleInputChange}) {
    return (
        <Grid container spacing={3}>
        <Grid item xs={10}>
            <Select
                label="Género"
                name="gender_id"
                value={values.gender_id}
                onChange={handleInputChange}
            >
                <MenuItem value="1">Masculino</MenuItem>
                <MenuItem value="2">Femenino</MenuItem>
                <MenuItem value="3">Otro</MenuItem>
            </Select>
        </Grid>
        
    </Grid>
    )
}
