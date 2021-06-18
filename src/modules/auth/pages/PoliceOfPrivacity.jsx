import React from 'react'
import { Container, Grid, makeStyles } from '@material-ui/core';
import { PrivacyPolicies } from "../components";

export default function Policeofprivacity(props) {
    

    return (
        <Grid container justify="center" spacing={2}>
            <Grid item xs={11} md={9}>
                <br/>
                <PrivacyPolicies />
            </Grid>
        </Grid>
    )
}
