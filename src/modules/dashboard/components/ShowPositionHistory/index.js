import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { DateTime } from "luxon";
import { Divider, Grid, Typography } from "@material-ui/core";

import { actions_Utils } from "../../../../store/actions";
import { getRubroById } from "../../../shared/utils";

export default function Index({ button }) {
    const dispatch = useDispatch()
    const { publicationSelected } = useSelector(state => state?.dashboard)
    const { items } = useSelector(state => state?.utils)

    useEffect(() => {
        dispatch(actions_Utils.getDepartments());
        dispatch(actions_Utils.getProvinces());
        dispatch(actions_Utils.getDistricts());
        dispatch(actions_Utils.getItems());
        dispatch(actions_Utils.getAllPeriods());
    }, [])

    return (
        <Grid container spacing={3}>
            <Grid item xs={11}>
                <Grid container direction="row" justify="space-between">
                    <Grid item xs={6}>
                        <Typography variant="h6" component="h6">
                            {publicationSelected.job_title}
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        {button}
                    </Grid>
                </Grid>
                <Divider />
            </Grid>
            <Grid item xs={11}>
                <Typography variant="subtitle2" component="h6">
                    <strong>Creado por</strong>
                </Typography>
                <Typography variant="body1" component="h6">
                    {publicationSelected.account.user.fullname}
                </Typography>
                <br />
                <Typography variant="subtitle2" component="h6">
                    <strong>Fecha de publicación</strong>
                </Typography>
                <Typography variant="body1" component="h6">
                    {DateTime.fromISO(publicationSelected.createdAt).toFormat("dd/LL/yyyy")}
                </Typography>
                <br />

                <Typography variant="subtitle2" component="h6">
                    <strong>Fecha de caducidad</strong>
                </Typography>
                <Typography variant="body1" component="h6">
                    {DateTime.fromISO(publicationSelected.to_date).toFormat("dd/LL/yyyy")}
                </Typography>
                <br />

                <Typography variant="subtitle2" component="h6">
                    <strong>Categoría</strong>
                </Typography>
                <Typography variant="body1" component="h6">
                    {getRubroById(items, publicationSelected.rubro_id)}
                </Typography>
                <br />

                <Typography variant="subtitle2" component="h6">
                    <strong>Descripción</strong>
                </Typography>
                <Typography variant="body1" component="h6">
                    Somos Andes Perú, empresa peruana basada en la operación de negocios mineros de oro y plata en América.
                    Nos encontramos en la búsqueda de MOTORIZADOS. <br />
                    Vacante Disponible: <br />
                    REPARTIDORES TIEMPO COMPLETO - ANDES LIMA.
                </Typography>
                <br />

                <Typography variant="subtitle2" component="h6">
                    <strong>Requisitos del puesto</strong>
                </Typography>
                <Typography variant="body1" component="h6">
                    Contar con moto propia y documentos actualizados (licencia de conducir, tarjeta de propiedad y SOAT). <br />
                    Tener disponibilidad trabajar part time 6 días a la semana en horario rotativo.<br />
                    Experiencia mínima de 3 meses, de preferencia en el rubro de fast food y restaurantes.<br />
                    Buena actitud, orientación al servicio, disposición para el aprendizaje y trabajo en equipo.<br />
                </Typography>
                <br />

                <Typography variant="subtitle2" component="h6">
                    <strong>Dirección</strong>
                </Typography>
                <Typography variant="body1" component="h6">
                    {publicationSelected.address}
                </Typography>
                <br />

                <Typography variant="subtitle2" component="h6">
                    <strong>Distrito</strong>
                </Typography>
                <Typography variant="body1" component="h6">
                    {publicationSelected.name}
                </Typography>
                <br />

                <Typography variant="subtitle2" component="h6">
                    <strong>Salario</strong>
                </Typography>
                <Typography variant="body1" component="h6">
                    {publicationSelected.salary}
                </Typography>
                <br />

                <Typography variant="subtitle2" component="h6">
                    <strong>Fecha de inicio</strong>
                </Typography>
                <Typography variant="body1" component="h6">
                    {DateTime.fromISO(publicationSelected.from_date).toFormat("dd/LL/yyyy")}
                </Typography>
                <br />

                <Typography variant="subtitle2" component="h6">
                    <strong>Periodo de permanencia</strong>
                </Typography>
                <Typography variant="body1" component="h6">
                    {publicationSelected.periodo}
                </Typography>
                <br />

            </Grid>
        </Grid>
    )
}
