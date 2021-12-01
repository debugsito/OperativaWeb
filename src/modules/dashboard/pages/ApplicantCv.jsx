import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Paper, makeStyles } from "@material-ui/core";

import { Button, Breadcrumbs, Container, Modal, TitlePage, Typography } from '../../shared/components';
import { checkCircleIcon, closeIcon, registeredIcon } from "../images";
import { getProfileOfApplicant } from "../../../store/actions/dashboard/dashboard.middleware";
import { SessionRoutes } from '../../shared/libs/sessionRoutes';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const EXPERIENCE_DATA = [
    { empresa: "Delivry Lima SAC", address: "Av. Industrial", cargo: "Motorizado", rubro: "Logistico", startDate: "01/01/2019", endDate: "01/01/2019", salary: "1000 soles", hours: "48 horas semanales", extra: "No" },
    { empresa: "METRO SAC", address: "Av. Industrial dasda", cargo: "Repartidor", rubro: "Logistico", startDate: "01/01/2019", endDate: "01/01/2019", salary: "1000 soles", hours: "48 horas semanales", extra: "No" },
]

const useStyles = makeStyles(theme => ({
    paper: {
        padding: "2rem",
        boxShadow: "0px 4px 14px -5px #D0D4DF",
    },
    description: {
        marginLeft: "2.5rem"
    },
    containerInfo: {
        background: "#F5F7F9",
        padding: "3rem 4rem"
    },
    containerWhite: {
        background: "#fff",
        borderRadius: "10px",
        margin: "0.5rem 0",
        padding: "2rem",
        width: "100%"
    },
    colorSecondary: {
        color: "#46A9D4",
    },
}))


const ApplicantCv = () => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    let { postulant_id } = useParams()
    const initRoute = SessionRoutes().initRoute;
    const { applicantProfile, publicationSelected, postulantsByPublicationId } = useSelector(state => state.dashboard)
    const { districts } = useSelector(state => state.utils)

    const routes = [
        { name: "Incio", to: `${initRoute}` },
        { name: "Postulantes", to: `${initRoute}/lista-de-postulantes` },
        { name: "CV", to: `${initRoute}/lista-de-postulantes/perfil` }
    ];

    return (
        <div>
            <Container>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Breadcrumbs routes={routes} />
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <TitlePage handleClick={() => history.goBack()}>
                                        Jose Ricardo Merino Salazar
                                    </TitlePage>
                                </Grid>
                                <Grid item xs={6}>
                                    <Grid container justify="flex-end" spacing={3}>
                                        <Grid item>
                                            <Button startIcon={<HighlightOffIcon />} size="large">Descartar</Button>
                                        </Grid>
                                        <Grid item>
                                            <Button startIcon={<CheckCircleIcon />} color="secondary" size="large">Seleccionar</Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} className={classes.description}>
                                    <Typography variant="body2">{`Fecha de postulacion 24/08/2021`}</Typography>
                                    <Typography variant="body2">{`Fecha ultima de actualización 30/10/2021`}</Typography>
                                </Grid>
                                <Grid item xs={12} >
                                    <div className={classes.containerInfo}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} className={`${classes.containerWhite} ${classes.colorSecondary}`}>
                                                <Typography variant="h6"><b>Datos Personales</b></Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={6}>
                                                        <Typography variant="body1"><b>DNI:</b> 76443280</Typography>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Typography variant="body1"><b>Fecha de nacimiento:</b> 07/04/1994</Typography>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Typography variant="body1"><b>Género:</b> Masculino</Typography>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Typography variant="body1"><b>Ciudad:</b> Lima, Villa el Salvador</Typography>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Typography variant="body1"><b>Direccion:</b> Av. Grau 123</Typography>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Typography variant="body1"><b>Referencia:</b> A una cuadra del grifo Repsol</Typography>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Typography variant="body1"><b>Teléfono:</b> 962979999</Typography>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Typography variant="body1"><b>Email:</b> jose@gmail.com</Typography>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Typography variant="body1"><b>Estado Civil:</b> Soltero</Typography>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Typography variant="body1"><b>Edad:</b> 30 años</Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} className={`${classes.containerWhite} ${classes.colorSecondary}`}>
                                                <Typography variant="h6"><b>Experiencia laboral</b></Typography>
                                            </Grid>
                                            {EXPERIENCE_DATA.map((item, index) => (
                                                <div className={classes.containerWhite}>
                                                    <Grid item xs={12} key={index}>
                                                        <Grid container spacing={3}>
                                                            <Grid item xs={4}>
                                                                <Typography variant="subtitle1" ><b>Empresa</b></Typography>
                                                                <Typography variant="body2" >{item.empresa}</Typography>
                                                            </Grid>
                                                            <Grid item xs={4}>
                                                                <Typography variant="subtitle1" ><b>Dirección</b></Typography>
                                                                <Typography variant="body2" >{item.address}</Typography>
                                                            </Grid>
                                                            <Grid item xs={4}>
                                                                <Typography variant="subtitle1" ><b>Cargo</b></Typography>
                                                                <Typography variant="body2" >{item.cargo}</Typography>
                                                            </Grid>
                                                            <Grid item xs={4}>
                                                                <Typography variant="subtitle1" ><b>Rubro</b></Typography>
                                                                <Typography variant="body2" >{item.rubro}</Typography>
                                                            </Grid>
                                                            <Grid item xs={4}>
                                                                <Typography variant="subtitle1" ><b>Fecha de inicio</b></Typography>
                                                                <Typography variant="body2" >{item.startDate}</Typography>
                                                            </Grid>
                                                            <Grid item xs={4}>
                                                                <Typography variant="subtitle1" ><b>Fecha de fin</b></Typography>
                                                                <Typography variant="body2" >{item.endDate}</Typography>
                                                            </Grid>
                                                            <Grid item xs={4}>
                                                                <Typography variant="subtitle1" ><b>Ingreso Mensual</b></Typography>
                                                                <Typography variant="body2" >{item.salary}</Typography>
                                                            </Grid>
                                                            <Grid item xs={4}>
                                                                <Typography variant="subtitle1" ><b>Promedio de horas   </b></Typography>
                                                                <Typography variant="body2" >{item.hours}</Typography>
                                                            </Grid>
                                                            <Grid item xs={4}>
                                                                <Typography variant="subtitle1" ><b>¿Trabajo horas extras?</b></Typography>
                                                                <Typography variant="body2" >{item.extra}</Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                            ))}
                                            <Grid item xs={12} className={`${classes.containerWhite} ${classes.colorSecondary}`}>
                                                <Typography variant="h6"><b>Estudios</b></Typography>
                                            </Grid>

                                            <div className={classes.containerWhite}>
                                                <Grid item xs={12}>
                                                    <Grid container spacing={0}>
                                                        <Grid item xs={3}>
                                                            <Typography variant="subtitle1" ><b>Nivel Maximo alcanzado</b></Typography>
                                                            <Typography variant="body2" >Secundaria completa</Typography>
                                                        </Grid>
                                                        <Grid item xs={3}>
                                                            <Typography variant="subtitle1" ><b>Institución educatica</b></Typography>
                                                            <Typography variant="body2" >Gomez Arias Davila</Typography>
                                                        </Grid>
                                                        <Grid item xs={3}>
                                                            <Typography variant="subtitle1" ><b>Año de inicio</b></Typography>
                                                            <Typography variant="body2" >2005</Typography>
                                                        </Grid>
                                                        <Grid item xs={3}>
                                                            <Typography variant="subtitle1" ><b>Año de culminación</b></Typography>
                                                            <Typography variant="body2" >2010</Typography>
                                                        </Grid>
                                                    </Grid>

                                                </Grid>
                                            </div>
                                        </Grid>
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container justify="flex-end" spacing={3}>
                                        <Grid item>
                                            <Button variant="outlined" size="large">Anterior</Button>
                                        </Grid>
                                        <Grid item>
                                            <Button variant="contained" size="large">Siguiente</Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default ApplicantCv;
