import { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';

import Button from '../components2/Button';
import ButtonGoBack from '../components2/ButtonGoBack';
import Container from '../components2/Container';
import FormRepresentante from '../components2/Forms/FormRepresentante';
import FormEntity from '../components2/Forms/FormEntity';
import MensajeSuccess from '../components2/MensajeSuccess';
import SubTitle from '../components2/SubTitle';
import Title from '../components2/Title';
import IconBusiness from "../images2/page-register/icon-business-sm.svg";
import service_CompanySignUp from "../../../store/services/auth/companySignUp.service";
import styles from "../styleshome/components_styles/Empresa.module.scss";
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar } from "@material-ui/core";



const vertical = 'top'
const horizontal = 'right'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function Empresa(props) {
    const [step, setStep] = useState(0)
    const [data, setData] = useState({})
    const router = useHistory()
    const [error,setError] = useState(null)
    const [open, setOpen] = useState(false);

    const handleClickNext = (values) => {
        setStep(statePrev => statePrev + 1)
        setData({ ...data, ...values })
    }

    const handleFinish = async (values) => {
        const body = { ...values, ...data }
        try {
            let response = await service_CompanySignUp(JSON.stringify(body))
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
                            <SubTitle variant="dark">Registro para empresa</SubTitle>
                        </div>
                        <p className="text-gray">Completa los siguientes campos para ser parte de Operativa.</p>
                        {step === 0 && <FormRepresentante handleClickNext={handleClickNext} />}
                        {step === 1 && <FormEntity entity="empresa" handleClickNext={handleFinish} />}
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
            <Title variant="dark">¡Genial! ya</Title>
            <Title variant="dark">estas registrado</Title>
        </>
    )
}