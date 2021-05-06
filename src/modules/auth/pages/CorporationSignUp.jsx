import React, { useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { Link } from '../../shared/components';
import {CorporationForm, RegistrationCompleted } from '../components';

export default function CompanySignUp({history}) {
    const [isRegisterCompleted, setIsRegisterCompleted] = useState(false)

    const handleRegisterCompleted = () => {
        setIsRegisterCompleted(true)
    }

    return (
        //is Register completed? Show register completed <RegistrationCompleted />
        isRegisterCompleted ? <RegistrationCompleted /> :
            <>
                <Grid container>
                    <Grid item xs={12} md={6} lg={5} style={{ margin: "auto" }}>
                        <Grid container spacing={3} style={{ padding: "4rem" }}>
                            <Grid item xs={12} justify="center">
                                <Typography variant="h4" component="h4">
                                    Solicitud de nuevo usuario
                                </Typography>
                            </Grid>
                            <Grid item xs={12} justify="center">
                                <Typography variant="body2" component="p">
                                    Completa los siguientes campos para ser parte de Operativa.
                                </Typography>
                                <Typography variant="body2" component="p">
                                    Si ya tienes una cuenta&nbsp;
                                    <Link href="#" onClick={() => history.push("/iniciar-sesion")} underline="always">inicia sesión.</Link>
                                </Typography>
                            </Grid>
                            <CorporationForm 
                                handleRegisterCompleted={handleRegisterCompleted}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </>
    )
}
