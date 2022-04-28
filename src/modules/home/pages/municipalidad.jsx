import { useState, useEffect } from "react";
 
 import { useHistory } from "react-router-dom";
import Container from '../components2//Container';
import ButtonGoBack from '../components2//ButtonGoBack';
import FormRepresentante from '../components2//Forms/FormRepresentante';
import FormEntity from '../components2//Forms/FormEntity';
import SubTitle from '../components2//SubTitle';
import MensajeSuccess from '../components2//MensajeSuccess';
import Title from '../components2//Title';
import Button from '../components2//Button';

import IconBusiness from "../images2/page-register/icon-business-sm.svg";
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar } from "@material-ui/core";
import service_MunicipalitySignUp from "../../../store/services/auth/municipalitySignUp.service";

// import styles from "../styleshome/components_styles/Empresa.module.scss";


const vertical = 'top'
const horizontal = 'right'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function Municipality(props) {
    const [step, setStep] = useState(0)
    const [data, setData] = useState({})
    const [error,setError] = useState(null)
    const [open, setOpen] = useState(false);
    const router = useHistory()

    const handleClickNext = (values) => {
        setStep(statePrev => statePrev + 1)
        setData({ ...data, ...values })
    }

    const handleFinish = async (values) => {
        const body = { ...values, ...data }
        try {
            let response = await service_MunicipalitySignUp(JSON.stringify(body))
            if (response.data) {
                setStep(statePrev => statePrev + 1)
            }
        } catch (error) {
            if (error.response.status === 401) {
                setError(error.response.data.message);
            } else {
                setError("Ha ocurrido un error interno.");
            };
        }
    }

    const handleCloseAlert = () => {
        setOpen(false)
    }

    useEffect(() => {
        if(error){
            setOpen(true)
        }
    },[error])

    const content = <>
        <p className="text-gray">
            La solicitud ha sido enviada para su aprobación, en un plazo máximo de 24 horas recibirá un correo con la contraseña de su usuario.
        </p>
        <p className="text-gray">
            En caso de presentar algún inconveniente no dude en comunicarse con nosotros a través del correo <a href="mailto:soporte@verificativa.com"><b>soporte@verificativa.com</b></a>
        </p>
        <br></br>
    </>

    return (
        <Container navbar>
            {
                step === 2 ?
                    <MensajeSuccess title={<TitleSuccess />} content={content}>
                        <Button variant="primary" type="button" onClick={() => router.push("/")}>Volver al inicio</Button>
                    </MensajeSuccess>
                    :
                    <>
                        <ButtonGoBack />
                        <div className="d-flex">
                            <img src={IconBusiness} alt="icono" />
                            <SubTitle variant="dark">Registro para municipalidad</SubTitle>
                        </div>
                        <p className="text-gray">Completa los siguientes campos para ser parte de Operativa.</p>
                        {step === 0 && <FormRepresentante handleClickNext={handleClickNext} />}
                        {step === 1 && <FormEntity entity="municipalidad" handleClickNext={handleFinish} />}
                    </>
            }
              <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="error">
                    {error}
                </Alert>
            </Snackbar>

        </Container>
    )
}


function TitleSuccess(props) {

    return (
        <>
            <Title>¡Genial! ya</Title>
            <Title>estás registrado</Title>
        </>
    )
}
