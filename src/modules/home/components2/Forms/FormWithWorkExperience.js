import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import Accordion from 'react-bootstrap/Accordion'
import FloatingLabel from 'react-bootstrap/FloatingLabel'

import Button from '../Button';
import CustomAccordion from './Boostrap/Accordion';
import ControllerCheckRadio from './Boostrap/ControllerCheckRadio';

import styles from "../../styleshome/components_styles/Forms.module.scss";

const inivitalValues = {
    is_working_here: false,
    job_name: "",
    business_name: "",
    address: "",
    rubro: "",
    start_date: "",
    end_date: "",
    prom_hours: "",
    salary: "",
    hasHoursExtras: "",
}

const OPTIONS_ONE = [
    { label: "Si", value: "si" },
    { label: "No", value: "no" },
]
const OPTIONS_TWO = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
]

export default function FormWorkExperience({ handleClickNext }) {

    const [activeId, setActiveId] = useState(0)


    const validationSchema = Yup.object().shape({
        workExperiences: Yup.array().of(
            Yup.object().shape({
                is_working_here: Yup.boolean(),
                job_name: Yup.string().required('Campo requerido'),
                business_name: Yup.string().required('Campo requerido'),
                address: Yup.string().required('Campo requerido'),
                rubro_id: Yup.string().required('Campo requerido'),
                start_date: Yup.string().required('Campo requerido'),
                end_date: Yup.string().required('Campo requerido'),
                prom_hours: Yup.string().required('Campo requerido'),
                salary: Yup.string().required('Campo requerido'),
                hasHoursExtras: Yup.string().required('Campo requerido'),
            })
        ),
    });

    const { register, control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            workExperiences: [inivitalValues]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "workExperiences"
    });

    const onSubmit = (data) => {
        console.log(data)
        handleClickNext(data)
    }

    const addAccordionItem = () => {
        append(inivitalValues)
        setActiveId(prevState => prevState + 1)
    }

    const handleClickAccordion = (eventKey) => {
        if (activeId === eventKey) {
            setActiveId(null);
        } else {
            setActiveId(eventKey);
        }
    }

    return (
        <div className="mt-3 mb-3">
            <Form onSubmit={handleSubmit(onSubmit)} novalidate>
                <CustomAccordion defaultActiveKey="0" activeKey={activeId + ""} flush>
                    {
                        fields.map((field, index) => {
                            const title = `Experiencia ${index + 1}`
                            return (
                                <Accordion.Item eventKey={index + ""} key={index}>
                                    <Accordion.Header onClick={() => handleClickAccordion(index)}>{title}</Accordion.Header>
                                    <Accordion.Body>
                                        <div className="p-3">
                                            {
                                                fields.length > 1 &&
                                                <Row className="mt-3">
                                                    <Col>
                                                        <div className={styles.delete}>
                                                            <span className={styles.text} onClick={() => { remove(index) }}>X ELIMINAR</span>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            }
                                            <Row className="mt-3">
                                                <Col xs={12} sm={12} md={6}>
                                                    <Form.Group>
                                                        <Form.Check
                                                            type="checkbox"
                                                            label="Actualmente trabajo aqui"
                                                            {...register(`workExperiences.${index}.is_working_here`)}
                                                            isInvalid={!!errors?.workExperiences?.[index]?.is_working_here}
                                                        />
                                                        <Form.Control.Feedback type="invalid">
                                                            {errors.workExperiences?.[index]?.is_working_here?.message}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={12} sm={12} md={6} className="mt-3">
                                                    <Form.Group>
                                                        <FloatingLabel label="Cargo">
                                                            <Form.Control type="text" placeholder="Cargo" {...register(`workExperiences.${index}.job_name`)} isInvalid={!!errors?.workExperiences?.[index]?.job_name} />
                                                        </FloatingLabel>
                                                        <Form.Control.Feedback type="invalid">
                                                            {errors.workExperiences?.[index]?.job_name?.message}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={12} sm={12} md={6} className="mt-3">
                                                    <Form.Group>
                                                        <FloatingLabel label="Empresa">
                                                            <Form.Control type="text" placeholder="Empresa" {...register(`workExperiences.${index}.business_name`)} isInvalid={!!errors?.workExperiences?.[index]?.business_name} />
                                                        </FloatingLabel>
                                                        <Form.Control.Feedback type="invalid">
                                                            {errors.workExperiences?.[index]?.business_name?.message}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={12} sm={12} md={6} className="mt-3">
                                                    <Form.Group>
                                                        <FloatingLabel label="Direccion de la empresa">
                                                            <Form.Control type="text" placeholder="Direccion de la empresa" {...register(`workExperiences.${index}.address`)} isInvalid={!!errors?.workExperiences?.[index]?.address} />
                                                        </FloatingLabel>
                                                        <Form.Control.Feedback type="invalid">
                                                            {errors.workExperiences?.[index]?.address?.message}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={12} sm={12} md={6} className="mt-3">
                                                    <Form.Group>
                                                        <FloatingLabel label="Seleccione Rubro">
                                                            <Form.Select
                                                                as='select'
                                                                {...register(`workExperiences.${index}.rubro_id`)}
                                                                isInvalid={!!errors?.workExperiences?.[index]?.rubro_id}
                                                            >
                                                                <option value="" selected disabled></option>
                                                                <option value="1">Primaria</option>
                                                                <option value="2">Secundaria</option>
                                                                <option value="3">Instituto</option>
                                                                <option value="4">Universidad</option>
                                                            </Form.Select>
                                                        </FloatingLabel>
                                                        <Form.Control.Feedback type="invalid">
                                                            {errors.workExperiences?.[index]?.rubro_id?.message}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={12} sm={12} md={6} className="mt-3">
                                                    <Form.Group>
                                                        <FloatingLabel label="Fecha de inicio">
                                                            <Form.Control
                                                                type="date"
                                                                id="start_date"
                                                                {...register(`workExperiences.${index}.start_date`)}
                                                                isInvalid={!!errors?.workExperiences?.[index]?.start_date} /
                                                            >
                                                        </FloatingLabel>
                                                        <Form.Control.Feedback type="invalid">{errors.workExperiences?.[index]?.start_date?.message}</Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={12} sm={12} md={6} className="mt-3">
                                                    <Form.Group>
                                                        <FloatingLabel label="Fecha de culminación">
                                                            <Form.Control type="date" id="end_date" {...register(`workExperiences.${index}.end_date`)} isInvalid={!!errors?.workExperiences?.[index]?.end_date} />
                                                        </FloatingLabel>
                                                        <Form.Control.Feedback type="invalid">{errors.workExperiences?.[index]?.end_date?.message}</Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={12} sm={12} md={6} className="mt-3">
                                                    <Form.Group>
                                                        <FloatingLabel label="Promedio de horas semanales">
                                                            <Form.Control type="text" placeholder="Promedio de horas semanales" {...register(`workExperiences.${index}.prom_hours`)} isInvalid={!!errors?.workExperiences?.[index]?.prom_hours} />
                                                        </FloatingLabel>
                                                        <Form.Control.Feedback type="invalid">
                                                            {errors.workExperiences?.[index]?.prom_hours?.message}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={12} sm={12} md={6} className="mt-3">
                                                    <Form.Group>
                                                        <FloatingLabel label="Ingreso mensual">
                                                            <Form.Control type="text" placeholder="Ingreso mensual" {...register(`workExperiences.${index}.salary`)} isInvalid={!!errors?.workExperiences?.[index]?.salary} />
                                                        </FloatingLabel>
                                                        <Form.Control.Feedback type="invalid">
                                                            {errors.workExperiences?.[index]?.salary?.message}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row className="mt-3">
                                                <Col xs={12} sm={12} md={6}>
                                                    <Form.Group>
                                                        <Form.Label><b>¿Trabajas horas extras?</b></Form.Label>
                                                        <div className="d-flex flex-row">
                                                            <ControllerCheckRadio radioArr={OPTIONS_ONE} name={`workExperiences.${index}.hasHoursExtras`} control={control} />
                                                        </div>
                                                        <div className="text-error" >
                                                            {errors.workExperiences?.[index]?.hasHoursExtras?.message}
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                            )
                        })
                    }
                </CustomAccordion>
                <div className={styles.append}>
                    <span className={styles.text} onClick={addAccordionItem}>+ AÑADIR EDUCATION</span>
                </div>
                <Row className="mt-5">
                    <Col xs={6} sm={6} md={{ span: 3, offset: 6 }}>
                        <Button variant="light" type="button">Salir</Button>
                    </Col>
                    <Col xs={6} sm={6} md={3}>
                        <Button variant="primary" type="submit">Siguiente</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}
