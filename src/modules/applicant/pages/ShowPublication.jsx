import React, { useEffect, useState } from 'react'
import { DateTime } from "luxon";
import { Container, Grid, MenuItem ,Divider} from "@material-ui/core";
import {Breadcrumbs} from "../../shared/components"
import * as moment from 'moment';
import { useDispatch, useSelector } from "react-redux";
import { SessionRoutes } from '../../shared/libs/sessionRoutes';
import { Typography } from "../../shared/components";
import { getItems,getDistricts,getAllPeriods} from "../../../store/actions/utils/utils.action";
import { getPeriods } from '../../../store/services/utils.service.temp';

// const CreateData=(job_title)=>{



//     return {

//     }
// }




const ShowPublication  = ({ history }) => {
    const dateLocal = DateTime.local().toFormat("yyyy-LL-dd") //Don't use momentjs, will soon be deprecated
    const dispatch = useDispatch();
    const { publicationSelected } = useSelector(state => state?.applicant)
    const { districts,items,periods } = useSelector(state => state?.utils)
    const initRoute = SessionRoutes().initRoute;
    const routes = [{ name: "MIS POSTULACIONES", to: `/postualnte/postulaciones` }, { name: "EN PROGRESO", to: `/postualnte/postulaciones/editar-posicion` }];
    const goForward = () => history.push(initRoute);
    const [publication, setPublication] = useState({});

    useEffect(() => {
        dispatch(getItems())
        dispatch(getDistricts())
        dispatch(getAllPeriods())
    }, [])


    useEffect(() => {
        let row ={...publicationSelected}
        row.to_date=moment(row.to_date).format('DD/MM/YYYY');
        row.categoria=items?.find(x=>x.id===row.rubro_id)?.name;
        row.district=districts?.find(x=>x.id===row.district_id)?.name;
        row.from_date=moment(row.from_date).format('DD/MM/YYYY');
        row.period=periods?.find(x=>x.id===row.period_id)?.name;
        setPublication(row);
        
    }, [])


    return( <Container className="dashboard-container">
               <Grid container spacing={3}>
                    <Grid item xs={12}>
                            <Breadcrumbs routes={routes} />
                        </Grid>
                </Grid>
              
                <Grid container spacing={3}>
                    <Grid item xs={9}>
                        <Typography variant="h6" component="h6">
                            <strong>{publication.job_title}</strong>
                        </Typography>
                        <Divider />
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="subtitle2" component="h6">
                            <strong>Fecha de caducidad</strong>
                        </Typography>
                        <Typography variant="body1" component="h6">
                            {publication.to_date}
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="subtitle2" component="h6">
                            <strong>Categoría</strong>
                        </Typography>
                        <Typography variant="body1" component="h6">
                            {publication.categoria}
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="subtitle2" component="h6">
                            <strong>Descripción</strong>
                        </Typography>
                        <Typography variant="body1" component="h6">
                            {publication.description}
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="subtitle2" component="h6">
                            <strong>Requerimientos</strong>
                        </Typography>
                        <Typography variant="body1" component="h6">
                            {publication.requirements}
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="subtitle2" component="h6">
                            <strong>Dirección</strong>
                        </Typography>
                        <Typography variant="body1" component="h6">
                            {publication.address}
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="subtitle2" component="h6">
                            <strong>Distrito</strong>
                        </Typography>
                        <Typography variant="body1" component="h6">
                            {publication.district}
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="subtitle2" component="h6">
                            <strong>Salario</strong>
                        </Typography>
                        <Typography variant="body1" component="h6">
                            {publication.salary}
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="subtitle2" component="h6">
                            <strong>Fecha de inicio</strong>
                        </Typography>
                        <Typography variant="body1" component="h6">
                            {publication.from_date}
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="subtitle2" component="h6">
                            <strong>Periodo de permanencia</strong>
                        </Typography>
                        <Typography variant="body1" component="h6">
                            {publication.period}
                        </Typography>
                    </Grid>

                </Grid>
            </Container>
    )
}

export default ShowPublication;