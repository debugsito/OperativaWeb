import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
//Components
import { Container, Grid, makeStyles } from "@material-ui/core";
import { Button, Modal, SnackbarsAlert, TextCustom, Typography } from "../../shared/components";

//imgs
import { closeIcon, ImagePostular, ImageCandidato } from "../../shared/images";
import { caza2 } from '../../shared/images/postulant'

//Utils
import { getNameById } from "../../shared/utils";
import { SessionRoutes } from "../../shared/libs/sessionRoutes";
import { getDocumentsType } from "../../../store/actions/utils/utils.action";
import { getProfileOfApplicant } from "../../../store/actions/dashboard/dashboard.middleware";
import { setDisableNotificationOfApplicant } from "../../../store/actions/applicant/applicant.midleware";
import '../styles/index.css'
import { setUser, signOut } from "../../../store/actions/auth/auth.action";
import { updateSearchWork } from "../../../store/services/auth/user.service";
import { Chart, ArcElement } from 'chart.js'
import { Doughnut } from 'react-chartjs-2';
import ApplicantLevelComponent from "../components/ApplicantLevelComponent/index"
import { arrowWhite, deseoPostular,soyCandidato } from "../../shared/images/postulant/index"

Chart.register(ArcElement);
// var originalDoughnutDraw = Chart.controllers.doughnut.prototype.draw;

// console.log(AccessAlarm);
// Task: Notification - Cada cierto tiempo el sistema debe recordarle que actualice su CV:
// Cuantas veces debe mostrarse la alerta al postulante(notificación), es decir:
// 1. El postulante se loguea y le redirige a la vista de [Mis Postulaciones], aqui le muestra la notificación.
// 2. El postulante se va a la página [Mi curriculum] ¿Aqui debe mostrarle la notificación?
// 3. El postulante regresa a la página [Mis postulaciones], ¿Le debe mostrar la notificacion?
// 4. El usuario cierra session y mas tarde vuelve a entrar, ¿Le debe mostrar la notificación?

const useStyles = makeStyles(theme => ({
    body2: {
        color: "var(--principalColor) !important"
    },
    img: {
        height: "120px"
    },
    modal: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        "& p": {
            textAlign: "center",
            margin: "1rem 1rem",
        }
    },
    vCenterCard: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerCardText: {
        height: '11rem'
    },
    applicantContainer: {
        background: '#f7f7f7',
        padding: '1rem',
        paddingBottom: '5rem'
    }
}))

const Applicant = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const classes = useStyles()
    const initRoute = SessionRoutes().initRoute;
    // const routes = [{name: "Mis postulaciones", to: `${initRoute}`}];
    const { applicantProfile } = useSelector(state => state?.dashboard);
    const { auth: { user }, utils: { documentsType } } = useSelector(state => state);
    const [searchWork, setsearchWork] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [notification, setNotification] = useState({
        open: false,
        message: `¡Hola ${user?.account?.user?.first_name}! Te recordamos actualizar tu CV, para que las empresas te contacten rápidamente.`,
        vertical: 'top',
        horizontal: 'right',
        severity: "info"
    })

    const { horizontal, vertical, open, message, severity } = notification;

    const dataCv = {
        labels: ["Completado", "No Completado"],
        datasets: [
            {
                label: '# of Votes',
                data: [user.account.cv_percent, 100 - user.account.cv_percent],
                backgroundColor: [
                    '#4E51FE',
                    '#EAEAEA',
                ],
                borderColor: [
                    '#4E51FE',
                    '#EAEAEA',
                ],
                borderWidth: 1,
            },
        ],
        text: user.account.cv_percent + "%"
    };

    const dataCuestionario = {
        labels: ["Completado", "No Completado"],
        datasets: [
            {
                label: '# of Votes',
                data: [user.account.questionnaire_percent, 100 - user.account.questionnaire_percent],
                backgroundColor: [
                    '#4E51FE',
                    '#EAEAEA',
                ],
                borderColor: [
                    '#4E51FE',
                    '#EAEAEA',
                ],
                borderWidth: 1,
            },
        ],
        ext: user.account.questionnaire_percent + "%"
    };


    useEffect(() => {
        dispatch(getDocumentsType());
        dispatch(getProfileOfApplicant({ postulant_id: user.account.id }));
        showNotification();
        loadSearchWork();
    }, [])

    function showNotification() {
        if (user.account.cv_update) {
            setNotification({ ...notification, open: true })
        }
    }

    function loadSearchWork() {
        setsearchWork(!!user.account.search_work)
    }

    const handleClose = () => {
        setNotification({ ...notification, open: false })
        dispatch(setDisableNotificationOfApplicant())
    }

    useEffect(() => {
        if (applicantProfile) {
            checkingData()
        }
    }, [applicantProfile])

    const checkingData = () => {
        const user_temp = applicantProfile?.user
        let status = false
        if (!user_temp?.first_name || !user_temp?.last_name) status = true
        else if (!user_temp?.department_id || !user_temp?.province_id) status = true
        else if (applicantProfile?.education.length == 0) status = true
        else if (applicantProfile?.job.length == 0 && user_temp?.volunteering === null && user_temp?.volunteering === null && user_temp?.extra_hours) status = true
        else if (!user_temp.interest_rubro_id) status = true

        setOpenModal(status)
    }

    const logout = (event) => {
        event.preventDefault();
        dispatch(signOut());
        return <Redirect to="/" />
    };

    const goToPostulateForm = (event) => {
        history.push(`${initRoute}/formulario-postular`);
    };

    const gotoCazatrabajo = (event) => {
        if (user?.account?.job_hunting_account) history.push(`${initRoute}/cazatrabajo/detalle`);
        else history.push(`${initRoute}/cazatrabajo`);
    }

    const goToCandidate = (event) => {
        history.push(`${initRoute}/postulaciones`);
    };

    const handleSearchWorkChange = async (event) => {
        const response = await updateSearchWork({ search_work: !searchWork });
        const newObj = JSON.parse(JSON.stringify(user));
        newObj.account.search_work = !searchWork;
        dispatch(setUser(newObj));
        setsearchWork(!searchWork);
    };

    return (
        <Container className={classes.applicantContainer}>
            <Grid container spacing={0}>
                <Grid item xs={12} className="mb-2">
                    <div className="text-right">
                        <a className="btn-logout" onClick={logout}>
                            Cerrar Sesión
                            <img src={closeIcon} alt="Cierra Sesión" />
                        </a>
                    </div>
                </Grid>
                <Grid item xs={6} className="pr-2">
                    <div className="container-user-information" style={{ position: 'relative' }}>

                        <div style={user?.account?.job_hunting_account ? { width: '50%' } : {}}>
                            <h4 className="home-title">{user?.account?.user?.fullname}</h4>
                            <p>{`${getNameById(documentsType.documents, user.account.user.document_id)} ${user?.account?.user?.document_number}`}</p>
                        </div>
                        <ApplicantLevelComponent
                            style={{ position: 'absolute' }}
                            job_hunting_account={user?.account?.job_hunting_account} />
                    </div>
                </Grid>
                <Grid container xs={6} className="pl-2">

                    <div className="container-card">
                        <div className="row-card" onClick={gotoCazatrabajo}
                            style={{
                                backgroundImage: `url(${caza2})`,
                                backgroundSize: 'cover',                     /* <------ */
                                backgroundRepeat: 'no-repeat',
                                backgroundposition: 'center center'
                            }
                            }

                        >
                            <div className="shadowLayer">
                                <h3  class="titleLayer" style={{ color: ' white', fontWeigth: 'bold', fontSize: '18px', zIndex:'2' }}> El juego del <br />cazatrabajo</h3>
                            </div>
                        </div>
                        <div className="row-card search-work">
                            <h6 style={{ fontSize: '12.5px' }} className="home-title">Búsqueda de trabajo</h6>
                            <div className="container-switch">
                                <b><span>Inactivo</span></b>
                                <label className="switch">
                                    <input type="checkbox"
                                        checked={searchWork}
                                        onChange={handleSearchWorkChange} />
                                    <span className="slider round" />
                                </label>
                                <b><span>Activo</span></b>
                            </div>
                            <span className="small-text-config">
                                Informa a los reclutadores si estás buscando trabajo.
                            </span>

                        </div>
                    </div>

                </Grid>
                <Grid item xs={12} onClick={goToPostulateForm}>
                    <div className="card-home mt-4">
                        <Grid item xs={4} className="fl">
                            <img class="imageApplicant" src={deseoPostular} className="" alt="" />
                        </Grid>
                        <Grid item xs={5} className="fl pl-1">
                            <div>
                                <h4 className="home-title">Deseo postular</h4>
                                <p>
                                    Aquí podrás encontrar el trabajo que se adapte a tu perfil.
                                </p>
                            </div>
                        </Grid>
                        <Grid item xs={3} className="fl pl-1">
                            <img src={arrowWhite} alt="" width="50" height="50" />
                        </Grid>
                    </div>
                </Grid>
                <Grid item xs={12} onClick={goToCandidate}>
                    <div className="card-home mt-4">
                        <Grid item xs={4} className="fl">
                            <img class="imageApplicant" src={soyCandidato} className="" alt="" />
                        </Grid>
                        <Grid item xs={5} className="fl pl-1">
                            <div>
                                <h4 className="home-title">Soy candidato</h4>
                                <p>
                                    Revisa los procesos en los cuales has sido seleccionado.
                                </p>
                            </div>
                        </Grid>
                        <Grid item xs={3} className="fl pl-1">
                            <img src={arrowWhite} alt="" width="50" height="50" />
                        </Grid>
                    </div>
                </Grid>
                <Grid item xs={4} className="mt-4 pr-2">
                    <div>
                        <h4 className="home-title">Este es tu avance</h4>
                        <p>
                            Actualiza tu <b>CV digital</b> y completa el <b>cuestionario</b> mejorar tus oportunidades
                            de trabajo.
                        </p>
                    </div>
                </Grid>
                <Grid item xs={4} className="pr-2 mt-4 cv-grid-end">
                    <div className="card-cv" style={{ position: 'relative',textAlign: 'center' }}>
                        <span className="span-flex"><b>Tu CV</b></span>
                        <Doughnut className="donut" data={dataCv} />
                        <div style={{ position: 'absolute', width: '100%', top: '50%', left: 0, textAlign: 'center' }}>
                            <span><b>{user.account.cv_percent} %</b></span>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={4} className="pr-2 mt-4 cv-grid-start">
                    <div className="card-cv" style={{ position: 'relative', textAlign: 'center' }}>
                        <span className="span-flex"><b>Cuestionario</b></span>
                        <Doughnut  className="donut" data={dataCuestionario} />
                        <div style={{ position: 'absolute', width: '100%', top: '50%', left: 0, textAlign: 'center' }}>
                            <span><b>{user.account.questionnaire_percent} %</b></span>
                        </div>
                    </div>
                </Grid>

                {/*<Grid item xs={12}>
                    <Breadcrumbs routes={routes} />
                </Grid>
                <Grid item xs={12} style={{ margin: "1rem" }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <CustomCard className="dashboard-municipality-card" borderRadius="10px">
                                <Typography variant="h5" component="h5" className="title-color">
                                {user?.account?.user?.fullname}
                                </Typography>
                                <Typography variant="body1" className="title-color">
                                {`${getNameById(documentsType.documents,user.account.user.document_id)}: ${user?.account?.user?.document_number}`}
                                </Typography>
                            </CustomCard>
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Typography variant="h6" component="h6" className="text-center">
                                        Debes tener en cuenta lo siguiente:
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Grid container direction="column" justify="center" alignItems="center">
                                        <Grid item xs={12}>
                                            <img src={filesSVG} className={classes.img}/>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="body2" classes={{body2:classes.body2}}>Actualiza tu CV</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="body2">las veces que sea necesario.</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Grid container direction="column" justify="center" alignItems="center">
                                        <Grid item xs={12}>
                                            <img src={phoneSVG} className={classes.img}/>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="body2" classes={{body2:classes.body2}}>Revisa tu plataforma</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="body2">de postulantes frecuentemente.</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Grid container direction="column" justify="center" alignItems="center">
                                        <Grid item xs={12}>
                                            <img src={agreementSVG} className={classes.img}/>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="body2" classes={{body2:classes.body2}}>Las empresas te contactarán</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="body2">para invitarte al proceso de selección.</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Hidden smDown>
                                        <ApplicantDataTable />
                                    </Hidden>
                                    <Hidden mdUp>
                                        <ApplicantDataTableMobile />
                                    </Hidden>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>*/}
            </Grid>
            <Modal open={openModal} handleCloseModal={() => setOpenModal(false)}>
                <div className={classes.modal}>
                    <Typography variant="h6">{`${user?.account?.user?.first_name}, completa tu perfil`}</Typography>
                    <Typography variant="body2">Te tomará solo 8 minutos colocar tus <TextCustom color="secondary">datos
                        actualizados</TextCustom>, para que las empresas contacten contigo.</Typography>
                    <Button variant="contained" size="large"
                        onClick={() => history.push(`${initRoute}/mi-perfil`)}>Empezar</Button>
                </div>
            </Modal>
            <SnackbarsAlert
                open={open}
                anchorOrigin={{ vertical, horizontal }}
                message={message}
                handleClose={handleClose}
                severity={severity}
            />
        </Container >
    )
}

export default Applicant;
