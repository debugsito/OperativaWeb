import React from 'react'
import { useHistory } from "react-router-dom";
import { Grid, Paper } from "@material-ui/core";

import { JobForm } from "../components";
import { Breadcrumbs, Container, TitlePage } from "../../shared/components";
import { SessionRoutes } from '../../shared/libs/sessionRoutes';
import { makeStyles } from '@material-ui/styles';

const defaultValues = {
    number_registered:"",
    gender:"",
    edad_min:null,
    edad_max:null,

    job_title: "",
    description: "",
    requirements: "",
    benefits:"",
    job_level_id: "",
    address: "",
    district_id: "",
    period: "",
    salary: "",
    expiration_date: "",
    department_id: "",
    province_id: "",
};

const useStyles = makeStyles(theme => ({
    paper: {
        padding: "3rem"
    }
}))

export default function Position() {
    const classes = useStyles()
    const history = useHistory()
    const initRoute = SessionRoutes().initRoute;
    const routes = [{ name: "Inicio", to: `${initRoute}` }, { name: "Publicar empleo", to: `${initRoute}/editar-posicion` }];

    return (
        <Container>
            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12}>
                    <Breadcrumbs routes={routes} />
                </Grid>
                <Grid item xs={12}>
                    <TitlePage 
                        description="A continuación, ingresa los datos solicitados para buscar los candidatos ideales en operativa."
                        handleClick={() => history.goBack()}
                    >
                        Publicar empleo
                    </TitlePage>
                </Grid>
                <Grid item xs={8}>
                    <Paper className={classes.paper}>
                        <JobForm initialValues={defaultValues} initRoute={initRoute}/>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}
