import { Container, Grid, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { SessionRoutes } from "../../shared/libs/sessionRoutes";
import { NavigateBefore } from "@material-ui/icons";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getApplicantQuestions } from "../../../store/actions/applicant/applicant.action";
import ApplicantOptionForm from '../components/ApplicantOptionForm/index'
import { useParams } from "react-router-dom";
import { setApplicantSelectedQuestion } from '../../../store/actions/applicant/applicant.action'

const useStyles = makeStyles((theme) => ({
    container: {
        background: '#f7f7f7',
        padding: '1rem',
    },
    containerResult: {
        padding: '1.5rem 1rem 2rem',
        boxShadow: '0px 4px 24px rgba(136, 166, 255, 0.05)',
        borderRadius: '12px',
        marginBottom: '1.5rem',
        cursor: 'pointer',
        position: 'relative',
        backgroundColor: '#FBFBFB'
    },
}));




const ApplicantQuestionList = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory()
    const { publication_account_id } = useParams();
    const initRoute = SessionRoutes().initRoute;
    const { applicant: { questions : data } } = useSelector(state => state);

    const setBefore = () => {
        history.push(`${initRoute}/evaluaciones/${publication_account_id}`)
    };

    useEffect(() => {
        getPreguntas();
    }, []);

    const getPreguntas = () => {
        dispatch(getApplicantQuestions(publication_account_id))
    }

    const getTitle = (item) => {
        switch (item.form_type) {
            case 1:
                return <h3>Preguntas adicionales</h3>;
            case 2:
                return <h3>Preguntas de evaluación de experiencia</h3>
            default:
                return <></>
        }
    }
    const selectedQuestion = (item) => {
        dispatch(setApplicantSelectedQuestion(item))
        history.push(`${initRoute}/question/${publication_account_id}`)
        // dispatch(setApplicantSelectedQuestion(item))
        
    }

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
                <Grid item xs={12} className="mb-2">
                    <ApplicantOptionForm title="Preguntas"
                        content="Evaluación de experiencia
                             Preguntas adicionales"
                        color={'#4E51FE'}
                    />
                </Grid>
                <Grid item xs={12} className="mb-2">
                    {data ?
                        data?.map((item, i) => (
                            <>
                                <div className={classes.containerResult} key={`item-${i}`} onClick={() => selectedQuestion(item)}>
                                    {getTitle(item)}
                                </div>
                            </>
                        )) : <></>
                    }
                </Grid>
            </Grid>
        </Container>

    )
}


export default ApplicantQuestionList;