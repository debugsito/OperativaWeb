import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

//Components
import { CustomCard } from "../../dashboard/components";
import { Container, Grid, Hidden ,makeStyles } from "@material-ui/core";
import { ApplicantDataTable, ApplicantDataTableMobile } from '../components'
import { Breadcrumbs, Button, Modal, SnackbarsAlert ,TextSkyBlue, Typography } from "../../shared/components";

//imgs
import { filesSVG, phoneSVG, agreementSVG } from "../../shared/images";

//Utils
import { getNameById } from "../../shared/utils";
import { SessionRoutes } from "../../shared/libs/sessionRoutes";
import { getDocumentsType } from "../../../store/actions/utils/utils.action";
import { getProfileOfApplicant } from "../../../store/actions/dashboard/dashboard.middleware";
import { setProfileOfApplicant } from "../../../store/actions/dashboard/dashboard.action";
import '../styles/index.css'

// Task: Notification - Cada cierto tiempo el sistema debe recordarle que actualice su CV:
// Cuantas veces debe mostrarse la alerta al postulante(notificación), es decir:
// 1. El postulante se loguea y le redirige a la vista de [Mis Postulaciones], aqui le muestra la notificación.
// 2. El postulante se va a la página [Mi curriculum] ¿Aqui debe mostrarle la notificación?
// 3. El postulante regresa a la página [Mis postulaciones], ¿Le debe mostrar la notificacion?
// 4. El usuario cierra session y mas tarde vuelve a entrar, ¿Le debe mostrar la notificación?

const useStyles = makeStyles(theme => ({
    body2:{
        color:"var(--principalColor) !important"
    },
    img:{
        height:"120px"
    },
    modal:{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        "& p":{
            textAlign:"center",
            margin: "1rem 1rem",
        }
    }
}))

const Applicant  = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const classes = useStyles()
    const initRoute = SessionRoutes().initRoute;
    const routes = [{ name: "Mis postulaciones", to: `${initRoute}` }];
    const { applicantProfile } = useSelector(state => state?.dashboard);
    const { auth: {user}, utils:{documentsType} } = useSelector(state => state);

    const [openModal, setOpenModal] = useState(false)
    const [notification, setNotification] = useState({
        open:false,
        message:`¡Hola ${user?.account?.user?.first_name}! Te recordamos actualizar tu CV, para que las empresas te contacten rápidamente.`,
        vertical: 'top',
        horizontal: 'right',
        severity:"info"
    })

    const {horizontal, vertical, open, message, severity} = notification;

    useEffect(() => {
        dispatch(getDocumentsType())
        // dispatch(setProfileOfApplicant(null))
        dispatch(getProfileOfApplicant({postulant_id:user.account.id}))
        showNotification()
    },[])

    function showNotification(){
        setNotification({...notification,open:true})
    }

    const handleClose = () => {
        setNotification({...notification,open:false})
    }

    useEffect(() => {
        if(applicantProfile){
            checkingData()
        }
    },[applicantProfile])

    const checkingData = () => {
        const user_temp =  applicantProfile?.user
        let status = false
        if(!user_temp?.first_name || !user_temp?.last_name) status = true
        else if(!user_temp?.department_id || !user_temp?.province_id) status = true
        else if(applicantProfile?.education.length == 0) status = true
        else if(applicantProfile?.job.length == 0 && user_temp?.volunteering === null && user_temp?.volunteering === null && user_temp?.extra_hours) status = true
        else if(!user_temp.interest_rubro_id) status = true

        setOpenModal(status)
    }

    return (
        <Container className="applicant-container">
            <Grid container spacing={0}>
                <Grid item xs={12}>
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
                </Grid>
            </Grid>
            <Modal open={openModal} handleCloseModal={() => setOpenModal(false)}>
                <div className={classes.modal}>
                    <Typography variant="h6">{`${user?.account?.user?.first_name}, completa tu perfil`}</Typography>
                    <Typography variant="body2">Te tomará solo 8 minutos colocar tus <TextSkyBlue>datos actualizados</TextSkyBlue>, para que las empresas contacten contigo.</Typography>
                    <Button variant="contained" size="large" onClick={() => history.push(`${initRoute}/mi-perfil`)}>Empezar</Button>
                </div>
            </Modal>
            <SnackbarsAlert 
                open={open}
                anchorOrigin={{ vertical, horizontal }}
                message={message}
                handleClose={handleClose}
                severity={severity}
            />
        </Container>
    )
}

export default Applicant;