import React from 'react'
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@material-ui/core';

export default function Index({ error, label, helperText, labelWidth = 127, ...props }) {
    const [showPassword, setShowPassword] = React.useState(false)

    return (
        <FormControl variant="outlined" fullWidth error={error}>
            <InputLabel htmlFor="password" >{label}</InputLabel>
            <OutlinedInput
                labelWidth={labelWidth}
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(prevState => !prevState)}
                            edge="end"
                        >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                }
                {...props}
            />
            <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
    )
}
