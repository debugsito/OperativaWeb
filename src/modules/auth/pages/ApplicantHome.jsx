import React from 'react';

import { Grid, Typography } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import "../styles/ApplicantSignUp.css";
import { appManSVG } from '../images';
import { Button } from '../../shared/components';

const ApplicantHome = ({ history }) => {
    return (
        <Grid container justify="center" alignItems="center" spacing={1}>
            <Grid item xs={10} sm={6} md={5} lg={4} className="justify-center">
                <Grid container justify="center" alignItems="center" spacing={3} style={{ marginTop: "2rem" }}>
                    <Grid item xs={12} md={12} lg={12} className="justify-center">
                        <img src={appManSVG} alt="" />
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                        <Typography variant="h5" component="h5" className="title-color">
                            Bienvenido a Operativa
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                        <Typography variant="body1" component="p">
                            Para poder conectarte con tu trabajo ideal, necesitamos que completes tu perfil.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                        <Typography variant="body1" component="p">
                            Llenar tus datos te tomará solo 5 minutos aproximadamente.
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button endIcon={<ArrowForwardIosIcon />} fullWidth variant="contained" size="large" onClick={() => history.push('/postulante/perfil')}>empezar</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default ApplicantHome;