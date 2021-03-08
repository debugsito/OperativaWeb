import React, { useState } from 'react';
import { IconButton, Grid, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';
import { Button, TextInput } from '../../shared/components';
import { useForm } from "../../hooks/useForm";
import { isEmail } from "../../shared/libs/validators";
import RequestRecoverSent from "../components/RequestRecoverSent";
import {service_Auth} from "../../../store/services";

const initialValues = {
    email: ""
}

const SignIn = ({ history }) => {

    const [hasRequesSent, setHasRequesSent] = useState(false)
    const [error, setError] = useState(null);

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

    const handleClick = async () => {
        setError(null)
        try {
            let response = await service_Auth.recoverPassword(values)
            if (response.data) {
                setHasRequesSent(true);
            }
        } catch (error) {
            if (error.response.status === 401) {
                setError(error.response.data.message)
            } else {
                console.log("error", error)
            }
        }
    }

    return (
        <>
            {
                hasRequesSent ? <RequestRecoverSent /> :
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
                        <Grid container spacing={0} style={{ padding: 20, marginTop:"5%" }}>
                            <Grid item xs={12} md={6} lg={4} justify="center" style={{ margin: "auto" }}>
                                <Grid container spacing={3}>

                                    <Grid item xs={12} justify="center">
                                        <Typography align="center" variant="h4" component="h4">
                                            Recupera tu contraseña
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} justify="center">
                                        <Typography variant="body1" component="p">
                                            Ingrese tu correo electrónico para recibir instrucciones de cómo restrablecer tu contraseña.
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} justify="center">
                                        <TextInput
                                            fullWidth
                                            name="email"
                                            label="Correo electrónico"
                                            value={values.email}
                                            onChange={handleInputChange}
                                            error={errors.email}
                                            helperText={errors.email}
                                        />
                                    </Grid>
                                    <Grid item xs={12} className="justify-center">
                                        <Grid container spacing={3}>
                                            <Grid item xs={6}>
                                                <Button fullWidth variant="outlined" size="large" onClick={() => history.goBack()}>CANCELAR</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Button fullWidth variant="contained" size="large" onClick={handleClick} disabled={disabledButtonState}>ACEPTAR</Button>
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

export default SignIn;