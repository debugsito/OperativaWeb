import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import "../styles/ApplicantSignUp.css";

import { FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';

import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Button, Checkbox, Link, TextInput } from '../../shared/components';
import { TermsAndConditionModal } from '../components';

import { isEmail } from '../../shared/libs/validators';
import { setUserError, applicantSignUp } from '../../../store/actions/auth/auth.action';

const initialValue = {
    value: '',
    error: false,
    helperText: '',
    show: false,
    checked: false
}

const SignUp = ({ history }) => {
    const dispatch = useDispatch();
    const { error, signUpSucces } = useSelector((state) => state?.auth);
    const [hasError, setHasError] = useState('');

    const [email, setEmail] = useState(initialValue);
    const [password, setPassword] = useState(initialValue);
    const [repeatPassword, setRepeatPassword] = useState(initialValue);
    const [termsAndCondition, setTermsAndCondition] = useState(initialValue);

    const [showTermsAndConditionModal, setShowTermsAndConditionModal] = useState(false);

    useEffect(() => {
        setHasError(error)
    }, [error])

    useEffect(() => {
        console.log("signUpSucces",signUpSucces)
        if(signUpSucces){
            history.push('/postulante/inicio')
        }

    },[signUpSucces])

    const handleClickShowPassword = (prop) => () => {
        if (prop === 'password') setPassword({ ...password, show: !password.show })
        if (prop === 'repeatPassword') setRepeatPassword({ ...repeatPassword, show: !repeatPassword.show })
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const goSignUpPage = () => {
        history.push('/iniciar-sesion')
    }

    const openTermsAndConditionModal = (event) => {
        event.preventDefault();
        setShowTermsAndConditionModal(true);
    }

    const handleRegister = () => {
        validateEmail();
        validatePassword();
        validateRepeatPassword();
        validateTermsAndCondition();

        if (!email.error && !password.error && !repeatPassword.error && !validateTermsAndCondition.error) {
            const body = {
                email: email.value,
                password: password.value,
                term_condi: termsAndCondition.checked === true ? 1 : 0
            }
            dispatch(applicantSignUp(body));
        }
    }

    const validateEmail = (value) => {
        let error = false, helperText = '';
        const _email = value !== undefined ? value : email.value;
        if (!_email) {
            error = true;
            helperText = 'Este campo es requerido';
        } else if (!isEmail(_email)) {
            error = true;
            helperText = 'Coloque un email válido';
        }

        setEmail({ ...email, value: _email, error, helperText });
    }

    const validatePassword = (value) => {
        let error = false, helperText = '';
        const _password = value !== undefined ? value : password.value;
        if (!_password) {
            error = true;
            helperText = 'Este campo es requerido';
        } else if (_password.length < 6) {
            error = true;
            helperText = 'Ingrese 6 caracteres entre letras y números';
        }

        setPassword({ ...password, value: _password, error, helperText });
    }

    const validateRepeatPassword = (value) => {
        let error = false, helperText = '';
        const _repeatPassword = value !== undefined ? value : repeatPassword.value;
        if (!_repeatPassword) {
            error = true;
            helperText = 'Este campo es requerido';
        } else if (_repeatPassword !== password.value) {
            error = true;
            helperText = 'Ambas contraseñas deben ser iguales';
        }

        setRepeatPassword({ ...repeatPassword, value: _repeatPassword, error, helperText });
    }

    const validateTermsAndCondition = (value) => {
        let error = false, helperText = '';
        const _termsAndCondition = value !== undefined ? value : termsAndCondition.checked;
        if (!_termsAndCondition) {
            error = true;
            helperText = 'Debe aceptar los términos y condiciones';
        }

        setTermsAndCondition({ ...termsAndCondition, checked: _termsAndCondition, error, helperText });
    }

    const handleAcceptTermsAndCondition = () => {
        validateTermsAndCondition(true);
        setShowTermsAndConditionModal(false);
    }

    const goBack = () => history.goBack()

    return (
        <>
            {hasError && <Alert action={
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
            } severity="error">{hasError}</Alert>}
            <Grid container spacing={0}  style={{ padding: 20 }}>
                <Grid item xs={12} md={6} lg={4} justify="center" style={{ margin: "auto" }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} justify="center">
                            <Typography align="center" variant="h5" component="h5" className="title-color">
                                Regístrate
                            </Typography>
                        </Grid>
                        <Grid item xs={12} justify="center">
                            <Typography align="center" variant="body1" component="p">
                                Si ya tienes una cuenta&nbsp;
                            <Link href="#" onClick={goSignUpPage} underline="always">inicia sesión</Link>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} justify="center">
                            <TextInput
                                fullWidth
                                label="Correo electrónico"
                                value={email.value}
                                onChange={(event) => validateEmail(event.target.value)}
                                error={email.error}
                                helperText={email.error && email.helperText}
                            />
                        </Grid>
                        <Grid item xs={12} justify="center">
                            <FormControl className="applicant-sign-up__input-container" variant="outlined" fullWidth error={password.error}>
                                <InputLabel htmlFor="outlined-password" >Crear contraseña</InputLabel>
                                <OutlinedInput
                                    id="outlined-password"
                                    type={password.show ? 'text' : 'password'}
                                    value={password.value}
                                    onChange={(event) => validatePassword(event.target.value)}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                id="outlined-password-icon"
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword('password')}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {password.show ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    labelWidth={127}
                                />
                                <FormHelperText>{(password.error && password.helperText) || "Ingrese 6 caracteres entre letras y números"}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} justify="center">
                            <FormControl className="applicant-sign-up__input-container" variant="outlined" fullWidth error={repeatPassword.error}>
                                <InputLabel htmlFor="outlined-repeat-password" >Confirmar contraseña</InputLabel>
                                <OutlinedInput
                                    id="outlined-repeat-password"
                                    type={repeatPassword.show ? 'text' : 'password'}
                                    value={repeatPassword.value}
                                    onChange={(event) => validateRepeatPassword(event.target.value)}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                id="outlined-repeat-password-icon"
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword('repeatPassword')}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {repeatPassword.show ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    labelWidth={157}
                                />
                                {repeatPassword.error && <FormHelperText>{repeatPassword.helperText}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl className="applicant-sign-up__checkbox-container align-items-center" variant="outlined" fullWidth error={termsAndCondition.error}>
                                <Checkbox
                                    label={
                                        <Typography variant="body2" component="p">
                                            Acepto los&nbsp;
                                        <Link onClick={openTermsAndConditionModal} underline="always">términos y condiciones</Link>
                                        </Typography>
                                    }
                                    checked={termsAndCondition.checked}
                                    onChange={(event) => validateTermsAndCondition(event.target.checked)}
                                />
                                {termsAndCondition.error && <FormHelperText>{termsAndCondition.helperText}</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} className="justify-center">
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <Button fullWidth variant="outlined" size="large" onClick={goBack}>Cancelar</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </Grid>
                                <Grid item xs={6}>
                                    <Button fullWidth variant="contained" size="large" onClick={handleRegister} disabled={!email.value || !password.value || !repeatPassword.value || !termsAndCondition.checked}>Siguiente</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <TermsAndConditionModal open={showTermsAndConditionModal} handleClose={() => setShowTermsAndConditionModal(false)} handleAccept={handleAcceptTermsAndCondition} />
        </>
    )
}

export default SignUp;