import React from 'react'

import { Grid, Typography } from '@material-ui/core';
import { Button } from '../../../shared/components';
import { peopleSVG } from "../../images";
import { useHistory } from "react-router-dom";


export default function Index(props) {
    const history = useHistory();

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
                                Tu contraseña ha sido actualizada correctamente
                            </Typography>
                            <Typography variant="body1" component="p">
                                Ahora puedes acceder a la plataforma con tu nueva contraseña
                            </Typography>
                            <Grid item xs={12} style={{ display: 'flex', justifyContent: "center", marginTop: "2rem" }}>
                                <Button variant="contained" size="large" onClick={() => history.push("/iniciar-sesion")}>INICIAR SESIÓN</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}
