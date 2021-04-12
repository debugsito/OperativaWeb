import React from 'react'
import { Container, Grid, Typography } from "@material-ui/core";
import { Alert, AlertTitle } from '@material-ui/lab';

import { Breadcrumbs, Button, TextInputPassword } from "../../shared/components";
import { SessionRoutes } from '../../shared/libs/sessionRoutes';
import { useForm } from "../../hooks";
import { useDispatch } from "react-redux";
import { changePasswordFromDashboard } from "../../../store/actions/auth/auth.action";

const initialValues = {
    old_password: "",
    new_password: "",
    new_password_confirmed: ""
}

export default function Setting(props) {
    const dispatch = useDispatch()
    const initRoute = SessionRoutes().initRoute;
    const routes = [{ name: "Configuracion", to: `${initRoute}/configuracion` }];

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('old_password' in fieldValues)
            temp.old_password = fieldValues.old_password ? (fieldValues.old_password.length < 6? "Ingrese mínimo 6 caracteres entre letras y numeros" : "") : "El campo es requerido."
        if ('new_password' in fieldValues)
            temp.new_password = fieldValues.new_password ? (fieldValues.new_password.length < 6? "Ingrese mínimo 6 caracteres entre letras y numeros" : "") : "El campo es requerido."
        if ('new_password_confirmed' in fieldValues)
            temp.new_password_confirmed = fieldValues.new_password_confirmed ? (fieldValues.new_password_confirmed.length < 6? "Ingrese mínimo 6 caracteres entre letras y numeros" : "") : "El campo es requerido."

        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        errors,
        setErrors,
        handleInputChange,
        disabledButtonState,
    } = useForm(initialValues, true, validate);

    const handleClickSave = () => {
        dispatch(changePasswordFromDashboard(values))
    }

    return (
        <Container className="dashboard-container">
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <Breadcrumbs routes={routes} />
                </Grid>
                {/* <Grid item xs={12}>
                    <Grid container spacing={0} justify="flex-end">
                        <Grid item xs={4}>
                            <Alert severity="success" onClose={() => {}}>
                                <AlertTitle>Success</AlertTitle>
                                This is a success alert — <strong>check it out!</strong>
                            </Alert>        
                        </Grid>
                    </Grid>
                </Grid> */}
               
                <Grid item xs={12} style={{ margin: "1rem" }}>
                    <Grid container xs={12} md={6} spacing={3} style={{ margin: "auto" }}>
                        <Grid item xs={12}>
                            <Typography align="left" variant="h6" component="h6">
                                <strong>Cambiar contraseña</strong>
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography align="left" variant="body1" component="p">
                                Se recomienda crear una contraseña segura de mínimo 6 caracteres, puedes combinar entre letras y numeros.
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container xs={12} md={5} spacing={3} style={{ margin: "auto" }}>
                        <Grid item xs={12}>
                            <TextInputPassword
                                label="Contraseña actual"
                                name="old_password"
                                onChange={handleInputChange}
                                value={values.old_password}
                                error={errors.old_password ? true : false}
                                helperText={errors.old_password}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextInputPassword
                                label="Contraseña nueva"
                                name="new_password"
                                value={values.new_password}
                                onChange={handleInputChange}
                                error={errors.new_password ? true : false}
                                helperText={errors.new_password}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextInputPassword
                                label="Confirmar contraseña nueva"
                                name="new_password_confirmed"
                                value={values.new_password_confirmed}
                                onChange={handleInputChange}
                                error={errors.new_password_confirmed ? true : false}
                                helperText={errors.new_password_confirmed}
                            />
                        </Grid>

                    </Grid>
                    <Grid container xs={12} md={5} spacing={3} style={{ margin: "auto" }}>
                        <Grid item xs={12}>
                            <Grid container justify="center">
                                <Button variant="outlined" size="large" >Cancelar</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Button variant="contained" size="large" onClick={handleClickSave} disabled={disabledButtonState}>ACEPTAR</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}
