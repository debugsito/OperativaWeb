import React from 'react'
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Grid, FormControl, FormHelperText } from '@material-ui/core';
import { useForm } from "../../../hooks";
import { Button, Checkbox, TextInput, TextInputPassword, Typography, Link } from "../../../shared/components";
import { logIn } from "../../../../store/actions/auth/auth.middleware";

const initialValues = {
    email: "",
    password: ""
}

export default function SignInForm({ setValue }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const { error } = useSelector((state) => state.auth);

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('email' in fieldValues)
            temp.email = fieldValues.email ? "" : "El campo es requerido."
        if ('password' in fieldValues)
            temp.password = fieldValues.password ? "" : "El campo es requerido."

        setErrors({ ...temp })

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

    const handleLogin = async () => {
        dispatch(logIn(values));
    }

    return (
        <Grid container spacing={1} justify="center">
            <Grid item xs={12}>
                <TextInput
                    fullWidth
                    name="email"
                    label="Correo electrónico"
                    value={values.email}
                    onChange={handleInputChange}
                    error={errors.email ? true : false}
                    helperText={errors.email}
                />
            </Grid>
            <Grid item xs={12}>
                <TextInputPassword
                    fullWidth
                    name="password"
                    label="Contraseña"
                    value={values.password}
                    onChange={handleInputChange}
                    error={errors.password ? true : false}
                    helperText={errors.password}
                />
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
                    />
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                {
                    error &&
                    <FormHelperText error>{error}</FormHelperText>
                }
            </Grid>
            <Grid item xs={12}>
                <Button fullWidth variant="contained" size="large" onClick={handleLogin} disabled={disabledButtonState}>INGRESA</Button>
            </Grid>
            <Grid item xs={12}>
                <Typography align="center" variant="body1" component="p">
                    <Link href="#" onClick={() => history.push("/recuperar-contraseña")} underline="always">¿Olvidaste tu contraseña?</Link>
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography align="center" variant="body1" component="p">
                    <Link href="#" onClick={() => setValue(0)} underline="always">¿No eres miembro? Regístrate</Link>
                </Typography>
            </Grid>
        </Grid>
    )
}
