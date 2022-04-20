

import { useHistory } from "react-router-dom";
import MensajeSuccess from '../components2/MensajeSuccess';
import Container from '../components2/Container';
import Title from '../components2/Title';
import Button from '../components2/Button';
import ButtonGoForward from "../components2/ButtonGoForward";
import { makeStyles } from '@material-ui/core';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const useStyle = makeStyles(theme => ({
    // buttonInlines : {
    //     display :'flex',
    //     flexDirection: 'row',
    //     alignItems : 'center',
    // }
}))


export default function FinishCV(props) {
    const router = useHistory()
    const classes = useStyle()

    const content = <>
        <p className="text-gray">
            A continuación completa el cuestionario para posicionarte dentro del ranking de los  <b>20 mejores postulantes</b>.
        </p>
        <p className="text-gray">
            No es un examen , así que siéntate en confianza y response con total libertad.
        </p>
        <br></br>
    </>

    return <Container navbar>
        <MensajeSuccess content={content} title={<TitleSuccess />}>
            <Row  xs={6} md={3}>
                <Col xs={6} sm={6} md={2}>
                    <Button variant="primary" type="button" onClick={() => router.push("/finish-cv-status")}>Sigamos</Button>
                </Col>
                <Col xs={6} sm={6} >
                    <ButtonGoForward text={"Lo haré luego"} url={'/'} />
                </Col>
            </Row>
        </MensajeSuccess>
    </Container>


}

function TitleSuccess(props) {

    return (
        <>
            <Title>!Genial! ya</Title>
            <Title >create tu CV</Title>
        </>
    )
}