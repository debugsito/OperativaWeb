import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { Container, Divider, Grid, Paper, Typography } from "@material-ui/core";

import { Breadcrumbs, Button, TextInput } from "../../shared/components";
import { ShowPosition } from "../components";
import { SessionRoutes } from "../../shared/libs/sessionRoutes";

const useStyles = makeStyles( theme => ({
    paper:{
        padding: "3rem"
    }
}))

export default function Republish(props) {
    const classes = useStyles()
    const initRoute = SessionRoutes().initRoute;
    const routes = [{ name: "HISTORIAL", to: `${initRoute}/historial-de-publicaciones` }, { name: "REPUBLICAR", to: `${initRoute}/republicar-posicion` }];

    return (
        <Container className="dashboard-container">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Breadcrumbs routes={routes} />
                </Grid>
                <Grid item xs={12}>
                    <Grid container direction="column" justify="center" alignItems="center">
                        <Grid item xs={10}>
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
