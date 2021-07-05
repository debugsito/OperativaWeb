import React from 'react'
import { FormControl, FormHelperText, InputLabel, Select } from "@material-ui/core";

export default function Index({ children, error, helperText, MenuItem, label, ...props }) {


    return (
        <FormControl variant="outlined" fullWidth error={error}>
            <InputLabel id="demo-simple-select-outlined-label">{label}</InputLabel>
            <Select
                labelId="demo-simple-select-outlined-label"
                // id="demo-simple-select-outlined"
                label={label}
                {...props}

            >
                {children}
            </Select>
            {error && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    )
}
