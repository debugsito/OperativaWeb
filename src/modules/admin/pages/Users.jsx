import React from 'react';
import { Container, Grid } from "@material-ui/core";
import { Breadcrumbs, Typography } from "../../shared/components";
import { UsersTable, SearchForm } from "../components";

const routes = [{ name: "USUARIOS", to: "/admin" }];

export default function Users() {

  return (
    <Container className="dashboard-container">
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Breadcrumbs routes={routes} />
        </Grid>
        <Grid item xs={12} style={{ margin: "1rem" }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="body1">Consolidado de las cuentas creadas por tipo de: Empresa, Socios estratégicos y postulantes.</Typography>
            </Grid>
            <Grid item xs={12}>
              <SearchForm />
            </Grid>
            <Grid item xs={12}>
              <UsersTable />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
