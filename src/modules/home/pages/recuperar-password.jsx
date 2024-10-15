import { useHistory } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";

import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import FloatingLabel from 'react-bootstrap/FloatingLabel'

import Container from "../components2/Container";
import Button from "../components2/Button";

export default function RecuperarContrasena(props) {
    const router = useHistory()
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email es requerido'),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <Container navbar height="heightPorc">
            <div className="pb-3">
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <Col md={{ span: 5, offset: 3 }}>
                            <h2>Recupera tu contraseña</h2>
                            <p>Ingresa tu correo electrónico para recibir instrucciones de cómo restrablecer tu contraseña.</p>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col md={{ span: 5, offset: 3 }}>
                            <Form.Group controlId="formGridRazonSocial">
                                <FloatingLabel label="Correo electrónico">
                                    <Form.Control type="email" placeholder="Correo electrónico" {...register("email")} isInvalid={!!errors.email} />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email?.message}
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mt-5">
                        <Col xs={6} sm={6} md={{ span: 3, offset: 3 }}>
                            <Button variant="light" type="button" onClick={() => router.push("/")}>
                                CANCELAR
                            </Button>
                        </Col>
                        <Col xs={6} sm={6} md={3}>
                            <Button variant="primary" type="submit">
                                ACEPTAR
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </Container>
    )
}
