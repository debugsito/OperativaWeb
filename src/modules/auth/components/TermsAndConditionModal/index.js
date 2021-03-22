import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { Button, Modal } from '../../../shared/components';


export default function TermsAndConditionModal({ handleClose, handleAccept, ...props }) {
    return (
        <Modal {...props}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h5" component="h5" className="title-color">
                        TÉRMINOS Y CONDICIONES DEL SERVICIO
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2" component="p" style={{ fontWeight: 500 }}>
                        De conformidad con la Ley 29733 de Protección de Datos Personales, autorizo, libre y expresamente a la Plataforma OPERATIVA para que mis datos personales sean utilizados para fines laborales.
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2" component="p" style={{ fontWeight: 500 }}>
                        Deseo recibir información sobre organizaciones, empresas, que puedan adecuarse a mi interés de trabajo.
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2" component="p" style={{ fontWeight: 500 }}>
                        Deseo recibir notificaciones de convocatorias de trabajo en mi correo electrónico.
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2" component="p" style={{ fontWeight: 500 }}>
                        Operativa es una plataforma tecnológicas que permite conectar a empresas y postulantes en la búsqueda de contrataciones para realizar trabajos operarios, siendo únicamente las empresas  responsables del proceso selección y de contratación de personal.
                    </Typography>
                </Grid>
                <br />
                <br />
                <Grid item xs={12}>
                    <Grid container spacing={3} className="justify-center">
                        <Grid item>
                            <Button variant="outlined" size="large" onClick={handleClose}>Cerrar</Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" size="large" onClick={handleAccept}>Aceptar</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Modal>
    );
}