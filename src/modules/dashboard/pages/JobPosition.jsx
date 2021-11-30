import React from 'react'
import { useHistory } from "react-router-dom";
import { Grid } from "@material-ui/core";

import { JobForm } from "../components";
import { Breadcrumbs, Container, TitlePage } from "../../shared/components";
import { SessionRoutes } from '../../shared/libs/sessionRoutes';

const defaultValues = {
    // isNameHidden:false,
    type_contract:"",
    type_pay:"",
    vacantes:"",
    postulants:"",

    otherRequiriments:"no",
    gender:null,
    edad_min:null,
    edad_max:null,
    type_time:null,
    quantity:null,
    level_education:null,

    job_title: "",
    description: "",
    requirements: "",
    benefits:"",
    job_level_id: "",
    salary: "",
    expiration_date: "",
    department_id: "",
    province_id: "",
    district_id: "",
};

export default function Position() {
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
                        <JobForm initialValues={defaultValues} initRoute={initRoute}/>
                    
                </Grid>
            </Grid>
        </Container>
    )
}
