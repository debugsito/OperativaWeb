import React,{ useState,useEffect } from "react";

import { useDispatch, useSelector } from 'react-redux';
 import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";

import Col from 'react-bootstrap/Col'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'

import Button from '../components2/Button';
import ButtonGoBack from '../components2/ButtonGoBack';
import Container from '../components2/Container';
import MensajeSuccess from '../components2/MensajeSuccess';
import SubTitle from '../components2/SubTitle';
import Title from '../components2/Title';
import { Snackbar } from "@material-ui/core";

import IconBusiness from "../images2/page-register/icon-business-sm.svg";
import styles from "../styleshome/components_styles/Forms.module.scss";
import { setUserError, applicantSignUp } from '../../../store/actions/auth/auth.action';
import { isEmail } from '../../shared/libs/validators';
import MuiAlert from '@material-ui/lab/Alert';

const initialValue = {
    value: '',
    error: false,
    helperText: '',
    show: false,
    checked: false
}
const vertical = 'top'
const horizontal = 'right'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function Municipality(props) {

    const [step, setStep] = useState(0)
    const router = useHistory()
    const dispatch = useDispatch();
    const [hasError, setHasError] = useState('');
    const { error, signUpSucces } = useSelector((state) => state?.auth);
    const [open, setOpen] = useState(false);
    

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email es requerido')
            .email('Email is invalid'),
        password: Yup.string()
            .required('Contraseña es requerido')
            .min(6, 'La contraseña debe tener al menos 6 caracteres')
            .max(40, 'La contraseña no debe exceder los 40 caracteres'),
        confirm_password: Yup.string()
            .required('Contraseña es requerido')
            .min(6, 'La contraseña debe tener al menos 6 caracteres')
            .max(40, 'La contraseña no debe exceder los 40 caracteres'),
        isCheck: Yup.boolean()
            .isTrue(),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema)
    });


    useEffect(() => {
        if(signUpSucces){
            setStep(1)
        }

    },[signUpSucces])

    useEffect(() => {

        if(error){
            setOpen(true)
        }
        
    },[error])


    const onSubmit = (data) => {
        if(data){
            const body = {
                email: data.email,
                password: data.password,
                term_condi: data.isChecked === true ? 1 : 0
            }
            dispatch(applicantSignUp(body));
        }
    }

    const handleCloseAlert = () => {
        setOpen(false)
    }

    const content = <>
        <p className="text-gray">
            Para poder conectarte con tu trabajo ideal <b>Crea tu CV</b> en nuestra plataforma.
        </p>
        <p className="text-gray">
            Es <b>muy importante colocar tus datos actualizados</b>, así será más facil que las empresas puedan conectarse contigo.
        </p>
        <p className="text-gray">
            <b>Crear tu CV te tomará solo 5 minutos aproximadamente.</b>
        </p>
        <br></br>
    </>

    const terminosAndConditions = <a href="/terminos-y-condiciones" target="_blank" className="text-skyBlue">Acepto los Terminos & Condiciones y la Politica de privacidad</a>

    return (
        <Container navbar>
            {
                step === 0 &&
                <>
                    <ButtonGoBack />
                    <div className="d-flex">
                        <img src={IconBusiness} alt="icono" />
                        <SubTitle variant="dark">Registro para postulantes</SubTitle>
                    </div>
                    <p className="text-gray">Completa los siguientes campos para ser parte de Operativa.</p>
                    <div className={styles.containerForm}>
                        <p className="color-gray"><b>Datos del postulante</b> </p>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Row className="mt-3">
                                <Form.Group controlId="formGridEmail">
                                    <FloatingLabel label="Correo electrónico">
                                        <Form.Control type="email" placeholder="Correo electrónico" {...register("email")} isInvalid={!!errors.email} />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.email?.message}
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                </Form.Group>
                            </Row>
                            <Row className="mt-3">
                                <Form.Group controlId="formGridPassword">
                                    <FloatingLabel label="Contraseña">
                                        <Form.Control type="password" placeholder="Contraseña" {...register("password")} isInvalid={!!errors.password} />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.password?.message}
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                </Form.Group>
                            </Row>
                            <Row className="mt-3">
                                <Form.Group controlId="formGridConfirmPassword">
                                    <FloatingLabel label="Confirmar contraseña">
                                        <Form.Control type="password" placeholder="Confirmar contraseña" {...register("confirm_password")} isInvalid={!!errors.confirm_password} />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.confirm_password?.message}
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                </Form.Group>
                            </Row>

                            <Form.Group className="mt-3 mb-3">
                                <Form.Check type="checkbox" label={terminosAndConditions} {...register("isCheck")} isInvalid={!!errors.isCheck} />
                                <Form.Control.Feedback type="invalid">
                                    {errors.isCheck?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Row className="mt-5">
                                <Col xs={6} sm={6} md={{ span: 3, offset: 6 }}>
                                <Button variant="light" type="button"
                                onClick={() => router.goBack()}

                                >
                                Cancelar
                                </Button>
                                </Col>
                                <Col xs={6} sm={6} md={3}>
                                    <Button variant="primary" type="submit">
                                        Siguiente
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </>
            }
            {
                step === 1 &&
                <MensajeSuccess content={content} title={<TitleSuccess />}>
                    <Button variant="primary" type="button" onClick={() => router.push("/registro/postulante/datos-personales")}>Empezar</Button>
                </MensajeSuccess>
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
            <Title>Bienvenido a</Title>
            <Title variant="red">Operativa</Title>
        </>
    )
}
