import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@material-ui/core';
import React from 'react'
import { useController } from 'react-hook-form';

const Selection = ({variant= "outlined", fullWidth=true, name,control,label,helperText="", items =[]}) => {
    const {
        field,
        fieldState: {error}
      } = useController({name, control});
    return (
        <FormControl variant={variant} fullWidth={fullWidth} error={error}>
            <InputLabel id={`select-${name}`}>{label}</InputLabel>
            <Select
                labelId={`select-${name}`}
                label={label}
                {...field}
            >
                {items.map(item => (
                    <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                ))}
            </Select>
            {error && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    )
}

export default Selection
