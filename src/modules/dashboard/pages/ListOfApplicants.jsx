import React from 'react'
import { Grid, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import { ApplicantsTabs } from "../components";
import { Button, Breadcrumbs, Container, Paper, TitlePage, Typography } from "../../shared/components";
import { SessionRoutes } from '../../shared/libs/sessionRoutes';

//Images, icons
import ShareIcon from '@material-ui/icons/Share';
import TuneIcon from '@material-ui/icons/Tune';

const useStyles = makeStyles(theme => ({

}))

export default function JobPositionCreatedPage() {
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
                        description={<><b>Creado por: </b> Marco Antonio Pérez Diaz</>}
                        handleClick={() => history.push(initRoute)}
                    >
                        Motorizados
                    </TitlePage>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2"><b>Filtrar los postulantes que hagan match con tu requerimiento.</b></Typography>
                    <ul>
                        <li>
                            <Typography variant="body2">Filtrar los postulantes que hagan match con tu requerimiento.</Typography>
                        </li>
                        <li>
                            <Typography variant="body2">Puedes contactar a tu postulantes o postulantes</Typography>
                        </li>
                        <li>
                            <Typography variant="body2">Asigna las evaluaciones a los postulantes que cumplan con tu requerimiento</Typography>
                        </li>
                    </ul>
                </Grid>
                <Grid item xs={7}>
                </Grid>
                <Grid item xs={2}>
                    <Button startIcon={<ShareIcon />} size="large" variant="outlined">Multiposting</Button>
                </Grid>
                <Grid item xs={3}>
                    <Button startIcon={<TuneIcon />} size="large" variant="contained" color="secondary">Filtro avanzado</Button>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <ApplicantsTabs />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}
