import React from 'react'
import { Container, Grid } from "@material-ui/core";

import { Breadcrumbs } from "../../shared/components";
import { SessionRoutes } from "../../shared/libs/sessionRoutes";

export default function Billing(props) {
    const initRoute = SessionRoutes().initRoute;
    const routes = [{ name: "FACTURACIÓN", to: `${initRoute}` }];
    
    return (
        <Container className="dashboard-container">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Breadcrumbs routes={routes} />
                </Grid>
                <Grid item xs={12}>
                    Hola mundo
                </Grid>
            </Grid>
        </Container>
    )
}
