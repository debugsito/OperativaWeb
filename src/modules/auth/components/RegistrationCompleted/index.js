import React from 'react'

import { Grid, Typography } from '@material-ui/core';
import { Button } from '../../../shared/components';
import { peopleSVG } from "../../images";
import { useDispatch } from "react-redux";
import { redirectToLandingPage } from "../../../../store/actions/auth/auth.action";


export default function Index() {
    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(redirectToLandingPage(true))
    }

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} lg={8} style={{ margin: "auto" }}>
                    <Grid container spacing={3} style={{ padding: "4rem", display: "flex", alignItems: "center" }}>
                        <Grid item sm={12} md={6}>
                            <img src={peopleSVG} alt="" />
                        </Grid>
                        <Grid item sm={12} md={6}>
                            <Typography variant="h4" component="h4">
                                Solicitud Enviada
                            </Typography>
                            <br />
                            <Grid item xs={12}>
                                <Typography variant="body2" component="p">
                                    La solicitud ha sido enviada para su aprobación, en un plazo máximo de 24 horas recibirá un correo con la contraseña de su usuario.
                            </Typography>
                            </Grid>
                            <br />
                            <Grid item xs={12}>
                                <Typography variant="body2" component="p">
                                    En caso de presentar algún inconveniente no dude en comunicarse con nosotros a través del correo <strong>soporte@operativa.pe</strong>
                                </Typography>
                            </Grid>

                            <Grid item xs={12} style={{ display: 'flex', justifyContent: "center", marginTop: "2rem" }}>
                                <Button variant="contained" size="large" onClick={handleClick}>Volver al Inicio</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}
