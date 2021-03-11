import React, { useEffect, useState } from "react";
import '../styles/index.css'
import { useDispatch, useSelector } from "react-redux";
import { Container, Grid } from "@material-ui/core";
import { Breadcrumbs, Button, Typography } from "../../shared/components";
import { SessionRoutes } from "../../shared/libs/sessionRoutes";
import { CustomCard } from "../../dashboard/components";
import {ApplicantDataTable} from '../components'

const Applicant  = ({ history }) => {
    const { user } = useSelector(state => state?.auth);
    const dispatch = useDispatch();
    const initRoute = SessionRoutes().initRoute;
    const routes = [{ name: "Mis postulaciones", to: `${initRoute}` }];

    useEffect(() => {
        
      }, [])

    const goToPublishApplicant = () => history.push(`${initRoute}/ver-publicacion`);

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
                                {/* cambiar ruc a dinamico */}
                                DNI: {user?.account?.user?.document_number}
                                </Typography>
                            </CustomCard>
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Typography variant="h6" component="h6" className="title-color">
                                        Te encuentras en proceso de selección con  las siguientes empresas
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                   <ApplicantDataTable />
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