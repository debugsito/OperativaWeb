import { Container, Dialog, Grid, makeStyles, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { SessionRoutes } from "../../shared/libs/sessionRoutes";
import { NavigateBefore } from "@material-ui/icons";
import React, { useEffect } from "react";
import ApplicantResultsPostulateForm from "../components/ApplicantPostulateForm/ApplicantResultsPostulateForm";
import { useParams } from "react-router-dom";
import ApplicantOptionForm from '../components/ApplicantOptionForm/index'
import {useSelector, useDispatch} from "react-redux";
import { getPublicationAccountById } from "../../../store/actions/applicant/applicant.action";

const useStyles = makeStyles((theme) => ({
    // background: #f7f7f7;
    // padding: 1rem;
    container: {
        background: '#f7f7f7',
        padding: '1rem',
    },
    spanText : {
        fontWeight: 'bold',
        fontSize: '1.5em'
    }

}));

const ApplicationDetail = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory()
    const { id } = useParams();
    const {applicant: {publicationAccountSelected}} = useSelector(state => state);
    const initRoute = SessionRoutes().initRoute;

    useEffect(() => {
        getAnuncio();
    }, []);

    const getAnuncio = async () => {
        dispatch(getPublicationAccountById(id));
    };

    const setBefore = () => {
        history.push(`${initRoute}/postulaciones`)
    };

    return (
        <Container className={classes.container}>
            <Grid container spacing={0}>
                <Grid item xs={12} className="mb-2">
                    <a className="btn-logout">
                        <NavigateBefore onClick={setBefore} />
                    </a>
                </Grid>
                <Grid item xs={12}>
                    <ApplicantResultsPostulateForm data={publicationAccountSelected} 
                    status = {publicationAccountSelected?.estado}
                    route={`${initRoute}/postulaciones/detalle/${publicationAccountSelected.id}`} />
                    <h1> Felicitaciones ! </h1>
                    <p>Te encuentas en el proceso de selección, la empresa activará las tareas que deberás resolver. <br />
                    <br />
                        Te recomendamos que estés atento todo el proceso. <span className={classes.spanText}>¡Éxitos!</span> </p>
                </Grid>
                <Grid item xs={12}>
                    <ApplicantOptionForm title="Bandeja de mensajes"  icon="Email"
                    content="Revisa y responde los mensajes del reclutador" 
                    route={`${initRoute}/mensajes/${publicationAccountSelected.id}`}

                    />
                    <ApplicantOptionForm title="Evaluaciones" icon="Assignment"
                    content="Responde y asiste a las evaluaciones del proceso de selección."
                    />
                </Grid>
            </Grid>
        </Container>
    );
};

export default ApplicationDetail;
