import React from 'react';

import { Grid, Typography } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import "../styles/ApplicantSignUp.css";
import { teamSVG } from '../images';
import { Button, TextSkyBlue } from '../../shared/components';

const ApplicantHome = ({ history }) => {
    return (
        <Grid container justify="center" alignItems="center" spacing={1}>
            <Grid item xs={10} sm={6} md={5} lg={4} className="justify-center">
                <Grid container justify="center" alignItems="center" spacing={3} style={{ marginTop: "2rem" }}>
                    <Grid item xs={12} className="justify-center">
                        <img src={teamSVG} alt="Equipo Operativa" />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h5" component="h5" className="title-color">
                            Bienvenido a Operativa
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Typography variant="body1" component="p">
                                Para poder conectarte con tu trabajo ideal <TextSkyBlue>crea tu CV</TextSkyBlue> en nuestra plataforma. 
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body1" component="p">
                                Es <TextSkyBlue>muy importante colocar tus datos actualizados</TextSkyBlue>, así será más fácil que las empresas puedan contactarse contigo.
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body1" component="p">
                                Crear tu CV te tomará solo 5 minutos aproximadamente.
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    
                    <Grid item xs={12}>
                        <Button endIcon={<ArrowForwardIosIcon />} fullWidth variant="contained" size="large" onClick={() => history.push('/postulante/perfil')}>empezar</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default ApplicantHome;