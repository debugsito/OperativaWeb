import React from 'react'
import { Container, Grid } from "@material-ui/core";
import { Breadcrumbs } from "../../shared/components";
import { DataTableUser } from "../components";

const routes = [{ name: "Usuarios", to: "/dashboard" }];

export default function Users(props) {

    return (
        <Container className="dashboard-container">
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <Breadcrumbs routes={routes} />
                </Grid>
                <Grid item xs={12} style={{ margin: "1rem" }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <DataTableUser />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>

    )
}
