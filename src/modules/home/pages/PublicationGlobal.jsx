
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import { Grid, Paper, Divider, Typography } from "@material-ui/core";
import { Breadcrumbs, Container, Button } from "../../shared/components";
import { SessionRoutes } from "../../shared/libs/sessionRoutes";
import { DateTime } from "luxon";
import { service_Dashboard } from "../../../store/services";
import { convertStringToObject } from "../../shared/utils"
import AppSession from '../../shared/libs/session/AppSession';
import { useSelector } from "react-redux";
import LoginModal from "../components2/LoginModal";

const useStyles = makeStyles(theme => ({
    paper: {
        padding: "3rem"
    }
}))


export default function PublicationGlobal() {
    const { title } = useParams();
    const { user } = useSelector(state => state?.auth);
    const session = AppSession.get();
    const hasSession = (!session || Object.keys(session).length === 0 || session.errorCode) ? false : true;
    const classes = useStyles()
    const initRoute = SessionRoutes().initRoute;
    const [publication, setPublication] = useState(null);
    const routes = [{ name: "Inicio", to: `${initRoute}` }, { name: "Ver publicación", to: `${initRoute}/publication-multiposting/${title}` }];
    const [showModal, setShowModal] = useState(false)

    const closeModal = () => {
        setShowModal(false)
    }

    useEffect(() => {
        getPublicationsInfo()
    }, [])

    const getPublicationsInfo = async () => {
        const respone = await service_Dashboard.getPublicationGlobal(title);
        if (respone.status == 200) {
            setPublication(respone.data);
        }
    }

    const getText = (obj) => {
        let text = ""
        if (obj) {
            let tmp = convertStringToObject(obj)
            text = tmp[0].children[0].text;
        }
        return text;
    }
    const applyJob = () => {
        if (user?.account?.user && hasSession) {
            //postular con manyally 2 
            postApply()
        }
        else {
            //guardar ruta para despues del registro. o login.
            setShowModal(true);
        }
    }

    const postApply = ()=> {
        console.log("postular");
    }

    useEffect(()=> {
        if (user?.account?.user && hasSession) {
            postApply()
        }
    },[user])


    return (
        <Container>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Breadcrumbs routes={routes} />
                </Grid>
                <Grid item xs={12}>
                    <Grid container justify="center">
                        <Grid item xs={10}>

                            <Paper className={classes.paper}>
                                {publication ? <Grid container spacing={3} justify="center">
                                    <Grid item xs={11}>
                                        <Grid container direction="row" justify="space-between">
                                            <Grid item xs={6}>
                                                <img width="150" height="150" src={publication?.account.user?.image_url} alt="" />
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Button variant="contained" color="primary" size="large" onClick={applyJob}>POSTULAR</Button>
                                            </Grid>
                                        </Grid>

                                    </Grid>
                                    <Grid item xs={11}>

                                        <Grid container direction="row" justify="space-between">
                                            <Grid item xs={6}>
                                                <Typography variant="h4" component="h4">
                                                    {publication.job_title}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={11}>

                                        <Typography variant="subtitle2" component="h6">
                                            <strong>Fecha de caducidad</strong>
                                        </Typography>
                                        <Typography variant="body1" component="h6">
                                            {DateTime.fromISO(publication.expiration_date).toFormat("dd/LL/yyyy")}
                                        </Typography>
                                        <br />
                                        <Typography variant="subtitle2" component="h6">
                                            <strong>Caterogia</strong>
                                        </Typography>
                                        <Typography variant="body1" component="h6">
                                            {publication?.rubro?.name}
                                        </Typography>
                                        <br />
                                        <Typography variant="subtitle2" component="h6">
                                            <strong>Descripción</strong>
                                        </Typography>
                                        <Typography variant="body1" component="h6">
                                            {getText(publication?.description)}
                                        </Typography>
                                        <br />

                                        <Typography variant="subtitle2" component="h6">
                                            <strong>Requesitos del puesto</strong>
                                        </Typography>
                                        <Typography variant="body1" component="h6">
                                            {getText(publication?.requirements)}
                                        </Typography>
                                        <br />

                                        {publication?.address &&
                                            <>
                                                <Typography variant="subtitle2" component="h6">
                                                    <strong>Dirección</strong>
                                                </Typography>
                                                <Typography variant="body1" component="h6">
                                                    {publication.address}
                                                </Typography>
                                                <br />
                                            </>
                                        }

                                        <Typography variant="subtitle2" component="h6">
                                            <strong>Distrito</strong>
                                        </Typography>
                                        <Typography variant="body1" component="h6">
                                            {publication?.district?.name}
                                        </Typography>
                                        <br />
                                        {publication?.salary && <>
                                            <Typography variant="subtitle2" component="h6">
                                                <strong>Salario</strong>
                                            </Typography>
                                            <Typography variant="body1" component="h6">
                                                {publication?.salary}
                                            </Typography>
                                            <br />
                                        </>
                                        }
                                        {publication?.from_date &&
                                            <>
                                                <Typography variant="subtitle2" component="h6">
                                                    <strong>Fecha de inicio</strong>
                                                </Typography>
                                                <Typography variant="body1" component="h6">
                                                    {publication?.from_date && DateTime.fromISO(publication?.from_date).toFormat("dd/LL/yyyy")}
                                                </Typography>
                                                <br />
                                            </>
                                        }

                                        {publication?.period_text?.name && <>
                                            <Typography variant="subtitle2" component="h6">
                                                <strong>Periodo de permanencia</strong>
                                            </Typography>
                                            <Typography variant="body1" component="h6">
                                                {publication?.period_text?.name}
                                            </Typography>
                                            <br />
                                        </>}
                                    </Grid>
                                </Grid>
                                    : <>
                                        <Grid item xs={11}>
                                            <Grid container direction="row" justify="space-between">
                                                <Grid item xs={6}>
                                                    <Typography variant="h4" component="h4">
                                                        Publicación no encontrada
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </>
                                }
                            </Paper>

                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <LoginModal showModal={showModal} closeModal={closeModal} />
        </Container>
    )

}