

import React, { useState, useEffect } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import MensajeSuccess from '../components2/MensajeSuccess';
import Container from '../components2/Container';
import Title from '../components2/Title';
import Button from '../components2/Button';
import ButtonGoForward from "../components2/ButtonGoForward";
import { makeStyles, Grid } from '@material-ui/core';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Doughnut } from 'react-chartjs-2';



const useStyle = makeStyles(theme => ({
    // buttonInlines : {
    //     display :'flex',
    //     flexDirection: 'row',
    //     alignItems : 'center',
    // }
}))


export default function FinishCVStatus(props) {
    const router = useHistory()
    const classes = useStyle()
    const { user } = useSelector(state => state?.auth);
    const [dataCv, setDataCv] = useState(null)
    const [dataCuestionario, setDataCuestionario] = useState(null)

    const content = <>
        <p className="text-gray">
            Recuerdo que llenar el cuestionario para posicionarte dentro del ranking del los <b>20 mejores postulantes</b>.
        </p>
        <br></br>
    </>

    useEffect(() => {
        if (user?.account?.user) {
            setDataCv({
                labels: ["Completado", "No Completado"],
                datasets: [
                    {
                        label: '# of Votes',
                        data: [user.account.cv_percent, 100 - user.account.cv_percent],
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
                text: user.account.cv_percent + "%"
            })
            setDataCuestionario({
                labels: ["Completado", "No Completado"],
                datasets: [
                    {
                        label: '# of Votes',
                        data: [user.account.questionnaire_percent, 100 - user.account.questionnaire_percent],
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
                ext: user.account.questionnaire_percent + "%"
            })
        }
    }, [user])

    return <Container navbar>
        <MensajeSuccess content={content} title={<TitleSuccess />}>
            <ButtonGoForward text={"Ir a la plataforma"} url={'/'} />
            <br />
            <br />
            <Row xs={6}>
                {dataCv &&
                    <Grid item xs={3} >
                        <div className="card-cv" style={{ textAlign: 'center' }}>
                            <span className="span-flex"><b>Tu CV</b></span>
                            <Doughnut className="donut" data={dataCv} />
                            <div>
                                <span><b>{user.account.cv_percent} %</b></span>
                            </div>
                        </div>
                    </Grid>}
                {dataCuestionario &&
                    <Grid item xs={3} >
                        <div className="card-cv" style={{ textAlign: 'center' }}>
                            <span className="span-flex"><b>Cuestionario</b></span>
                            <Doughnut className="donut" data={dataCuestionario} />
                            <div>
                                <span><b>{user.account.questionnaire_percent} %</b></span>
                            </div>
                        </div>
                    </Grid>}
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