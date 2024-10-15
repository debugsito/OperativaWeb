import React from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";

import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from "../Button";
import FloatingLabel from 'react-bootstrap/FloatingLabel'

import styles from "../../styleshome/components_styles/FormRegister.module.scss";
import { useHistory } from "react-router-dom";


export default function FormRepresentante({ handleClickNext }) {
    const router = useHistory();

    const validationSchema = Yup.object().shape({
        first_name: Yup.string()
            .required('Nombre es requerido'),
        last_name: Yup.string()
            .required('Apellidos es requerido'),
        email: Yup.string()
            .required('Email es requerido')
            .email('Ingrese un email correcto'),
        cargo_input: Yup.string()
            .required('Cargo es requerido'),
        area_input: Yup.string()
            .required('Area es requerido'),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = (data) => {
        // console.log(data)
        handleClickNext(data)
    }

    return (
        <div className={styles.container}>
            <p className="color-gray"><b>Datos del representante</b> </p>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row className="mt-3">
                    <Form.Group controlId="formGridName">
                        <FloatingLabel label="Nombre">
                            <Form.Control type="text" placeholder="Nombre" {...register("first_name")} isInvalid={!!errors.first_name} />
                            <Form.Control.Feedback type="invalid">
                                {errors.first_name?.message}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>
                </Row>
                <Row className="mt-3">
                    <Form.Group controlId="formGridLastName">
                        <FloatingLabel label="Apellidos">
                            <Form.Control type="text" placeholder="Apellidos" {...register("last_name")} isInvalid={!!errors.last_name} />
                            <Form.Control.Feedback type="invalid">
                                {errors.last_name?.message}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>
                </Row>
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
                    <Form.Group controlId="formGridCargo">
                        <FloatingLabel label="Cargo">
                            <Form.Control type="text" placeholder="Cargo" {...register("cargo_input")} isInvalid={!!errors.cargo_input} />
                            <Form.Control.Feedback type="invalid">
                                {errors.cargo_input?.message}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>
                </Row>
                <Row className="mt-3">
                    <Form.Group controlId="formGridArea">
                        <FloatingLabel label="Área">
                            <Form.Control type="text" placeholder="Área" {...register("area_input")} isInvalid={!!errors.area_input} />
                            <Form.Control.Feedback type="invalid">
                                {errors.area_input?.message}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>
                </Row>
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
    )
}
