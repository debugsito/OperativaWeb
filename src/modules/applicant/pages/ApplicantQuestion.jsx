import { Container, Grid, makeStyles, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { SessionRoutes } from "../../shared/libs/sessionRoutes";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setApplicantSelectedQuestion } from "../../../store/actions/applicant/applicant.action";
import { Button } from "../../shared/components";
import '../styles/postulate-form.css'
import '../styles/dots.css'
import CheckSvg from "../assets/images/check.svg"
import { service_Applicant } from "../../../store/services"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';
import CardActions from '@material-ui/core/CardActions';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox'
import FormGroup from '@material-ui/core/FormGroup';
import { arrow } from '../../shared/images/postulant';
import { getAccount } from '../../../store/actions/auth/auth.middleware'

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
    applicantContainer: {
        background: '#f7f7f7',
        padding: '1rem',
    },
    headerQuestion: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
    },
    headerQuestionTitle: {
        width: '100%',
        textAlign: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    }
}));

const ApplicantQuestion = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory()
    const { publication_account_id } = useParams();
    const initRoute = SessionRoutes().initRoute;
    const { applicant: { selectedQuestion: questions } } = useSelector(state => state);

    const [activeStep, setActiveStep] = useState(0);
    const [success, setSuccess] = useState(false);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const setBefore = () => {
        history.push(`${initRoute}/question/list/${publication_account_id}`)
    };

    const sendForm = async () => {
        let data = []
        questions?.form?.questions.forEach(e => {
            const { question_fields } = e;
            question_fields.forEach(o => {
                let value = '';
                if (o.field_type_id == 1) {
                    value = (o.answers.length == 0) ? '' : o.answers[0].value
                }
                if (o.field_type_id == 2 || o.field_type_id == 3) {
                    value = (o.answers.length == 0) ? 'false' : o.answers[0].value
                }
                data.push({
                    question_field_id: o.id,
                    assign_form_publication_account_id: questions.id,
                    value: value
                });
            })

        })
        try {
            const response = await service_Applicant.upateForm(data);
            if (response.status == 200) {
                const completeReponse = await service_Applicant.completeAssingFormAccont(questions.id);
                if(completeReponse.status ==200){
                    console.log(completeReponse);
                    dispatch(getAccount())
                    setSuccess(true)
                }
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
        dispatch(setApplicantSelectedQuestion(questions))
    }

    const getValue = () => {
        let value = (questions?.form?.questions[activeStep]?.question_fields[0].answers.length > 0) ?
            questions?.form?.questions[activeStep]?.question_fields[0].answers[0].value
            : ''
        return value;
    }

    const getCheckValue = (id) => {
        let selectedQuestion = questions?.form?.questions[activeStep]
        const { question_fields } = selectedQuestion;
        let curretQuestionField = question_fields[id];
        if (curretQuestionField.answers.length > 0) {
            return curretQuestionField.answers[0].value == 'true';

        } else {
            return false;
        }
    }

    const editCheckValue = (id, value) => {
        let selectedQuestion = questions?.form?.questions[activeStep]
        const { question_fields } = selectedQuestion;
        let curretQuestionField = question_fields[id];
        const { answers } = curretQuestionField;
        if (answers.length > 0) {
            answers[0].value = value.toString()
        } else {
            answers.push({
                value: value.toString()
            })
        }
        dispatch(setApplicantSelectedQuestion(questions))
    }

    const getRadioValue = () => {
        let selectedQuestion = questions?.form?.questions[activeStep];
        const { question_fields } = selectedQuestion;
        let value = '';
        question_fields.forEach(e => {
            const { answers } = e;
            if (answers.length > 0 && answers && answers[0].value == "true") {
                value = e.text;
            }
        })
        value = (value) ? value : '';
        return value;
    }

    const editRadioValue = (value) => {
        let selectedQuestion = questions?.form?.questions[activeStep];
        const { question_fields } = selectedQuestion;
        question_fields.forEach(e => {
            const { answers } = e;
            let setValue = "false";
            if (e.text == value) {
                setValue = "true";
            }
            if (answers.length > 0) {
                answers[0].value = setValue
            } else {
                answers.push({
                    value: setValue
                })
            }
        })
        dispatch(setApplicantSelectedQuestion(questions))

    }

    const getTitle = () => {
        switch (questions?.form_type) {
            case 1:
                return <h3>Preguntas adicionales</h3>;
            case 2:
                return <h3>Preguntas de evaluación de experiencia</h3>
            default:
                return <></>
        }
    }


    const buildQuestion = () => {
        let selectedQuestion = questions?.form?.questions[activeStep];
        const { question_type_id, question_fields } = selectedQuestion;
        switch (question_type_id) {
            case 1:

                return <>

                    <TextField style={{ width: '100%' }}
                        id="outlined-multiline-static"
                        label="Ingresa su respuesta"
                        multiline
                        value={getValue()}
                        onChange={event => editValue(event.target.value)}
                        rows={4}
                        variant="outlined"
                    />
                </>

            case 2:
                return (
                    <FormControl component="fieldset">
                        <RadioGroup aria-label="" name="radio" value={getRadioValue()} onChange={event => editRadioValue(event.target.value)}>
                            {
                                question_fields.map((item, i) => (
                                    <FormControlLabel key={`radio-${item.id}`} value={item?.text} control={<Radio />} label={item?.text} />
                                ))
                            }
                        </RadioGroup>
                    </FormControl>
                );

            case 3:
                return (
                    <FormControl component="fieldset">
                        <FormGroup>
                            {question_fields.map((item, i) => (
                                <FormControlLabel key={`check-${item.id}`}
                                    control={<Checkbox checked={getCheckValue(i)} name={item?.text} onChange={event => editCheckValue(i, event.target.checked)} />}
                                    label={item?.text}
                                />))}
                        </FormGroup>
                    </FormControl>
                )
            default:
                return <></>
        }
    }

    return (
        <>
            <Container className={classes.applicantContainer}>
                <Grid container spacing={0}>
                    <Grid item xs={12} className={classes.headerQuestion}>
                        <img src={arrow} alt="" onClick={setBefore} />
                        <div className={classes.headerQuestionTitle}>
                            <h3> {getTitle()}</h3>
                        </div>
                    </Grid>
                    <Grid container spacing={0}>
                        {!success ? <Container className={classes.container}>
                            {questions?.form?.questions.length > 0 ? <Grid container spacing={0} style={{ marginTop: '20px' }}>
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
                                            {buildQuestion()}
                                        </Grid>

                                    </CardContent>
                                    <CardActions >
                                        <Grid item xs={12} container justifyContent="center" alignItems="center" >
                                            <nav className="carousel">

                                                {questions?.form?.questions.map((item, i) => (
                                                    <>
                                                        <input id={`carousel-item-${i}`} key={`carousel-input-${item.id}`} type="radio" name="carousel-dots" onChange={event => goStep(i)} checked={(i == activeStep) ? true : false} />
                                                        <label for={`carousel-item-${i}`} key={`carousel-label-${item.id}`} onClick={event => goStep(i)} >Go to item {i}</label>
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
                                <Grid item xs={12} className="mb-2" style={{ marginTop: '20px' }}>
                                    <Grid container spacing={0} justifyContent="center">
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
                    </Grid>
                </Grid>
            </Container>
        </>
    )

}
export default ApplicantQuestion;
