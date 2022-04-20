// import Link from 'next/link'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { logIn } from "../../../../store/actions/auth/auth.middleware";

import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from "../Button";

export default function FormLogin({ closeModal }) {
    const dispatch = useDispatch();
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email es requerido')
            .email('Email incorrecto'),
        password: Yup.string()
            .required('Password es requerido')
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = (data) => {
        dispatch(logIn(data));
        closeModal()
    }

    return (
        <>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row className="mt-3">
                    <Form.Group controlId="formGridEmail">
                        <Form.Control type="email" placeholder="Correo electrónico" {...register("email")} isInvalid={!!errors.email} />
                    </Form.Group>
                </Row>
                <Row className="mt-3">
                    <Form.Group controlId="formGridPassword">
                        <Form.Control type="password" placeholder="Contraseña" {...register("password")} isInvalid={!!errors.password} />
                    </Form.Group>
                </Row>

                <Form.Group className="mt-3 mb-3">
                    <Form.Check type="checkbox" label="Mantener iniciada la sesión" {...register("isCheck")} />
                </Form.Group>

                <Row>
                    <Col xs={6} sm={6}>
                        <Button variant="light" type="button" onClick={closeModal}>
                            Cancelar
                        </Button>
                    </Col>
                    <Col xs={6} sm={6}>
                        <Button variant="primary" type="submit">
                            Ingresar
                        </Button>
                    </Col>
                </Row>

                <Row className="mt-3">
                    {/* <Link > */}
                        <a href="/recuperar-password" className="text-skyBlue text-center">¿Olvidaste tu contraseña?</a>
                    {/* </Link> */}
                </Row>
                <Row className="mt-3">
                    {/* <Link > */}
                        <a href="/registro" className="text-skyBlue text-center">¿No eres miembro? Regístrate</a>
                    {/* </Link> */}
                </Row>
            </Form>
        </>
    )
}
