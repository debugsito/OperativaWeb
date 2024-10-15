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
        type_contract:publicationSelected.type_contract,
        type_pay:publicationSelected.type_pay,
        vacantes:publicationSelected.vacantes,
        postulants:publicationSelected.postulants,
        job_title: publicationSelected.job_title,
        description: JSON.parse(publicationSelected.description),
        requirements: JSON.parse(publicationSelected.requirements),
        benefits: JSON.parse(publicationSelected.benefits),
        rubro_id: publicationSelected.rubro_id,
        salary: publicationSelected.salary,
        expiration_date: DateTime.fromISO(publicationSelected.expiration_date? publicationSelected.expiration_date: publicationSelected.from_date).toUTC().toFormat("yyyy-LL-dd"),
        district_id: publicationSelected.district.id,
        department_id: publicationSelected.district.province.department_id,
        province_id: publicationSelected.district.province_id,
        period_id:publicationSelected.period_id,
        
        otherRequiriments:publicationSelected.gender? "si":"no",
        gender:publicationSelected.gender?? null,
        edad_min:publicationSelected.edad_min?? null,
        edad_max:publicationSelected.edad_max?? null,
        type_time:publicationSelected.type_time?? null,
        quantity:publicationSelected.quantity?? null,
        level_education:publicationSelected.level_education?? null,
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
