import React, { useEffect, useState } from 'react'
// import * as moment from 'moment';
import { DateTime } from 'luxon'
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@material-ui/core";

import { Breadcrumbs, Button, Container, DataGrid, FabLights } from "../../shared/components";
import { SessionRoutes } from '../../shared/libs/sessionRoutes';

import { getPostulantsByPublicationId } from "../../../store/actions/dashboard/dashboard.action";
import { actions_Utils } from "../../../store/actions";

const getStatus = (state) => {
    switch (state) {
        case 0:
            return 'Descartado';
        case 1:
            return 'Registrado';
        case 2:
            return 'En proceso';
        case 3:
            return 'Contratado';
        default:
            return 'Registrado';
    }

}

const convertDaysIntoYearhAndMonth = (days) => {
    const years = Math.round(days/365)
    const months = Math.round((days%365)/30)
    const textOfYear = years > 1? "años": "año"
    const textOfMonth = months > 1? "meses": "mes"
    return years > 0? (`${years} ${textOfYear} ${months} ${textOfMonth}`): `${months} ${textOfMonth}`
}

export default function Listpostulants({ history }) {
    const dispatch = useDispatch()
    const { postulantsByPublicationId, publicationSelected } = useSelector(state => state?.dashboard)
    const publication_id = publicationSelected.data.id
    const initRoute = SessionRoutes().initRoute;
    const routes = [{ name: "Inicio", to: `${initRoute}` }, { name: "Postulantes", to: `${initRoute}/postulantes` }];
    const [rows, setRows] = useState([])

    useEffect(() => {
        dispatch(actions_Utils.getDistricts)
    }, [])

    useEffect(() => {
        dispatch(getPostulantsByPublicationId({ publication_id }))
    }, [publication_id])

    useEffect(() => {
        if (Object.keys(postulantsByPublicationId).length !== 0) {
            let rowTemp = postulantsByPublicationId?.data?.map((item) => (
                {
                    id: item.id,
                    fullName: `${item.user.first_name} ${item.user.last_name}`,
                    academicLevel: item.user.level_name || "",
                    experience: item.user.experience == 1 ? "Con experiencia" : "Sin experiencia",
                    date: DateTime.fromISO(item.createdAt).toUTC().toFormat("yyyy-LL-dd")??"--",
                    state: getStatus(item.estado),
                    postulant_id: item.user.account_id,
                    similarity: item.user.similarity,
                    residenceTime: convertDaysIntoYearhAndMonth(item.user.account_vector.ptime)
                }
            ))
            setRows(rowTemp)
        }

    }, [postulantsByPublicationId])

    const columns = [
        { field: 'similarity', headerName: 'Match', width: 100, sortable: false, renderCell: (params) => {
            const { similarity } = params.row
            return (<FabLights value={similarity }/>) 
        }},
        { field: 'residenceTime', headerName: 'Tiempo de permanencia', width: 180, sortable: false },
        { field: 'fullName', headerName: 'Nombres del postulantes', width: 300, sortable: false },
        { field: 'experience', headerName: 'Experiencia', width: 180, sortable: false },
        { field: 'date', headerName: 'Fecha de postulación', width: 200, type: 'date', sortable: false},
        {
            field: 'state', headerName: 'Estado', width: 130, sortable: false, renderCell: (params, index) => {
                const { postulant_id, state } = params.row
                return <Button color="primary" onClick={() => history.push({ pathname: `${initRoute}/postulante/perfil/${postulant_id}` })}>{state}</Button>
            }
        },
    ];

    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Breadcrumbs routes={routes} />
                </Grid>
                <Grid item xs={12} style={{ margin: "1rem" }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                pageSize={60}
                                rowsPerPageOptions={[10, 30, 60]}
                                hideFooterSelectedRowCount 
                                autoHeight
                            />
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>
        </Container>
    )
}
