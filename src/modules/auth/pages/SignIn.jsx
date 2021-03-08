import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';
import { Button, Checkbox, Link, TextInput } from '../../shared/components';

import { useForm } from "../../hooks/useForm";
import { isEmail } from "../../shared/libs/validators";
import { setUserError, setUser, logIn } from '../../../store/actions/auth/auth.action';

const initialValues = {
    email: "",
    password: "",
}

const SignIn = ({ history }) => {

    const dispatch = useDispatch();
    const { error, user } = useSelector((state) => state.auth);
    const [showPassword, setShowPassword] = useState(false);

    const goSignUpPage = () => {
        history.push('/tipo-de-cuenta')
    }

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('email' in fieldValues)
            temp.email = fieldValues.email ? (isEmail(fieldValues.email) ? "" : "Correo electronico no válido") : "El campo es requerido."
        if ('password' in fieldValues)
            temp.password = fieldValues.password ? "" : "El campo es requerido."

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

    const handleLogin = async() => {
        dispatch(logIn(values));
    }

    return (
        <>
            {error && <Alert action={
                <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                        dispatch(setUserError(null));
                    }}
                >
                    <CloseIcon fontSize="inherit" />
                </IconButton>
            } severity="error">{error}</Alert>}
            <Grid container spacing={0} style={{ padding: 20 }}>
                <Grid item xs={12} md={6} lg={4} justify="center" style={{ margin: "auto" }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} justify="center">
                            <Typography align="center" variant="h4" component="h4">
                                Inicia sesión
                            </Typography>
                        </Grid>
                        <Grid item xs={12} justify="center">
                            <Typography align="center" variant="body1" component="p">
                                Si aún no tienes cuenta en Operativa&nbsp;
                            <Link href="#" onClick={goSignUpPage} underline="always">regístrate aquí</Link>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} justify="center">
                            <TextInput
                                fullWidth
                                name="email"
                                label="Correo electrónico"
                                value={values.email}
                                onChange={handleInputChange}
                                error={errors.email? true:false}
                                helperText={errors.email}
                            />
                        </Grid>
                        <Grid item xs={12} justify="center">
                            <FormControl className="sign-in__input-container" variant="outlined" fullWidth error={errors.password? true:false}>
                                <InputLabel htmlFor="outlined-password" >Crear contraseña</InputLabel>
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
                                <FormHelperText>{errors.password}</FormHelperText>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl className="" variant="outlined" fullWidth >
                                <Checkbox
                                    label={
                                        <Typography variant="body2" component="p">
                                            Mantener mi sesión iniciada.
                                        </Typography>
                                    }
                                    name="keepMySession"
                                // checked={values.keepMySession}
                                // onChange={handleInputChange}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} justify="center">
                            <Button fullWidth variant="contained" size="large" onClick={handleLogin} disabled={disabledButtonState}>INGRESA</Button>
                        </Grid>
                        <Grid item xs={12} justify="center">
                            <Typography align="center" variant="body1" component="p">
                                <Link href="#" onClick={() => history.push("/recuperar-contraseña")} underline="always">¿Olvidaste tu contraseña?</Link>
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default SignIn;