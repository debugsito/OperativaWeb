import React, {useEffect} from 'react'
import { Container,Divider, Grid, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
// import { DateTime } from "luxon";
import * as moment from 'moment';
import { useDispatch, useSelector } from "react-redux";
import { actions_Utils } from "../../../store/actions";
import { Breadcrumbs, Button, RichText } from "../../shared/components";
import { SessionRoutes } from '../../shared/libs/sessionRoutes';


export default function ShowPositionDetail(props) {
    const dispatch = useDispatch()
    const history = useHistory()
    const initRoute = SessionRoutes().initRoute;
    const { publicationSelected } = useSelector(state => state?.dashboard)
    const { districts, provinces, departments, items, periods } = useSelector(state => state?.utils)
    const routes = [{ name: "Inicio", to: `${initRoute}` }, { name: "Ver posicion", to: `${initRoute}/ver-posicion` }];

    useEffect(() => {
        dispatch(actions_Utils.getDepartments());
        dispatch(actions_Utils.getProvinces());
        dispatch(actions_Utils.getDistricts());
        dispatch(actions_Utils.getItems());
        dispatch(actions_Utils.getAllPeriods());
    },[])

    const getNameById = (id,array=[]) => {
        const result = array.filter(element => element.id == id)
        return result.length >0 ?result[0]?.name:"----"
    }

    return (
        <Container className="dashboard-container">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Breadcrumbs routes={routes} />
                </Grid>
                <Grid item xs={12} style={{ margin: "1rem"}}>
                    <Grid container>
                        <Grid item xs={8} style={{ margin: "auto", padding:"2rem", background:"white"  }}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Typography variant="h4" component="h4">
                                        <strong>{publicationSelected.job_title}</strong>
                                    </Typography>
                                    <Divider />
                                    <br />
                                </Grid>
                               
                                <Grid item xs={6}>
                                    <Typography variant="subtitle2" component="h6">
                                        <strong>Fecha de caducidad:</strong>
                                    </Typography>
                                    <Typography variant="body1" component="h6">
                                        {moment(publicationSelected.to_date).utc().format("LL")}
                                        {/* {DateTime.fromISO(publicationSelected.to_date).toFormat("DDD")} */}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="subtitle2" component="h6">
                                        <strong>Rubro:</strong>
                                    </Typography>
                                    <Typography variant="body1" component="h6">
                                    {getNameById(publicationSelected.job_level_id,items)}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} >
                                    <Typography variant="subtitle2" component="h6">
                                        <strong>Nombre del puesto:</strong>
                                    </Typography>
                                    <Typography variant="body1" component="h6">
                                        {publicationSelected.job_title}
                                    </Typography>
                                </Grid>
                                
                                <br />
                                <Grid item xs={6}>
                                    <Typography variant="subtitle2" component="h6">
                                        <strong>Dirección:</strong>
                                    </Typography>
                                    <Typography variant="body1" component="h6">
                                        {publicationSelected.address}
                                    </Typography>
                                </Grid >
                                <Grid item xs={6}>
                                    <Typography variant="subtitle2" component="h6">
                                        <strong>Fecha de inicio:</strong>
                                    </Typography>
                                    <Typography variant="body1" component="h6">
                                        {moment(publicationSelected.from_date).utc().format("LL")}
                                    </Typography>
                                </Grid >
                                
                                <Grid item xs={6}>
                                    <Typography variant="subtitle2" component="h6">
                                        <strong>Salario:</strong>
                                    </Typography>
                                    <Typography variant="body1" component="h6">
                                        {publicationSelected.salary!==null? publicationSelected.salary:"A tratar"}
                                    </Typography>
                                </Grid >
                                <br />
                                <Grid item xs={6}>
                                    <Typography variant="subtitle2" component="h6">
                                        <strong>Distrito/Provincia/Departamento:</strong>
                                    </Typography>
                                    <Typography variant="body1" component="h6">
                                        {`${getNameById(publicationSelected.district.id,districts)}/
                                        ${getNameById(publicationSelected.district.province_id,provinces)}/
                                        ${getNameById(publicationSelected.district.province.department_id,departments)}`}
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant="subtitle2" component="h6">
                                        <strong>Periodo de permanencia:</strong>
                                    </Typography>
                                    <Typography variant="body1" component="h6">
                                        {getNameById(publicationSelected.period,periods)}
                                    </Typography>
                                </Grid>
                                <br />
                                <Grid item xs={12}>
                                    <Typography variant="subtitle2" component="h6">
                                        <strong>Funciones del puesto:</strong>
                                    </Typography>
                                    <br />
                                    <RichText 
                                        label="Funciones del puesto"
                                        name="description"
                                        valueText={JSON.parse(publicationSelected.description)}
                                        readOnly
                                    />
                                    {/* <TextInput
                                        fullWidth
                                        label=""
                                        multiline
                                        variant="filled"
                                        name="requirements"
                                        value={publicationSelected.description}
                                        InputProps={{
                                            readOnly: true,
                                          }}
                                    /> */}
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle2" component="h6">
                                        <strong>Requisitos del puesto:</strong>
                                    </Typography>
                                    <br />
                                    <RichText 
                                        label="Requisitos del puesto"
                                        name="description"
                                        valueText={JSON.parse(publicationSelected.requirements)}
                                        readOnly
                                    />
                                </Grid>
                                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }} >
                                    <Button variant="contained" size="large" onClick={() => history.goBack()}>regresar</Button>
                                </Grid>

                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}
