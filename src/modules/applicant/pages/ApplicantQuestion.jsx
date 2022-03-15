import { Container, Dialog, Grid, makeStyles, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { SessionRoutes } from "../../shared/libs/sessionRoutes";
import { NavigateBefore } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getApplicantQuestions, setApplicantQuestions } from "../../../store/actions/applicant/applicant.action";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepButton from '@material-ui/core/StepButton';
import { Button } from "../../shared/components";
import '../styles/postulate-form.css'
import '../styles/dots.css'
import CheckSvg from "../assets/images/check.svg"
import Box from '@material-ui/core/Box'
import { service_Applicant } from "../../../store/services"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';
import CardActions from '@material-ui/core/CardActions';

const useStyles = makeStyles((theme) => ({
    container: {
        background: '#f7f7f7',
        padding: '1rem',
    },
    spanText: {
        fontWeight: 'bold',
        fontSize: '1.5em'
    },
    titleHeader: {
        color: '#5D5FEF'
    },

}));

const ApplicantQuestion = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory()
    const { publication_account_id } = useParams();
    const initRoute = SessionRoutes().initRoute;
    const { applicant: { questions } } = useSelector(state => state);
    const [activeStep, setActiveStep] = useState(0);
    const [success, setSuccess] = useState(false);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };



    useEffect(() => {
        getPreguntas();
    }, []);

    const getPreguntas = async () => {
        dispatch(getApplicantQuestions(publication_account_id))
    }

    const setBefore = () => {
        history.push(`${initRoute}/evaluaciones/${publication_account_id}`)
    };

    const sendForm = async () => {
        let value = questions?.form?.questions.map(e => {
            return {
                question_field_id: e.question_fields[0].id,
                assign_form_publication_account_id: questions.id,
                value: (e.question_fields[0].answers.length == 0) ? '' : e.question_fields[0].answers[0].value

            }
        })
        try {
            const response = await service_Applicant.upateForm(value);
            if (response.status == 200) {
                setSuccess(true)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const goStep = (i) => {
        setActiveStep(i);
    }
    const editValue = (value) => {
        if (questions?.form?.questions[activeStep]?.question_fields[0].answers.length == 0) {
            questions?.form?.questions[activeStep]?.question_fields[0].answers.push({
                value: value
            });
        }
        else {
            let questionAnswer = questions?.form?.questions[activeStep]?.question_fields[0].answers[0];
            questionAnswer = Object.assign(questionAnswer, { value: value })

        }
        dispatch(setApplicantQuestions(questions))
    }

    const getValue = () => {

        let value = (questions?.form?.questions[activeStep]?.question_fields[0].answers.length > 0) ?
            questions?.form?.questions[activeStep]?.question_fields[0].answers[0].value
            : ''
        return value;
    }

    return (
        <>
            {!success ? <Container className={classes.container}>
                {questions?.form?.questions.length > 0 ? <Grid container spacing={0}  style={{marginTop :'20px'}}>
                    <Card style={{ width: '100%' }}>
                        <CardHeader
                            title={
                                <React.Fragment>
                                    <Typography
                                        variant="h6"
                                        letiant="body2"
                                        className={classes.titleHeader}
                                        color="textPrimary"
                                    >
                                        Pregunta {`${activeStep + 1}/${questions?.form?.questions?.length}`}
                                    </Typography>

                                    <Typography
                                        component="span"
                                        letiant="body2"
                                        color="textPrimary"
                                    >
                                        {questions?.form?.questions[activeStep].text}
                                    </Typography>

                                </React.Fragment>}
                        >

                        </CardHeader>

                        <CardContent>
                            <Grid item xs={12} >
                                <TextField style={{ width: '100%' }}
                                    id="outlined-multiline-static"
                                    label="Ingresa su respuesta"
                                    multiline
                                    value={getValue()}
                                    onChange={event => editValue(event.target.value)}
                                    rows={4}
                                    variant="outlined"
                                />

                            </Grid>

                        </CardContent>
                        <CardActions >
                            <Grid item xs={12} container justifyContent="center" alignItems="center" >
                                <nav class="carousel">

                                    {questions?.form?.questions.map((item, i) => (
                                        <>
                                            <input id={`carousel-item-${i}`} type="radio" name="carousel-dots" checked={(i == activeStep) ? true : false} />
                                            <label for={`carousel-item-${i}`} key={i} onClick={event => goStep(i)} >Go to item {i}</label>
                                        </>
                                    ))}
                                </nav>
                            </Grid>
                        </CardActions>

                    </Card>

                    <Grid item xs={12} style={{ padding: '20px' }}>
                        <Grid container spacing={2} >
                            <Grid container xs spacing={0} >
                                <Button style={{ width: '100%' }} variant="outlined" onClick={setBefore}>CANCELAR</Button>

                            </Grid>
                            <Grid container xs spacing={0} >
                                {activeStep + 1 == questions?.form?.questions.length ? <Button style={{ width: '100%' }} variant="contained" onClick={sendForm}>ENVIAR</Button>
                                    : <Button style={{ width: '100%' }} variant="contained" onClick={handleNext}>CONTINUAR</Button>
                                }
                            </Grid>

                        </Grid>
                    </Grid>


                </Grid> : <></>}
            </Container> :
                <Container className={classes.container}>
                    <Grid item xs={12} className="mb-2" style={{marginTop :'20px'}}>
                        <Grid container spacing={0}   justifyContent="center">
                            <Card >
                                <Grid item xs={12} style={{ textAlign: 'center', margin: '30px' }}>
                                    <img src={CheckSvg} alt="check"></img>
                                    <CardHeader style={{ textAlign: 'center' }} title={
                                        <React.Fragment>
                                            <Typography
                                                variant="h4"
                                                component="h4"
                                                color="textPrimary"
                                            >
                                                Respuestas Enviadas
                                            </Typography>
                                        </React.Fragment>
                                    } />

                                    <CardContent style={{ textAlign: 'center' }}>
                                        <Grid item xs={12} >
                                            <Typography variant="body2" color="textSecondary" component="p">

                                                Tus respuestas fueron enviadas con éxito, pronto tendras noticias del reclutador.
                                            </Typography>

                                        </Grid>
                                    </CardContent>
                                    <CardActions>
                                        <Grid item xs={12}>
                                            <Grid container spacing={0} direction='row' justifyContent="center">
                                                <Button variant="contained" size="large" onClick={setBefore}>Cerrar</Button>
                                            </Grid>
                                        </Grid>
                                    </CardActions>
                                </Grid>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            }
        </>
    )

}
export default ApplicantQuestion;
