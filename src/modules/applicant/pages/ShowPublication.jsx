import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, Paper } from "@material-ui/core";

import { Breadcrumbs} from "../../shared/components";
import { ShowPosition } from "../components";
import { SessionRoutes } from "../../shared/libs/sessionRoutes";

const useStyles = makeStyles( theme => ({
    paper:{
        padding: "3rem"
    }
}))


const ShowPublication  = () => {
    const classes = useStyles()
    const initRoute = SessionRoutes().initRoute;
    const routes = [{ name: "MIS POSTULACIONES", to: `${initRoute}/postulante/postulaciones` }, { name: "PRE SELECCIÓN", to: `${initRoute}/postulante/postulaciones/ver-publicacion` }];


    return( <Container className="dashboard-container">
               <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Breadcrumbs routes={routes} />
                    </Grid>
                    <Grid item xs={12}>
                    <Grid container justify="center">
                        <Grid item xs={11} sm={10}>
                            <Paper className={classes.paper}>
                                <ShowPosition />
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
                </Grid>
            </Container>
    )
}

export default ShowPublication;