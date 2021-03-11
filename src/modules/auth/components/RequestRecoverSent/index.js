import React from 'react'
import { Grid, Typography } from '@material-ui/core';
import { Button } from '../../../shared/components';
import { peopleSVG } from "../../images";
import { useHistory } from "react-router-dom";


export default function Index(props) {

    return (
        <>
            <Grid container spacing={3} direction="row" justify="center" alignItems="center" style={{ padding: 20, height: "80vh" }}>
                <Grid item xs={12} lg={8}>
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Grid item sm={12} md={6}>
                            <img src={peopleSVG} alt="" />
                        </Grid>
                        <Grid item sm={12} md={6}>
                            <Typography variant="h4" component="h4">
                                Te hemos enviado un correo electrónico con las instrucciones para restablecer tu contraseña
                            </Typography>
                            <Grid item xs={12} style={{ display: 'flex', justifyContent: "center", marginTop: "2rem" }}>
                                <Button variant="contained" size="large" href={process.env.REACT_APP_PATH_LANDING}>Volver al Inicio</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}
