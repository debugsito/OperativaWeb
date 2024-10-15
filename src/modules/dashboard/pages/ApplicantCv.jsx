import React, { useEffect, useContext } from "react";
import { DateTime } from "luxon";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Paper, makeStyles } from "@material-ui/core";

import { Button, Breadcrumbs, Container, Modal, TitlePage, Typography, SnackbarsAlert } from '../../shared/components';
import { SessionRoutes } from '../../shared/libs/sessionRoutes';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
//Utils
import { getGenderById } from "../../shared/utils";
import { messageSuccessful, messageError } from "../utils/notification";
//Actions
import { getProfileOfApplicant } from "../../../store/actions/dashboard/dashboard.middleware";
//Context
import { ContextNotification } from "../context/NotificationAlertContext";
//Service
import { service_Dashboard } from "../../../store/services";

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
    let { postulant_id } = useParams();
    const initRoute = SessionRoutes().initRoute;
    const { notification, setNotification } = useContext(ContextNotification)
    const { applicantProfile, postulantsByPublicationId } = useSelector(state => state.dashboard);
    console.log(applicantProfile)
    const { horizontal, vertical, open, message, severity } = notification;

    const data = postulantsByPublicationId?.rows
    const index = data?.findIndex(item => item.user.account_id == postulant_id)
    const { publication_id } = data[index]
    const publication_account_id = data[index].id;
    const body = [{ publication_account_id }]

    const routes = [
        { name: "Incio", to: `${initRoute}` },
        { name: "Postulantes", to: `${initRoute}/publicacion/${publication_id}/lista-de-postulantes` },
        { name: "CV", to: `${initRoute}/lista-de-postulantes/${postulant_id}/perfil` }
    ];

    useEffect(async () => {
        if (postulant_id) {
            const response = await service_Dashboard.markCvRead(body);
            dispatch(getProfileOfApplicant({ postulant_id }))
        }
    }, [postulant_id])

    const handleClickNext = () => {
        if (index === data.length - 1) return
        const { account_id } = data[index + 1].user;
        history.push(`${initRoute}/lista-de-postulantes/${account_id}/perfil`)
    }

    const handleClickGoToPrevious = () => {
        if (index == 0) return
        const { account_id } = data[index - 1].user;
        history.push(`${initRoute}/lista-de-postulantes/${account_id}/perfil`)
    }


    const handleSelectPostulant = () => {
        service_Dashboard.selectApplicant(body, publication_id)
            .then(() => {
                setNotification({ ...notification, ...messageSuccessful() })
                handleClickNext()
            }).catch((error) => {
                setNotification({ ...notification, ...messageError() })
            })
    }

    const handleDenyPostulant = () => {
        service_Dashboard.denyApplicant(body, publication_id)
            .then(() => {
                setNotification({ ...notification, ...messageSuccessful() })
                handleClickNext()
            }).catch((error) => {
                setNotification({ ...notification, ...messageError() })
            })

    }

    const getCovitTime = (time) => {
        switch (time) {
            case 1: return '2 semanas'
            case 2: return 'Hace un mes'
            case 3: return 'Hace 6 meses'
            case 4: return 'Hace 1 año'
            default: return ''
        }

    }

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
                                        {applicantProfile?.user?.fullname}
                                    </TitlePage>
                                </Grid>
                                <Grid item xs={6}>
                                    <Grid container justify="flex-end" spacing={3}>
                                        <Grid item>
                                            <Button startIcon={<HighlightOffIcon />} size="large" onClick={handleDenyPostulant}>Descartar</Button>
                                        </Grid>
                                        <Grid item>
                                            <Button startIcon={<CheckCircleIcon />} color="secondary" size="large" onClick={handleSelectPostulant}>Seleccionar</Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {/* <Grid item xs={12} className={classes.description}>
                                    <Typography variant="body2">{`Fecha de postulacion 24/08/2021`}</Typography>
                                    <Typography variant="body2">{`Fecha ultima de actualización 30/10/2021`}</Typography>
                                </Grid> */}
                                <Grid item xs={12} >
                                    <div className={classes.containerInfo}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} className={`${classes.containerWhite} ${classes.colorSecondary}`}>
                                                <Typography variant="h6"><b>Datos Personales</b></Typography>
                                            </Grid>
                                            <div className={classes.containerWhite}>
                                                <Grid item xs={12} >
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={6}>
                                                            <Typography variant="body1"><b>DNI:</b> {applicantProfile?.user?.document_number}</Typography>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <Typography variant="body1"><b>Fecha de nacimiento:</b> {DateTime.fromISO(applicantProfile?.user?.birth_date).toFormat("yyyy-LL-dd")}</Typography>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <Typography variant="body1"><b>Género:</b> {getGenderById(applicantProfile?.user?.gender)}</Typography>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <Typography variant="body1"><b>Ciudad:</b> {`${applicantProfile?.user?.department?.name}/${applicantProfile?.user?.province?.name}/${applicantProfile?.user?.district?.name}`}</Typography>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <Typography variant="body1"><b>Direccion:</b> {applicantProfile?.user?.address}</Typography>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <Typography variant="body1"><b>Referencia:</b> --</Typography>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <Typography variant="body1"><b>Teléfono:</b> {applicantProfile?.user?.phone}</Typography>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <Typography variant="body1"><b>Email:</b> {applicantProfile?.email}</Typography>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <Typography variant="body1"><b>Estado Civil:</b> {applicantProfile?.user?.civil?.name}</Typography>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <Typography variant="body1"><b>Edad:</b> {applicantProfile?.user?.age}</Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                            <Grid item xs={12} className={`${classes.containerWhite} ${classes.colorSecondary}`}>
                                                <Typography variant="h6"><b>Experiencia laboral</b></Typography>
                                            </Grid>
                                            {applicantProfile?.job.map((item, index) => (
                                                <div className={classes.containerWhite}>
                                                    <Grid item xs={12} key={index}>
                                                        <Grid container spacing={3}>
                                                            <Grid item xs={4}>
                                                                <Typography variant="subtitle1" ><b>Empresa</b></Typography>
                                                                <Typography variant="body2" >{item.name_inst}</Typography>
                                                            </Grid>
                                                            <Grid item xs={4}>
                                                                <Typography variant="subtitle1" ><b>Dirección</b></Typography>
                                                                <Typography variant="body2" >{item.address}</Typography>
                                                            </Grid>
                                                            <Grid item xs={4}>
                                                                <Typography variant="subtitle1" ><b>Cargo</b></Typography>
                                                                <Typography variant="body2" >{item.job_level?.name}</Typography>
                                                            </Grid>
                                                            <Grid item xs={4}>
                                                                <Typography variant="subtitle1" ><b>Rubro</b></Typography>
                                                                <Typography variant="body2" >{item.rubro.name}</Typography>
                                                            </Grid>
                                                            <Grid item xs={4}>
                                                                <Typography variant="subtitle1" ><b>Fecha de inicio</b></Typography>
                                                                <Typography variant="body2" >{item.from_year}</Typography>
                                                            </Grid>
                                                            <Grid item xs={4}>
                                                                <Typography variant="subtitle1" ><b>Fecha de fin</b></Typography>
                                                                <Typography variant="body2" >{item.to_year}</Typography>
                                                            </Grid>
                                                            <Grid item xs={4}>
                                                                <Typography variant="subtitle1" ><b>Ingreso Mensual</b></Typography>
                                                                <Typography variant="body2" >{item.monthly_income}</Typography>
                                                            </Grid>
                                                            <Grid item xs={4}>
                                                                <Typography variant="subtitle1" ><b>Promedio de horas   </b></Typography>
                                                                <Typography variant="body2" >{item.hour_rate}</Typography>
                                                            </Grid>
                                                            <Grid item xs={4}>
                                                                <Typography variant="subtitle1" ><b>¿Trabajo horas extras?</b></Typography>
                                                                <Typography variant="body2" >{item.over_time ? "Si" : "No"}</Typography>
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
                                                            <Typography variant="body2" >{applicantProfile?.education[0]?.level?.name}</Typography>
                                                        </Grid>
                                                        <Grid item xs={3}>
                                                            <Typography variant="subtitle1" ><b>Institución educatica</b></Typography>
                                                            <Typography variant="body2" >{applicantProfile?.education[0]?.name_inst}</Typography>
                                                        </Grid>
                                                        <Grid item xs={3}>
                                                            <Typography variant="subtitle1" ><b>Año de inicio</b></Typography>
                                                            <Typography variant="body2" >{applicantProfile?.education[0]?.from_year}</Typography>
                                                        </Grid>
                                                        <Grid item xs={3}>
                                                            <Typography variant="subtitle1" ><b>Año de culminación</b></Typography>
                                                            <Typography variant="body2" >{applicantProfile?.education[0]?.endYear}</Typography>
                                                        </Grid>
                                                    </Grid>

                                                </Grid>
                                            </div>

                                            <Grid item xs={12} className={`${classes.containerWhite} ${classes.colorSecondary}`}>
                                                <Typography variant="h6"><b>Cuestionario</b></Typography>
                                            </Grid>

                                            <div className={classes.containerWhite}>
                                                <Grid item xs={12}>
                                                    <div className="title-form">
                                                        <h3>Familia</h3>
                                                    </div>
                                                    <Grid container spacing={3} style={{ padding: 15 }}>
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12}>
                                                                <Typography variant="subtitle1" ><b>Tiene hijos</b></Typography>
                                                                <Typography variant="body2" >{applicantProfile?.user?.have_children ? "Si" : "No"}</Typography>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Typography variant="subtitle1" ><b>  Cuando usted trabaja ¿Quién le apoya con el cuidado de sus hijos? </b></Typography>
                                                                <Typography variant="body2" >{applicantProfile?.user?.support_child_care}</Typography>
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <Typography variant="subtitle1" ><b>¿Tiene alguna persona bajo su responsabilidad?</b></Typography>
                                                                <Typography variant="body2" >{applicantProfile?.user?.person_under_care ? "Si" : "No"}</Typography>
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <Typography variant="subtitle1" ><b>Especifique su respuesta</b></Typography>
                                                                <Typography variant="body2" >{applicantProfile?.user?.person_under_care_text}</Typography>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Typography variant="subtitle1" ><b> ¿Vive solo/a?</b></Typography>
                                                                <Typography variant="body2" >{applicantProfile?.user?.live_alone ? "Si" : "No"}</Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                    <div className="title-form">
                                                        <h3>Economía</h3>
                                                    </div>
                                                    <Grid container spacing={3} style={{ padding: 15 }}>

                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12}>
                                                                <Typography variant="subtitle1" ><b>  Su vivienda es:</b></Typography>
                                                                <Typography variant="body2" >{applicantProfile?.user?.rented_or_own_house ? "Alquilada" : "Propia"}</Typography>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Typography variant="subtitle1" ><b> ¿Percibiste bonificaciones extras? </b></Typography>
                                                                <Typography variant="body2" >{applicantProfile?.user?.received_extra_bonus ? "Si" : "No"}</Typography>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Typography variant="subtitle1" ><b>    ¿Ayuda economicamente en su hogar?</b></Typography>
                                                                <Typography variant="body2" >{applicantProfile?.user?.financial_help_at_home ? "Si" : "No"}</Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                    <div className="title-form">
                                                        <h3>Ubicación</h3>
                                                    </div>

                                                    <Grid container spacing={3} style={{ padding: 15 }}>

                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12}>
                                                                <Typography variant="subtitle1" ><b>  ¿Le es fácil tomar un vehículo para dirigirse a su centro de labores u otros lugares?</b></Typography>
                                                                <Typography variant="body2" >{applicantProfile?.user?.easy_to_take_transport ? "Si" : "No"}</Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                    <div className="title-form">
                                                        <h3>Laboral</h3>
                                                    </div>

                                                    <Grid container spacing={3} style={{ padding: 15 }}>

                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12}>
                                                                <Typography variant="subtitle1" ><b>   ¿Anteriormente, ha trabajado como operario?</b></Typography>
                                                                <Typography variant="body2" >{applicantProfile?.user?.worked_as_an_operator ? "Si" : "No"}</Typography>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Typography variant="subtitle1" ><b>    ¿Alguna vez abandonó un trabajo porque no le gustaba?</b></Typography>
                                                                <Typography variant="body2" >{applicantProfile?.user?.quit_because_dont_like ? "Si" : "No"}</Typography>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Typography variant="subtitle1" ><b> ¿Pertenecia a algún sindicato?</b></Typography>
                                                                <Typography variant="body2" >{applicantProfile?.user?.was_part_of_a_union ? "Si" : "No"}</Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                    <div className="title-form">
                                                        <h3>Salud</h3>
                                                    </div>

                                                    <Grid container spacing={3} style={{ padding: 15 }}>

                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12}>
                                                                <Typography variant="subtitle1" ><b>¿Sufre de alguna alergía?</b></Typography>
                                                                <Typography variant="body2" >{applicantProfile?.user?.have_allergy ? "Si" : "No"}</Typography>
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <Typography variant="subtitle1" ><b>¿Tiene alguna operación?</b></Typography>
                                                                <Typography variant="body2" >{applicantProfile?.user?.have_any_operation ? "Si" : "No"}</Typography>
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <Typography variant="subtitle1" ><b> Especifique su respuesta</b></Typography>
                                                                <Typography variant="body2" >{applicantProfile?.user?.have_any_operation_text}</Typography>
                                                            </Grid>

                                                            <Grid item xs={12}>
                                                                <Typography variant="subtitle1" ><b>¿Has presentado problemas en la columna?</b></Typography>
                                                                <Typography variant="body2" >{applicantProfile?.user?.spinal_problems ? "Si" : "No"}</Typography>
                                                            </Grid>

                                                            <Grid item xs={12}>
                                                                <Typography variant="subtitle1" ><b> ¿Sufre de diabetes?</b></Typography>
                                                                <Typography variant="body2" >{applicantProfile?.user?.diabetes ? "Si" : "No"}</Typography>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Typography variant="subtitle1" ><b> ¿Usa lentes?</b></Typography>
                                                                <Typography variant="body2" >{applicantProfile?.user?.wear_glasses ? "Si" : "No"}</Typography>
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <Typography variant="subtitle1" ><b> ¿Has tenido Covid-19?</b></Typography>
                                                                <Typography variant="body2" >{applicantProfile?.user?.had_covid ? "Si" : "No"}</Typography>
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <Typography variant="subtitle1" ><b> ¿Hace cuanto tiempo?</b></Typography>
                                                                <Typography variant="body2" >{getCovitTime(applicantProfile?.user?.covid_time)}</Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>


                                                    <div className="title-form">
                                                        <h3>Tallas</h3>
                                                    </div>

                                                    <Grid container spacing={3} style={{ padding: 15 }}>

                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12}>
                                                                <Typography variant="subtitle1" ><b> ¿Cual es su talla de camisa?</b></Typography>
                                                                <Typography variant="body2" >{applicantProfile?.user?.shirt_size}</Typography>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Typography variant="subtitle1" ><b>¿Cual es su talla de pantalón?</b></Typography>
                                                                <Typography variant="body2" >{applicantProfile?.user?.pants_size}</Typography>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Typography variant="subtitle1" ><b>   ¿Cual es su talla de zapato?</b></Typography>
                                                                <Typography variant="body2" >{applicantProfile?.user?.shoe_size}</Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                    <div className="title-form">
                                                        <h3>Área personal</h3>
                                                    </div>

                                                    <Grid container spacing={3} style={{ padding: 15 }}>

                                                        <Grid container spacing={2}>
                                                            <Grid item xs={12}>
                                                                <Typography variant="subtitle1" ><b>   ¿Si uted no está contento con alguna situación suele decirlo?</b></Typography>
                                                                <Typography variant="body2" >{applicantProfile?.user?.says_your_opinion ? 'Si' : 'No'}</Typography>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Typography variant="subtitle1" ><b>  ¿Se considera una persona responsable?</b></Typography>
                                                                <Typography variant="body2" >{applicantProfile?.user?.person_in_charge ? 'Si' : 'No'}</Typography>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Typography variant="subtitle1" ><b>     ¿Le motivia trabajar como operario?</b></Typography>
                                                                <Typography variant="body2" >{applicantProfile?.user?.motivates_working_as_operator ? 'Si' : 'No'}</Typography>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Typography variant="subtitle1" ><b>     ¿Cúando toma desiciones suele cambiar de parecer a cada momento?</b></Typography>
                                                                <Typography variant="body2" >{applicantProfile?.user?.change_your_mind ? 'Si' : 'No'}</Typography>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Typography variant="subtitle1" ><b>       ¿Tuviste problemas alguna vez con compañeros o jefes?</b></Typography>
                                                                <Typography variant="body2" >{applicantProfile?.user?.problems_with_your_bosses ? 'Si' : 'No'}</Typography>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Typography variant="subtitle1" ><b>  ¿Prefieres trabajar solo o en grupo?</b></Typography>
                                                                <Typography variant="body2" >{applicantProfile?.user?.teamwork ? 'Solo' : 'Grupo'}</Typography>
                                                            </Grid>
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
                                            <Button variant="outlined" size="large" onClick={handleClickGoToPrevious}>Anterior</Button>
                                        </Grid>
                                        <Grid item>
                                            <Button variant="contained" size="large" onClick={handleClickNext}>Siguiente</Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
                <SnackbarsAlert
                    open={open}
                    anchorOrigin={{ vertical, horizontal }}
                    message={message}
                    handleClose={() => setNotification({ ...notification, open: false })}
                    severity={severity}
                    autoHideDuration={5000}
                />
            </Container>
        </div>
    );
};

export default ApplicantCv;
