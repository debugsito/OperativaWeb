import React, { useState } from 'react'
import { useHistory, useLocation } from "react-router-dom";
import { FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';
import { Button } from '../../shared/components';
import { useForm } from "../../hooks";
import {service_Auth} from "../../../store/services";
import RequestNewPasswordSent from "../components/RequestNewPasswordSent";

const initialValues = {
    password: "",
    password_confirmed: ""
}

export default function Index(props) {
    const history = useHistory();
    const search = useLocation().search;
    const token = new URLSearchParams(search).get('token');

    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const [error, setError] = useState(null)
    const [hasRequestSent, setHasRequestSent] = useState(false)

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('password' in fieldValues)
            temp.password = fieldValues.password ? (fieldValues.password.length < 6 ? "Ingrese 6 caracteres entre letras y números" : "") : "El campo es requerido."
        if ('repeatPassword' in fieldValues)
            temp.repeatPassword = fieldValues.repeatPassword ? (fieldValues.repeatPassword != values.password ? "Ambas contraseñas deben ser iguales" : "") : "El campo es requerido."

        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        disabledButtonState,
    } = useForm(initialValues, true, validate);

    const handleRestorePassword = async () => {
        const body = {
            ...values, token
        }
        setError(null)
        try {
            let response = await service_Auth.changePassword(body)
            if (response.data) {
                setHasRequestSent(true);
            }
        } catch (error) {
            if (error.response.status === 401) {
                setError(`${error.response.data.message}, el token a expirado.` )
            } else {
                console.log("error", error)
            }
        }
    }

    return (
        <>
            {
                hasRequestSent ? < RequestNewPasswordSent /> :
                    <>
                    {error && <Alert action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setError(null);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        } severity="error">{error}</Alert>}
                        <Grid container spacing={3} direction="row" justify="center" alignItems="center" style={{ padding: 20, height: "80vh" }}>
                            <Grid item xs={12} md={6} lg={4}>
                                <Grid container spacing={3} direction="row" justify="center" alignItems="center">
                                    <Grid item xs={12} justify="center">
                                        <Typography align="center" variant="h4" component="h4">
                                            Restablecer contraseña
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} justify="center">
                                        <FormControl className="sign-in__input-container" variant="outlined" fullWidth error={errors.password}>
                                            <InputLabel htmlFor="outlined-password" >Contraseña Nueva</InputLabel>
                                            <OutlinedInput
                                                name="password"
                                                id="outlined-password"
                                                type={showPassword ? 'text' : 'password'}
                                                value={values.password}
                                                onChange={handleInputChange}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            id="outlined-password-icon"
                                                            aria-label="toggle password visibility"
                                                            onClick={() => setShowPassword(!showPassword)}
                                                            // onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                labelWidth={127}
                                            />
                                            <FormHelperText>{errors.password || "Ingrese 6 caracteres entre letras y números"}</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} justify="center">
                                        <FormControl className="sign-in__input-container" variant="outlined" fullWidth error={errors.password_confirmed}>
                                            <InputLabel htmlFor="outlined-password" >Confirmar contraseña nueva</InputLabel>
                                            <OutlinedInput
                                                name="password_confirmed"
                                                id="outlined-password"
                                                type={showRepeatPassword ? 'text' : 'password'}
                                                value={values.password_confirmed}
                                                onChange={handleInputChange}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            id="outlined-password-icon"
                                                            aria-label="toggle password visibility"
                                                            onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                                                            // onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                            {showRepeatPassword ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                labelWidth={127}
                                            />
                                            <FormHelperText>{errors.password_confirmed}</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} className="justify-center">
                                        <Grid container spacing={3}>
                                            <Grid item xs={6}>
                                                <Button fullWidth variant="outlined" size="large" onClick={() => history.goBack()}>Cancelar</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Button fullWidth variant="contained" size="large" onClick={handleRestorePassword} disabled={disabledButtonState}>Siguiente</Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </>
            }

        </>
    )
}
