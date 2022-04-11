import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container, Grid, makeStyles } from "@material-ui/core";
import { SessionRoutes } from "../../shared/libs/sessionRoutes";
import { useSelector, useDispatch } from "react-redux";
import { NavigateBefore } from "@material-ui/icons";
import '../styles/applicant-job-hunting.css';
import { caza1, caza2, caza3, banner, arrow } from '../../shared/images/postulant'
import { goldSvg, silverSvg, bronceSvg, woodSvg } from '../../shared/images/postulant/levels'
import '../styles/dots.css'
import { Button } from '@material-ui/core';
import  {storeJobHuntingAccount} from '../../../store/actions/applicant/applicant.midleware'


import { getApplicantJobHuntingActions } from "../../../store/actions/applicant/applicant.action";

const useStyles = makeStyles((theme) => ({
    applicantContainer: {
        background: '#f7f7f7',
        padding: '1rem',
    }
}))


const ApplicantJobHunting = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory()
    const initRoute = SessionRoutes().initRoute;
    const setBefore = () => {
        history.push(`${initRoute}`)
    };

    const { applicant: { applicantJobHuntingActions } } = useSelector(state => state);
    const items = [{ id: 1 }, { id: 2 }, { id: 3 }]

    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        getJobHuntingActions();
    }, []);

    const getJobHuntingActions = () => {
        dispatch(getApplicantJobHuntingActions())
    }

    const goStep = (i) => {
        setActiveStep(i);
    }

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const playJobHunting = async () => {
            await dispatch(storeJobHuntingAccount());
            setBefore();
    }

    const getImage = () => {
        switch (activeStep) {
            case 0:
                return caza1;
            case 1:
                return caza2;
            case 2:
                return caza3;
            default:
                return caza1;
        }
    }

    const getContent = () => {
        switch (activeStep) {
            case 0:
                return <>
                    <p className="cazatrabajo-text">
                        <span className="orange">Operativa</span>   es un universo amplio,
                        donde el amo del reino operativo <span className="purple">“Cesilius”</span>,
                        creó un universo alterno para ayudarte a encontrar el trabajo ideal.
                    </p>
                    <p className="cazatrabajo-text">
                        Para ello, debes realizar diversas acciones que te hará ganar puntos y subir niveles.
                    </p>

                    <img src={banner} alt="" style={{ width: '100%' }} />
                </>;
            case 1:
                return <>
                    <div className="container">
                        <div className="header">
                            <p className="cazatrabajo-text" style={{ marginBottom: '0px' }}>
                                Tu nivel actual es <span className="madera"> “Madera”</span> y a medida que completes estas acciones ganarás puntos que te harán de subir de nivel hasta llega a <span className="oro">“Oro”</span> .
                            </p>
                        </div>
                        <div className="body-text">
                            <ul className="cazatrabajo-text" style={{ marginTop: '0px' }}>
                                {applicantJobHuntingActions.map((item, i) => (<>
                                    <li id={`action-item-${i}`}>
                                        {item?.description}
                                    </li>
                                </>))}
                            </ul>

                        </div>


                    </div>
                </>;
            case 2:
                return <>
                    <div className="container">
                        <div className="header">
                            <p className="cazatrabajo-text">
                                Al final la temprada  los mejores Cazatrabajos tendrán los siguientes premios:
                            </p>
                        </div>
                        <div className="prizes">
                            <div className="prize-div">
                                <img src={goldSvg} alt="" width="19.98" height="17.72" />
                                <span className="purple size-big"> 1er premio</span>
                                <p className="cazatrabajo-text">Lorem ipsum lorem</p>
                            </div>
                            <div className="prize-div">
                                <img src={silverSvg} alt="" width="19.98" height="17.72" />
                                <span className="purple size-big"> 2er premio</span>
                                <p className="cazatrabajo-text">Lorem ipsum lorem</p>
                            </div>
                            <div className="prize-div">
                                <img src={bronceSvg} alt="" width="19.98" height="17.72" />
                                <span className="purple size-big"> 3er premio</span>
                                <p className="cazatrabajo-text">Lorem ipsum lorem</p>
                            </div>
                            <div className="prize-div">
                                <img src={bronceSvg} alt="" width="19.98" height="17.72" />
                                <span className="purple size-big"> La fotuna del cazador</span>
                            </div>
                            <div className="prize-div"
                            style={{paddingLeft: '10px',paddingRight : '10px', paddingTop:'20px'}}
                            >
                                <p className="cazatrabajo-text">Los mejores 200 puntajes ingresan a un sorteo de Lorem ipsum lorem </p>
                            </div>

                            <div className="prize-div center">
                                <Button className="buttonJobHunting" onClick={playJobHunting}>¡Da click aqui y comienza a jugar ya!</Button>
                            </div>

                        </div>

                    </div>




                </>;
            default:
                return <></>;
        }
    }

    return (
        <Container className={classes.applicantContainer}>
            <Grid container spacing={0}>
                <Grid item xs={12} className="header-cazatrabajo">
                    {/* <a className="btn-logout">
                        <NavigateBefore onClick={setBefore} />
                    </a> */}
                    <img src={arrow} alt="" onClick={setBefore} />
                    <div className="header-title-job">
                        <h1 style={{ color: '#5D5FEF' }}> El juego del cazatrabajo</h1>

                    </div>

                </Grid>
                <Grid container spacing={0}>
                    <img src={getImage()} alt="" style={{ width: '100%' }} />
                    <Grid item xs={12} container justifyContent="center" alignItems="center">
                        <nav className="carousel">

                            {items.map((item, i) => (
                                <>
                                    <input id={`carousel-item-${i}`} key={`carousel-input-${item.id}`} type="radio" name="carousel-dots" onChange={event => goStep(i)} checked={(i == activeStep) ? true : false} />
                                    <label for={`carousel-item-${i}`} key={`carousel-label-${item.id}`} onClick={event => goStep(i)} >Go to item {i}</label>
                                </>
                            ))}
                        </nav>
                    </Grid>
                </Grid>
                <Grid container spacing={0}>
                    {getContent()}
                </Grid>
            </Grid>

        </Container>

    )
}

export default ApplicantJobHunting;