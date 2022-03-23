import React from 'react'
// import Link from "next/link";
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

export default function FormEntity({ handleClickNext, entity }) {
    const router = useHistory();

    const validationSchema = Yup.object().shape({
        razonsocial: Yup.string()
            .required('Razon Social es requerido'),
        ruc: Yup.string()
            .min(11, "RUC debe ser 11 digitos")
            .max(11, "RUC debe ser 11 digitos")
            .matches(/^\d+$/, "Ingrese solo numeros")
            .required('RUC es requerido'),
        phone: Yup.string()
            .required('Telefono es requerido'),
        rubro: (entity === "empresa" ?
            Yup.string().required('Rubro es requerido') : undefined),
        district_id: (entity === "municipalidad" ?
            Yup.string().required('Distrito es requerido') : undefined),
        isCheck: Yup.boolean()
            .isTrue(),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = (data) => {
        console.log(data)
        handleClickNext(data)
    }
    console.log("router", window.location)

    const terminosAndConditions = <a href="/terminos-y-condiciones" target="_blank" className="text-skyBlue">Acepto los Terminos & Condiciones y la Politica de privacidad</a>

    return (
        <div className={styles.container}>
            <p className="color-gray"><b>Datos de la {entity}</b></p>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row className="mt-3">
                    <Form.Group controlId="formGridRazonSocial">
                        <FloatingLabel label="Razón social">
                            <Form.Control type="text" placeholder="Razón social" {...register("razonsocial")} isInvalid={!!errors.razonsocial} />
                            <Form.Control.Feedback type="invalid">
                                {errors.razonsocial?.message}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>
                </Row>
                <Row className="mt-3">
                    <Form.Group controlId="formGridRuc">
                        <FloatingLabel label="RUC">
                            <Form.Control type="text" placeholder="RUC" {...register("ruc")} isInvalid={!!errors.ruc} />
                            <Form.Control.Feedback type="invalid">
                                {errors.ruc?.message}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>
                </Row>
                <Row className="mt-3">
                    <Form.Group controlId="formGridPhone">
                        <FloatingLabel label="Teléfono">
                            <Form.Control type="text" placeholder="Teléfono" {...register("phone")} isInvalid={!!errors.phone} />
                            <Form.Control.Feedback type="invalid">
                                {errors.phone?.message}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>
                </Row>
                {
                    entity === "municipalidad" ?
                        <Row className="mt-3">
                            <Form.Group controlId="formGridDistrict">
                                <FloatingLabel label="Distrito">
                                    <Form.Control type="text" placeholder="Distrito" {...register("district_id")} isInvalid={!!errors.district_id} />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.district_id?.message}
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Form.Group>
                        </Row>
                        :
                        <Row className="mt-3">
                            <Form.Group controlId="formGridRubro">
                                <FloatingLabel label="Rubro">
                                    <Form.Control type="text" placeholder="Rubro" {...register("rubro")} isInvalid={!!errors.rubro} />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.rubro?.message}
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Form.Group>
                        </Row>
                }
                <Form.Group className="mt-3 mb-3">
                    <Form.Check type="checkbox" label={terminosAndConditions} {...register("isCheck")} isInvalid={!!errors.isCheck} />
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
    )
}
