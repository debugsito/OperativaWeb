import { Container, Dialog, Grid, makeStyles, Typography } from "@material-ui/core";
import { SessionRoutes } from "../../shared/libs/sessionRoutes";
import { NavigateBefore } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getMessageDetailApplicant } from "../../../store/actions/applicant/applicant.action";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import * as moment from 'moment';
import TextField from '@material-ui/core/TextField';
import { Button } from "../../shared/components";
import Box from '@material-ui/core/Box'
import { service_Applicant } from "../../../store/services"
import '../styles/postulate-form.css'
import CheckSvg from "../assets/images/check.svg"
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
    },
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    rootCard: {
        width: '100%',
    },
    rootHeader: {
        backgroundColor: '#ED1D40'
    },
    messageBody: {
        display: 'flex',
        direction: 'column',
        color: 'white'
    },

}));

const ApplicantMessageDetail = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory()
    const { publication_account_id, message_id } = useParams();
    const initRoute = SessionRoutes().initRoute;
    const { applicant: { messageDetail } } = useSelector(state => state);
    const [Message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        getMessageDetail();
    }, []);

    const getMessageDetail = async () => {
        dispatch(getMessageDetailApplicant(message_id))
    }

    const setBefore = () => {
        history.push(`${initRoute}/mensajes/${publication_account_id}`);
    };
    const formatDate = (value) => {
        if (value) {
            const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'setiembre', 'octubre', 'noviembre', 'diciembre'];
            const objDate = moment(value);
            return `${objDate.format('DD')} / ${months[Number(objDate.format('MM'))]} / ${objDate.format('YYYY')} ${objDate.format('hh:mm A')}`;
        }
        return '';
    };

    const sendMessage = async (id) => {
        if (Message.length > 0) {
            let data = {
                body: Message,
                parent_id: id
            }
            try {
                const response = await service_Applicant.answerMessage(message_id, data);
                if (response.status == 200) {
                    setSuccess(true)
                }
            } catch (error) {
                console.log(error)
            }

        }

    }


    return (
        <>
            <Container className={classes.container}>
                <Grid container spacing={0}>
                    <Grid item xs={12} className="mb-2">
                        <img src={arrow} alt="" onClick={setBefore} />
                    </Grid>
                    <Grid item xs={12} className="mb-2">
                        <div className="container-result-postulate-form">
                            <Grid item xs={12} className="mb-2">
                                <div className="container-header" style={{ paddingTop: '12px' }}>
                                    <h4 className="title">Bandeja de Mensajes</h4>
                                </div>
                            </Grid>

                        </div>
                    </Grid>

                    {
                        !success ? <Grid item xs={12} className="mb-2">
                            {
                                (messageDetail.map((item, i) => {
                                    return <>
                                        <Card className={classes.rootCard} key={item.id} >
                                            <CardHeader className={classes.rootHeader}
                                                title={
                                                    <React.Fragment>
                                                        <Typography
                                                            component="span"
                                                            letiant="body2"
                                                            className={classes.messageBody}
                                                            color="textPrimary"
                                                        >
                                                            De: {item?.fromUser?.user?.fullname}
                                                        </Typography>
                                                        <Typography
                                                            component="span"
                                                            letiant="body2"
                                                            className={classes.messageBody}
                                                            color="textPrimary"
                                                        >
                                                            {formatDate(item.createdAt)}
                                                        </Typography>

                                                        <Typography
                                                            component="span"
                                                            letiant="body2"
                                                            className={classes.messageBody}
                                                            color="textPrimary"
                                                        >
                                                            Para: {item?.toUser?.user?.fullname}
                                                        </Typography>

                                                        <Typography
                                                            component="span"
                                                            letiant="body2"
                                                            className={classes.messageBody}
                                                            color="textPrimary"
                                                        >
                                                            Asunto: {item?.message?.subject}
                                                        </Typography>

                                                    </React.Fragment>
                                                }
                                            />
                                            <CardContent>
                                                <Grid item xs={12} >
                                                    <Typography variant="body2" color="textSecondary" component="p">

                                                        {item?.body}
                                                    </Typography>

                                                </Grid>
                                                {i == messageDetail.length - 1 ? <Grid item xs={12} style={{ marginTop: '10px' }}>
                                                    <TextField style={{ width: '100%' }}
                                                        id="outlined-multiline-static"
                                                        label="Responder Mensaje"
                                                        multiline
                                                        rows={4}
                                                        variant="outlined"
                                                        onChange={event => setMessage(event.target.value)}
                                                    />
                                                </Grid> : <></>}
                                            </CardContent>
                                            {i == messageDetail.length - 1 ? <CardActions style={{ width: '100%' }}>
                                                <Grid item xs={12}>
                                                    <Grid container spacing={0} direction='row' justifyContent="flex-end">
                                                        <Box m={1}>
                                                            <Button variant="outlined" onClick={setBefore}>CANCELAR</Button>
                                                        </Box>
                                                        <Box m={1}>
                                                            <Button variant="contained" onClick={event => sendMessage(item.id)}>Enviar</Button>
                                                        </Box>

                                                    </Grid>
                                                </Grid>
                                            </CardActions> : <></>}

                                        </Card>
                                    </>
                                }))
                            }
                        </Grid> : <Grid item xs={12} className="mb-2">
                            <Card>
                                <Grid item xs={12} style={{ textAlign: 'center', margin: '30px' }}>
                                    <img src={CheckSvg} alt="check"></img>
                                    <CardHeader style={{ textAlign: 'center' }} title={
                                        <React.Fragment>
                                            <Typography
                                                variant="h4"
                                                component="h4"
                                                color="textPrimary"
                                            >
                                                Mensaje enviado
                                            </Typography>
                                        </React.Fragment>
                                    } />

                                    <CardContent style={{ textAlign: 'center' }}>
                                        <Grid item xs={12} >
                                            <Typography variant="body2" color="textSecondary" component="p">

                                                Tu mensaje fue enviado con éxito, pronto tendrás noticias del reclutador.
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
                    }
                </Grid>
            </Container>
        </>

    )
}
export default ApplicantMessageDetail;
