import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Grid, Hidden ,makeStyles } from "@material-ui/core";

import { Breadcrumbs, Typography } from "../../shared/components";
import { SessionRoutes } from "../../shared/libs/sessionRoutes";
import { CustomCard } from "../../dashboard/components";
import { ApplicantDataTable, ApplicantDataTableMobile } from '../components'
import { filesSVG, phoneSVG, agreementSVG } from "../../shared/images";
import { getDocumentsType } from "../../../store/actions/utils/utils.action";
import { getNameById } from "../../shared/utils";
import '../styles/index.css'

const useStyles = makeStyles(theme => ({
    body2:{
        color:"var(--principalColor) !important"
    },
    img:{
        height:"120px"
    }
}))

const Applicant  = () => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const { auth: {user}, utils:{documentsType} } = useSelector(state => state);
    const initRoute = SessionRoutes().initRoute;
    const routes = [{ name: "Mis postulaciones", to: `${initRoute}` }];

    useEffect(() => {
        dispatch(getDocumentsType())
    },[])

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
        </Container>
    )
}

export default Applicant;