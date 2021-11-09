import React from 'react'
import { DateTime } from "luxon";
import { useSelector } from "react-redux";
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
    const { publicationSelected } = useSelector(state => state?.dashboard)
    const initRoute = SessionRoutes().initRoute;
    const routes = [{ name: "Inicio", to: `${initRoute}` }, { name: "Editar posición", to: `${initRoute}/editar-posicion` }];
    
    const initialValues = {
        id:publicationSelected.id,
        number_registered:publicationSelected.number_registered?? "null",
        gender:publicationSelected.gender,
        edad_min:publicationSelected.edad_min?? null,
        edad_max:publicationSelected.edad_max?? null,
        job_title: publicationSelected.job_title,
        description: JSON.parse(publicationSelected.description),
        requirements: JSON.parse(publicationSelected.requirements),
        benefits: JSON.parse(publicationSelected.benefits),
        job_level_id: publicationSelected.job_level_id,//rubro
        address: publicationSelected.address,
        district_id: publicationSelected.district.id,
        period: publicationSelected.period,
        salary: publicationSelected.salary,
        expiration_date: DateTime.fromISO(publicationSelected?.expiration_date?publicationSelected?.expiration_date: publicationSelected?.from_date).toUTC().toFormat("yyyy-LL-dd"),
        department_id: publicationSelected.district.province.department_id,
        province_id: publicationSelected.district.province_id,
        rubro_id: publicationSelected.job_level_id,
        period_id: publicationSelected.period,
    }

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
                        Editar empleo
                    </TitlePage>
                </Grid>
                <Grid item xs={8}>
                    <Paper className={classes.paper}>
                        <JobForm initialValues={initialValues} initRoute={initRoute} isEditing/>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}
