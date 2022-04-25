

import React, { useState, useEffect } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import MensajeSuccess from '../components2/MensajeSuccess';
import Container from '../components2/Container';
import Title from '../components2/Title';
import ButtonGoForward from "../components2/ButtonGoForward";
import { makeStyles, Grid } from '@material-ui/core';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Doughnut } from 'react-chartjs-2';
import { Button } from '../../shared/components';
import CheckIcon from '@material-ui/icons/Check';



const useStyle = makeStyles(theme => ({
    buttonDonut: {
        // padding: '16px 32px',
        position: 'absolute',
        borderRadius: '30px',
        fontweight: 'bold',
        fontSize: '14px',
        bottom: '-11%',
        fontWeight: '700',
        textTransform: 'none',
        width: '80%',
    },
    colorGrey: {
        backgroundColor: '#AEAEAE',
        "&:hover": {
            background: "#AEAEAE"
        },
    }
}))





export default function FinishCVStatus(props) {
    const router = useHistory()
    const classes = useStyle()
    const { user } = useSelector(state => state?.auth);
    const [dataCv, setDataCv] = useState({
        labels: ["Completado", "No Completado"],
        datasets: [
            {
                label: '# of Votes',
                data: [0, 100 - 0],
                backgroundColor: [
                    '#4E51FE',
                    '#EAEAEA',
                ],
                borderColor: [
                    '#4E51FE',
                    '#EAEAEA',
                ],
                borderWidth: 1,
            },
        ],
        text: 0 + "%"
    })
    const [dataCuestionario, setDataCuestionario] = useState({
        labels: ["Completado", "No Completado"],
        datasets: [
            {
                label: '# of Votes',
                data: [0, 100 - 0],
                backgroundColor: [
                    '#4E51FE',
                    '#EAEAEA',
                ],
                borderColor: [
                    '#4E51FE',
                    '#EAEAEA',
                ],
                borderWidth: 1,
            },
        ],
        ext: 0 + "%"
    })
    const [percentCV, setPercentCV] = useState(0)
    const [percentQuestionnaire, setpercentQuestionnaire] = useState(0)

    const content = <>
        <p className="text-gray">
            Recuerdo que llenar el cuestionario para posicionarte dentro del ranking del los <b>20 mejores postulantes</b>.
        </p>
        <br></br>
    </>

    const  completeButton =() => {
        return (
            <Button className={classes.buttonDonut + " " + classes.colorGrey} variant="contained" size="large"
                startIcon={<CheckIcon />}
            >Completo</Button>
        )
    }

    const missingButton = (route,text) => {
        return (
            <Button className={classes.buttonDonut} variant="contained" size="large" 
            onClick={(e)=> router.push(route)}
            >{text}</Button>
        )
    }

    useEffect(() => {

        let percent = user?.account?.cv_percent ? user?.account?.cv_percent : 0;
        // let percent = 100
        setPercentCV(percent)
        let percent_quest = user?.account?.questionnaire_percent ? user?.account?.questionnaire_percen : 0
        setpercentQuestionnaire(percent_quest)
        setDataCv({
            labels: ["Completado", "No Completado"],
            datasets: [
                {
                    label: '# of Votes',
                    data: [percent, 100 - percent],
                    backgroundColor: [
                        '#4E51FE',
                        '#EAEAEA',
                    ],
                    borderColor: [
                        '#4E51FE',
                        '#EAEAEA',
                    ],
                    borderWidth: 1,
                },
            ],
            text: percent + "%"
        })
        setDataCuestionario({
            labels: ["Completado", "No Completado"],
            datasets: [
                {
                    label: '# of Votes',
                    data: [percent_quest, 100 - percent_quest],
                    backgroundColor: [
                        '#4E51FE',
                        '#EAEAEA',
                    ],
                    borderColor: [
                        '#4E51FE',
                        '#EAEAEA',
                    ],
                    borderWidth: 1,
                },
            ],
            ext: percent_quest + "%"
        })

    }, [user])

    return <Container navbar >
        <MensajeSuccess content={content} title={<TitleSuccess />}>
            <ButtonGoForward text={"Ir a la plataforma"} url={'/'} />
            <br />
            <br />
            <Row xs={8}>

                <Grid item xs={4} >
                    <div className="card-cv" style={{ textAlign: 'center', position: 'relative', padding: '2rem', width: '100%' }}>
                        <span className="span-flex"><b>Tu CV</b></span>
                        <Doughnut className="donut" data={dataCv} />
                        <div>
                            <span><b>{percentCV} %</b></span>
                        </div>
                        {
                            percentCV == 100 ?
                                completeButton()
                                : missingButton('/registro/postulante/datos-personales','Llenar cv')
                        }
                    </div>
                </Grid>

                <Grid item xs={4} >
                    <div className="card-cv" style={{ textAlign: 'center', position: 'relative', padding: '2rem', width: '100%' }}>
                        <span className="span-flex"><b>Cuestionario</b></span>
                        <Doughnut className="donut" data={dataCuestionario} />
                        <div>
                            <span><b>{percentQuestionnaire} %</b></span>
                        </div>
                        {
                            percentQuestionnaire == 100 ?
                                completeButton()
                                : missingButton('/registro/postulante/cuestionario','Llenar cuestionario')
                        }
                    </div>
                </Grid>
            </Row>
        </MensajeSuccess>
    </Container>


}

function TitleSuccess(props) {

    return (
        <>
            <Title>Este es tu avance</Title>
            <Title >hasta ahora</Title>
        </>
    )
}