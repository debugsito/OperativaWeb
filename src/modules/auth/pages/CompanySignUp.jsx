import React, { useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { Link } from '../../shared/components';
import { RepresentativeForm, CompanyForm, RegistrationCompleted } from '../components';

export default function CompanySignUp({history}) {

    const [isRepresentativeFormComplete, setIsRepresentativeFormComplete] = useState(false)
    const [isRegisterCompleted, setIsRegisterCompleted] = useState(false)
    const [representativeFormData, setRepresentativeFormData] = useState(null)

    const goNextForm = (values) => {
        setRepresentativeFormData(values)
        setIsRepresentativeFormComplete(true);
    }

    const handleRegisterCompleted = () => {
        setIsRegisterCompleted(true)
    }

    const goToPreviousForm = () => {
        setIsRepresentativeFormComplete(false)
    }

    return (
        //is Register completed? Show register completed <RegistrationCompleted />
        isRegisterCompleted ? <RegistrationCompleted /> :
            <>
                <Grid container spacing={3}>
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
                            {
                                isRepresentativeFormComplete ?
                                    <CompanyForm 
                                        handleRegisterCompleted={handleRegisterCompleted}
                                        goToPreviousForm={goToPreviousForm}
                                        representativeFormData={representativeFormData}
                                    /> :
                                    <RepresentativeForm
                                        goNextForm={goNextForm}
                                    />
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </>
    )
}
