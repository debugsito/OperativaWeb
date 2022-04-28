import React, { useEffect } from 'react'
// import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";

import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from "../Button";
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import { useDispatch, useSelector } from 'react-redux';

import styles from "../../styleshome/components_styles/FormRegister.module.scss";
import { useHistory } from "react-router-dom";
import { actions_Utils } from '../../../../store/actions';

export default function FormEntity({ handleClickNext, entity }) {
    const { utils: { items, plans, districtsLima } } = useSelector(state => state);
    const router = useHistory();
    const dispatch = useDispatch();

    const validationSchema = Yup.object().shape({
        razon_social: Yup.string()
            .required('Razon Social es requerido'),
        document_number: Yup.string()
            .min(11, "RUC debe ser 11 digitos")
            .max(11, "RUC debe ser 11 digitos")
            .matches(/^\d+$/, "Ingrese solo numeros")
            .required('RUC es requerido'),
        phone: Yup.string()
            .required('Telefono es requerido'),
        plan_id: (entity === "empresa" ?
            Yup.number().required('Plan requerido') : undefined),
        interest_rubro_id: (entity === "empresa" ?
            Yup.number().required('Rubro es requerido') : undefined),
        district_id: (entity === "municipalidad" ?
            Yup.string().required('Distrito es requerido') : undefined),
        isCheck: Yup.boolean()
            .isTrue(),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = (data) => {
        handleClickNext(data)
    }

    useEffect(() => {
        dispatch(actions_Utils.getItems())
        dispatch(actions_Utils.getListPlans())
        dispatch(actions_Utils.getDistrictsLima())
    }, [])

    const terminosAndConditions = <a href="/terminos-y-condiciones" target="_blank" className="text-skyBlue">Acepto los Terminos & Condiciones y la Politica de privacidad</a>

    return (
        <div className={styles.container}>
            <Form onSubmit={handleSubmit(onSubmit)}>
                {entity === "empresa" &&
                    <>
                        <p className="color-gray"><b>Plan Deseado</b></p>

                        <Row className="mt-3">
                            <Form.Group controlId="formGridPlan">
                                <FloatingLabel label="Plan">
                                    <Form.Select placeholder="Plan" {...register("plan_id")} isInvalid={!!errors.plan_id}>
                                        {plans.length > 0 && plans.map(element =>
                                            <option key={element.id} value={element.id}>{element.name}</option>
                                        )}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.plan_id?.message}
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Form.Group>
                        </Row>
                    </>
                }


                <p className="color-gray"><b>Datos de la {entity}</b></p>

                <Row className="mt-3">
                    <Form.Group controlId="formGridRazonSocial">
                        <FloatingLabel label="Razón social">
                            <Form.Control type="text" placeholder="Razón social" {...register("razon_social")} isInvalid={!!errors.razon_social} />
                            <Form.Control.Feedback type="invalid">
                                {errors.razon_social?.message}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>
                </Row>
                <Row className="mt-3">
                    <Form.Group controlId="formGridRuc">
                        <FloatingLabel label="RUC">
                            <Form.Control type="text" placeholder="RUC" {...register("document_number")} isInvalid={!!errors.document_number} />
                            <Form.Control.Feedback type="invalid">
                                {errors.document_number?.message}
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
                                    <Form.Select placeholder="Distrito" {...register("district_id")} isInvalid={!!errors.district_id} >
                                        {districtsLima.length > 0 && districtsLima.map(element =>
                                            <option key={element.id} value={element.id}>{element.name}</option>
                                        )}
                                    </Form.Select>
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
                                    <Form.Select placeholder="Rubro" {...register("interest_rubro_id")} isInvalid={!!errors.interest_rubro_id}>
                                        {items.length > 0 && items.map(element =>
                                            <option key={element.id} value={element.id}>{element.name}</option>
                                        )}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.interest_rubro_id?.message}
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
