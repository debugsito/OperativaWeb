import React from 'react'
import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

export default function Index({ error, label, helperText, ...props }) {
    const [showPassword, setShowPassword] = React.useState(false)

    return (
        <FormControl className="sign-in__input-container" variant="outlined" fullWidth error={error}>
            <InputLabel htmlFor="outlined-password" >{label}</InputLabel>
            <OutlinedInput
                type={showPassword ? 'text' : 'password'}
                {...props}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            id="outlined-password-icon"
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(prevState => !prevState)}
                            edge="end"
                        >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                }
                labelWidth={127}
            />
            <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
    )
}
