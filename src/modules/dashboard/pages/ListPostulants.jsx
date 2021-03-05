import React,{useEffect, useState} from 'react'
import * as moment from 'moment';
import { useDispatch, useSelector } from "react-redux";
import { Container, Grid } from "@material-ui/core";

import { Breadcrumbs, Button, DataGrid } from "../../shared/components";
import { SessionRoutes } from '../../shared/libs/sessionRoutes';

import { getPostulantsByPublicationId } from "../../../store/actions/dashboard/dashboard.action";
import { NearMeTwoTone } from '@material-ui/icons';

const getStatus=(state)=>{
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

export default function Listpostulants({history}) {
    const dispatch = useDispatch()
    const publication_id = history.location.state.publication_id
    const {postulantsByPublicationId} = useSelector(state => state?.dashboard)
    const initRoute = SessionRoutes().initRoute;
    const routes = [{ name: "Incio", to: `${initRoute}` }, { name: "Postulantes", to: `${initRoute}/postulantes` }];
    const [rows, setRows] = useState([])

    useEffect(() => {
        dispatch(getPostulantsByPublicationId({publication_id}))
    },[publication_id])

    useEffect(() => {
        if(Object.keys(postulantsByPublicationId).length !== 0){
            let rowTemp = postulantsByPublicationId?.data?.map((item) => (
                {
                    id:item.id,
                    fullName:item.user.fullname,
                    academicLevel:item.user.level_name || "",
                    experience:item.user.experience == 1?"Con experiencia":"Sin experiencia",
                    date:item.createAt,
                    state: getStatus(item.estado),
                    postulant_id: item.user.account_id
                }
                ))
                setRows(rowTemp)
        }
        
    },[postulantsByPublicationId])
    
    const columns = [
        { field: 'fullName', headerName: 'Nombres del postulantes', width: 250 },
        { field: 'academicLevel', headerName: 'Nivel de estudio', width: 220 },
        { field: 'experience', headerName: 'Experiencia', width: 180 },
        { field: 'date', headerName: 'Fecha de postulacion', width: 150, valueGetter: (params) => moment(params.value).format("YYYY-MM-DD") },
        { field: 'state', headerName: 'Estado', width: 130, renderCell: (params) => {
            const { postulant_id,state } = params.row
            return <Button color="primary" onClick={() => history.push({pathname:`${initRoute}/postulante/perfil/${postulant_id}`,state:{postulant_id:postulant_id}})}>{state}</Button>
            // return <Button color="primary" onClick={() => console.log("hice click")}>Registrado</Button>
          } },
    ];

    return (
        <Container className="dashboard-container">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Breadcrumbs routes={routes} />
                </Grid>
                <Grid item xs={12} style={{ margin: "1rem" }}>
                    <DataGrid rows={rows} columns={columns} pageSize={25} rowsPerPageOptions={[25, 50, 100]} hideFooterSelectedRowCount/>
                </Grid>
            </Grid>
        </Container>
    )
}
