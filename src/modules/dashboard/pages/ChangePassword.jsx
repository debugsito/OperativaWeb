import React, { useState, useEffect } from 'react'
import { Container, Grid, Typography } from "@material-ui/core";
// import { Alert, AlertTitle } from '@material-ui/lab';
import { Alert, Breadcrumbs, Button, TextInputPassword } from "../../shared/components";
import { SessionRoutes } from '../../shared/libs/sessionRoutes';
import { useForm } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { changePasswordFromDashboard } from "../../../store/actions/auth/auth.action";
import { setAlert } from "../../../store/actions/global";

const initialValues = {
    old_password: "",
    new_password: "",
    new_password_confirmed: ""
}

export default function Setting(props) {
    const dispatch = useDispatch()
    const { alert } = useSelector(state => state.global)
    const initRoute = SessionRoutes().initRoute;
    const routes = [{ name: "Configuracion", to: `${initRoute}/configuracion` }];
    const [showAlert, setShowAlert] = useState(false)


    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('old_password' in fieldValues)
            temp.old_password = fieldValues.old_password ? (fieldValues.old_password.length < 6 ? "Ingrese mínimo 6 caracteres entre letras y numeros" : "") : "El campo es requerido."
        if ('new_password' in fieldValues)
            temp.new_password = fieldValues.new_password ? (fieldValues.new_password.length < 6 ? "Ingrese mínimo 6 caracteres entre letras y numeros" : "") : "El campo es requerido."
        if ('new_password_confirmed' in fieldValues)
            temp.new_password_confirmed = fieldValues.new_password_confirmed ? (fieldValues.new_password_confirmed.length < 6 ? "Ingrese mínimo 6 caracteres entre letras y numeros" : "") : "El campo es requerido."

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

    useEffect(() => {
        if (alert) {
            setShowAlert(true)
            if (alert.type === 'success') setValues({ ...initialValues })
        }

    }, [alert])

    const handleClickSave = () => {
        dispatch(changePasswordFromDashboard(values))
    }

    const handleCloseAlert = () => {
        setShowAlert(false)
        dispatch(setAlert(null))
    }

    return (
        <Container className="dashboard-container">
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <Breadcrumbs routes={routes} />
                </Grid>
                {showAlert &&
                    <Grid item xs={12}>
                        <Grid container spacing={0} justify="flex-end">
                            <Grid item xs={5}>
                                <Alert
                                    severity={alert.type}
                                    onClose={handleCloseAlert}
                                    title={alert.title}
                                    message={alert.message}
                                />

                            </Grid>
                        </Grid>
                    </Grid>}

                <Grid item xs={12} style={{ marginTop: "1rem" }}>
                    <Grid container spacing={3} direction="column" alignItems="center">
                        <Grid item xs={12} md={5} style={{width:'100%'}}>
                            <Typography align="left" variant="h6" component="h6">
                                <strong>Cambiar contraseña</strong>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <Typography align="left" variant="body1" component="p">
                                Se recomienda crear una contraseña segura de mínimo 6 caracteres, puedes combinar entre letras y numeros.
                            </Typography>
                        </Grid>
                        
                    </Grid>
                    <Grid container spacing={3} direction="column" alignItems="center" justify="center" >
                        <Grid item xs={12} md={4} style={{width:'100%'}}>
                            <TextInputPassword
                                label="Contraseña actual"
                                name="old_password"
                                onChange={handleInputChange}
                                value={values.old_password}
                                error={errors.old_password ? true : false}
                                helperText={errors.old_password}
                            />
                        </Grid>
                        <Grid item xs={12} md={4} style={{width:'100%'}}>
                            <TextInputPassword
                                label="Contraseña nueva"
                                name="new_password"
                                value={values.new_password}
                                onChange={handleInputChange}
                                error={errors.new_password ? true : false}
                                helperText={errors.new_password}
                            />
                        </Grid>
                        <Grid item xs={12} md={4} style={{width:'100%'}}>
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
                    <Grid container spacing={3} justify="center" style={{marginTop:'1.5rem'}}>
                        <Button variant="outlined" size="large" >Cancelar</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Button variant="contained" size="large" onClick={handleClickSave} disabled={disabledButtonState}>ACEPTAR</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}
