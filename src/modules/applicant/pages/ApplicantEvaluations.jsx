import { Container, Dialog, Grid, makeStyles, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { SessionRoutes } from "../../shared/libs/sessionRoutes";
import { NavigateBefore } from "@material-ui/icons";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ApplicantOptionForm from '../components/ApplicantOptionForm/index'

const useStyles = makeStyles((theme) => ({
    // background: #f7f7f7;
    // padding: 1rem;
    container: {
        background: '#f7f7f7',
        padding: '1rem',
    },
    spanText: {
        fontWeight: 'bold',
        fontSize: '1.5em'
    }

}));

const ApplicantEvaluations = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory()
    const { publication_account_id } = useParams();
    const initRoute = SessionRoutes().initRoute;


    const setBefore = () => {
        history.push(`${initRoute}/postulaciones/detalle/${publication_account_id}`)
    };

    return (
        <Container className={classes.container}>
            <Grid container spacing={0}>
                <Grid item xs={12} className="mb-2">
                    <a className="btn-logout">
                        <NavigateBefore onClick={setBefore} />
                    </a>
                </Grid>
                <Grid item xs={12} className="mb-2">
                        <div className="container-result-postulate-form">
                            <Grid item xs={12} className="mb-2">
                                <div className="container-header">
                                    <h4 className="title">Evaluaciones</h4>
                                </div>
                            </Grid>

                        </div>
                    </Grid>

                <Grid item xs={12}>
                    <ApplicantOptionForm title="Preguntas"
                        content="Evaluación de experiencia
                             Preguntas adicionales"
                        route={`${initRoute}/question/${publication_account_id}`}
                        color={'#4E51FE'}
                    />

                    <ApplicantOptionForm title="Exámen médico"
                        content="Dirección de evaluación medica"
                        // route={`${initRoute}/mensajes/${publicationAccountSelected.id}`}
                        color={'#4E51FE'}
                    />

                    <ApplicantOptionForm title="Evaluativa"
                        content="Resuelve el siguiente test psicológico"
                        // route={`${initRoute}/mensajes/${publicationAccountSelected.id}`}
                        color={'#4E51FE'}
                    />
                </Grid>
            </Grid>
        </Container>
    )
}

export default ApplicantEvaluations;
