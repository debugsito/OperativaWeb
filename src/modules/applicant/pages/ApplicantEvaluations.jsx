import { Container, Dialog, Grid, makeStyles, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { SessionRoutes } from "../../shared/libs/sessionRoutes";
import { NavigateBefore } from "@material-ui/icons";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ApplicantOptionForm from '../components/ApplicantOptionForm/index'
import { arrow } from '../../shared/images/postulant/index'

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
    const { applicant: { publicationAccountSelected } } = useSelector(state => state);
    const initRoute = SessionRoutes().initRoute;


    const setBefore = () => {
        history.push(`${initRoute}/postulaciones/detalle/${publication_account_id}`)
    };

    return (
        <Container className={classes.container}>
            <Grid container spacing={0}>
                <Grid item xs={12} className="mb-2">
                    <img src={arrow} alt="" onClick={setBefore} />
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
                    {publicationAccountSelected?.questions ? <ApplicantOptionForm title="Preguntas"
                        content="Evaluación de experiencia
                             Preguntas adicionales"
                        route={`${initRoute}/question/list/${publication_account_id}`}
                        color={'#4E51FE'}
                    /> : <></>}

                    {publicationAccountSelected?.medical_test ? <ApplicantOptionForm title="Exámen médico"
                        content="Dirección de evaluación medica"
                        // route={`${initRoute}/mensajes/${publicationAccountSelected.id}`}
                        color={'#4E51FE'}
                        route={`${initRoute}/medital_test/${publication_account_id}`}
                    /> : <></>}

                    {publicationAccountSelected?.interviewed ? <ApplicantOptionForm title="Entrevista"
                        content="Ver horario de entrevista"
                        // route={`${initRoute}/mensajes/${publicationAccountSelected.id}`}
                        color={'#4E51FE'}
                        route={`${initRoute}/interview/${publication_account_id}`}
                    /> : <></>}

                    {publicationAccountSelected?.evaluativa ? <ApplicantOptionForm title="Evaluativa"
                        content="Resuelve el siguiente test psicológico"
                        // route={`${initRoute}/mensajes/${publicationAccountSelected.id}`}
                        color={'#4E51FE'}
                    /> : <></>}

                    {publicationAccountSelected?.verificativa ? <ApplicantOptionForm title="Veficativa"
                        content="Verificación de antecedentes personales"
                        // route={`${initRoute}/mensajes/${publicationAccountSelected.id}`}
                        color={'#4E51FE'}
                    /> : <></>}
                </Grid>
            </Grid>
        </Container>
    )
}

export default ApplicantEvaluations;
