import React from 'react'
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";

import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import CheckRadio from './Boostrap/CheckRadio';
import ControllerCheckRadio from './Boostrap/ControllerCheckRadio';
import Button from '../Button';

import styles from "../../styleshome/components_styles/Forms.module.scss";

const OPTIONS = [
    { label: "Si", value: "si" },
    { label: "No", value: "no" },
]


export default function FormWithoutWorkExperience({ handleClickNext }) {
    const validationSchema = Yup.object().shape({
        hasVolunteered: Yup.string().required('Campo es requerido'),
        rotativeScheludes: Yup.string().required('Campo es requerido'),
        hoursExtras: Yup.string().required('Campo es requerido'),
        wekeends: Yup.string().required('Campo es requerido'),

    });

    const { handleSubmit, formState: { errors }, control } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = (data) => {
        console.log(data)
        handleClickNext(data)
    }


    return (
        <div className="mt-3 mb-3">
            <Form onSubmit={handleSubmit(onSubmit)} novalidate>
                <div className={styles.containerForm}>
                    <Row className="mt-3">
                        <Col>
                            <Form.Group>
                                <Form.Label><b>¿Haz realizado algun tipo de voluntariado?</b></Form.Label>
                                <div className="d-flex flex-row">
                                    <ControllerCheckRadio radioArr={OPTIONS} name="hasVolunteered" control={control} />
                                </div>
                                <div className="text-error" >
                                    {errors.hasVolunteered?.message}
                                </div>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label><b>¿Cuenta con disponibilidad para trabajar en horarios rotativos?</b></Form.Label>
                                <div className="d-flex flex-row">
                                    <ControllerCheckRadio radioArr={OPTIONS} name="rotativeScheludes" control={control} />
                                </div>
                                <div className="text-error" >
                                    {errors.rotativeScheludes?.message}
                                </div>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>
                            <Form.Group>
                                <Form.Label><b>¿Cuenta con disponibilidad para trabajar horas extras?</b></Form.Label>
                                <div className="d-flex flex-row">
                                    <ControllerCheckRadio radioArr={OPTIONS} name="hoursExtras" control={control} />
                                </div>
                                <div className="text-error" >
                                    {errors.hoursExtras?.message}
                                </div>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>
                            <Form.Group>
                                <Form.Label><b>¿Cuenta con disponibilidad para trabajar lo fines de semana?</b></Form.Label>
                                <div className="d-flex flex-row">
                                    <ControllerCheckRadio radioArr={OPTIONS} name="wekeends" control={control} />
                                </div>
                                <div className="text-error" >
                                    {errors.wekeends?.message}
                                </div>
                            </Form.Group>
                        </Col>
                    </Row>
                </div>
                <Row className="mt-5">
                    <Col xs={6} sm={6} md={{ span: 3, offset: 6 }}>
                        <Button variant="light" type="button"> Salir </Button>
                    </Col>
                    <Col xs={6} sm={6} md={3}>
                        <Button variant="primary" type="submit">Siguiente</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}
