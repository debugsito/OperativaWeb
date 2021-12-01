import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Paper, makeStyles } from "@material-ui/core";

import { Button, Breadcrumbs, Container, Modal, TitlePage, Typography } from '../../shared/components';
import { checkCircleIcon, closeIcon, registeredIcon } from "../images";
import { getProfileOfApplicant } from "../../../store/actions/dashboard/dashboard.middleware";
import { SessionRoutes } from '../../shared/libs/sessionRoutes';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: "2rem",
        boxShadow: "0px 4px 14px -5px #D0D4DF",
    },
    description:{
        marginLeft: "2.5rem"
    }
    
}))


const ApplicantCv = () => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    let { postulant_id } = useParams()
    const initRoute = SessionRoutes().initRoute;
    const { applicantProfile, publicationSelected, postulantsByPublicationId } = useSelector(state => state.dashboard)
    const { districts } = useSelector(state => state.utils)

    // const { id: publication_id } = publicationSelected.data; 
    const routes = [
        { name: "Incio", to: `${initRoute}` },
        { name: "Postulantes", to: `${initRoute}/lista-de-postulantes` },
        { name: "CV", to: `${initRoute}/lista-de-postulantes/perfil` }
    ];

    // useEffect(() => {
    //     if(postulant_id) {
    //         dispatch(getProfileOfApplicant({ postulant_id }))
    //     }
    // }, [postulant_id])


    const handleClickNext = () => {
        const index = postulantsByPublicationId?.data?.findIndex(item => item.user.account_id == postulant_id)
        if (index === postulantsByPublicationId.data.length - 1) return
        const { account_id } = postulantsByPublicationId?.data[index + 1].user
        postulant_id = account_id
        history.push(`${initRoute}/postulante/perfil/${postulant_id}`)
    }

    const handleClickGoToPrevious = () => {
        history.goBack()
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
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TitlePage handleClick={() => history.goBack()}>
                                        Jose Ricardo Merino Salazar
                                    </TitlePage>
                                </Grid>
                                <Grid item xs={12} className={classes.description}>
                                    <Typography variant="body2">{`Fecha de postulacion 24/08/2021`}</Typography>
                                    <Typography variant="body2">{`Fecha ultima de actualización 30/10/2021`}</Typography>
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
