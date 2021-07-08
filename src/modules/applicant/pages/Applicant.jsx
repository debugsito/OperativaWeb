import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

//Components
import { CustomCard } from "../../dashboard/components";
import { Container, Grid, Hidden ,makeStyles } from "@material-ui/core";
import { ApplicantDataTable, ApplicantDataTableMobile } from '../components'
import { Breadcrumbs, Button, Modal, TextSkyBlue, Typography } from "../../shared/components";

//imgs
import { filesSVG, phoneSVG, agreementSVG } from "../../shared/images";

//Utils
import { getNameById } from "../../shared/utils";
import { SessionRoutes } from "../../shared/libs/sessionRoutes";
import { getDocumentsType } from "../../../store/actions/utils/utils.action";
import { getProfileOfApplicant } from "../../../store/actions/dashboard/dashboard.middleware";
import { setProfileOfApplicant } from "../../../store/actions/dashboard/dashboard.action";
import '../styles/index.css'

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
    const { auth: {user}, utils:{documentsType} } = useSelector(state => state);
    const { applicantProfile } = useSelector(state => state?.dashboard);
    const initRoute = SessionRoutes().initRoute;
    const routes = [{ name: "Mis postulaciones", to: `${initRoute}` }];
    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        dispatch(getDocumentsType())
        // dispatch(setProfileOfApplicant(null))
        dispatch(getProfileOfApplicant({postulant_id:user.account.id}))
    },[])

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
        </Container>
    )
}

export default Applicant;