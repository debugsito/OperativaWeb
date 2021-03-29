import React, { useEffect, useState } from 'react'
import * as moment from 'moment';
import { useDispatch, useSelector } from "react-redux";
import { Container, Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';

import { Breadcrumbs, Button, DataGrid, FabLights } from "../../shared/components";
import { SessionRoutes } from '../../shared/libs/sessionRoutes';

import { getPostulantsByPublicationId } from "../../../store/actions/dashboard/dashboard.action";
import { NearMeTwoTone } from '@material-ui/icons';

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
            return 'Resigtrado';
    }

}

const useStyles = makeStyles((theme) => ({
    fab: {
      borderRadius: "50% !important",
      background: "#46A9D4"
    },
  }));

export default function Listpostulants({ history }) {
    const classes = useStyles();
    const dispatch = useDispatch()
    const publication_id = history.location.state.publication_id
    const { postulantsByPublicationId } = useSelector(state => state?.dashboard)
    const initRoute = SessionRoutes().initRoute;
    const routes = [{ name: "Incio", to: `${initRoute}` }, { name: "Postulantes", to: `${initRoute}/postulantes` }];
    const [rows, setRows] = useState([])

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
                    date: item.createAt,
                    state: getStatus(item.estado),
                    postulant_id: item.user.account_id,
                    similarity: item.user.similarity,
                    residenceTime: item.user.account_vector.ptime
                }
            ))
            setRows(rowTemp)
        }

    }, [postulantsByPublicationId])

    const columns = [
        { field: 'match', headerName: 'Match', width: 100, renderCell: (params) => {
            const { similarity } = params.row
            return (<FabLights value={similarity}/>) 
        }},
        { field: 'residenceTime', headerName: 'Tiempo de permanencia', width: 200 },
        { field: 'fullName', headerName: 'Nombres del postulantes', width: 300 },
        { field: 'academicLevel', headerName: 'Nivel de estudio', width: 220 },
        { field: 'experience', headerName: 'Experiencia', width: 180 },
        { field: 'date', headerName: 'Fecha de postulación', width: 200, valueGetter: (params) => moment(params.value).format("YYYY-MM-DD") },
        {
            field: 'state', headerName: 'Estado', width: 130, renderCell: (params) => {
                const { postulant_id, state } = params.row
                return <Button color="primary" onClick={() => history.push({ pathname: `${initRoute}/postulante/perfil/${postulant_id}`, state: { postulant_id: postulant_id } })}>{state}</Button>
                // return <Button color="primary" onClick={() => console.log("hice click")}>Registrado</Button>
            }
        },
    ];

    return (
        <Container className="dashboard-container">
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
                                pageSize={10}
                                rowsPerPageOptions={[10, 20, 30]}
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
