import React from 'react'
import { Grid, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import { TabsAssignEvaluations } from "../components";
import { Breadcrumbs, Container, TitlePage} from "../../shared/components";
import { SessionRoutes } from '../../shared/libs/sessionRoutes';

//Images, icons


const useStyles = makeStyles(theme => ({
    paper: {
        padding: 0,
    }
}))

export default function AssignEvaluations() {

    const classes = useStyles();
    const history = useHistory()
    const initRoute = SessionRoutes().initRoute;
    const routes = [{ name: "Inicio", to: `${initRoute}` }, { name: "Postulantes", to: `${initRoute}/lista-de-postulantes` }];


    return (
        <Container>
            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12}>
                    <Breadcrumbs routes={routes} />
                </Grid>
                <Grid item xs={12}>
                    <TitlePage
                        description="A continuacion, asignasr las evaluaciones a tus postulantes"
                        handleClick={() => history.push(initRoute)}
                    >
                        Motorizados
                    </TitlePage>
                </Grid>
                <Grid item xs={12}>
                    <TabsAssignEvaluations />
                </Grid>
            </Grid>
        </Container>
    )
}
