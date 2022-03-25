import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";

import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from '../Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel'

import styles from "../../styleshome/components_styles/Forms.module.scss";

const inivitalValues = {
    education_level: "",
    entity_name: "",
    start_date: "",
    finish_date: "",
}

export default function FormEducation({ handleClickNext }) {
    const validationSchema = Yup.object().shape({
        educations: Yup.array().of(
            Yup.object().shape({
                education_level: Yup.string().required('Campo requerido'),
                entity_name: Yup.string().required('Campo requerido'),
                start_date: Yup.string().required("Campo requerido").matches(/^\d+$/, "Ingrese solo numeros"),
                finish_date: Yup.string().required("Campo requerido").matches(/^[0-9]+$/, "Ingrese solo numeros"),
            })
        ),
    });

    const { register, control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            educations: [inivitalValues]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "educations"
    });

    const onSubmit = (data) => {
        console.log(data)
        handleClickNext(data)
    }

    return (
        <div className="mt-3 mb-3">
            <Form onSubmit={handleSubmit(onSubmit)}>
                {
                    fields.length > 0 && fields.map((field, index) => (
                        <div key={index} className={styles.containerForm}>
                            <Row>
                                <Col>
                                    <p className="color-gray"><b>Educación {index + 1}</b></p>
                                </Col>
                                {
                                    fields.length > 1 &&
                                    <Col>
                                        <div className={styles.delete}>
                                            <span className={styles.text} onClick={() => { remove(index) }}>X ELIMINAR</span>
                                        </div>
                                    </Col>
                                }
                            </Row>
                            <Row>
                                <Col xs={12} sm={12} md={6} className="mt-3">
                                    <Form.Group controlId="formGridLevelEducation">
                                        <FloatingLabel label="Nivel máximo alcanzado">
                                            <Form.Select as="select" {...register(`educations.${index}.education_level`)} isInvalid={!!errors?.educations?.[index]?.education_level}>
                                                <option value="" selected disabled></option>
                                                <option value="1">Primaria</option>
                                                <option value="2">Secundaria</option>
                                                <option value="3">Instituto</option>
                                                <option value="3">Universidad</option>
                                            </Form.Select>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.educations?.[index]?.education_level?.message}
                                            </Form.Control.Feedback>
                                        </FloatingLabel>
                                    </Form.Group>
                                </Col>
                                <Col xs={12} sm={12} md={6} className="mt-3">
                                    <Form.Group controlId="formGridLastName">
                                        <FloatingLabel label="Institucion educativa">
                                            <Form.Control type="text" placeholder="Institucion educativa" {...register(`educations.${index}.entity_name`)} isInvalid={!!errors?.educations?.[index]?.entity_name} />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.educations?.[index]?.entity_name?.message}
                                            </Form.Control.Feedback>
                                        </FloatingLabel>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} sm={12} md={6} className="mt-3">
                                    <Form.Group>
                                        <FloatingLabel label="Año de inicio">
                                            <Form.Control type="text" placeholder="Año de inicio" {...register(`educations.${index}.start_date`)} isInvalid={!!errors?.educations?.[index]?.start_date} />
                                            <Form.Text>Ejem: 2015</Form.Text>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.educations?.[index]?.start_date?.message}
                                            </Form.Control.Feedback>
                                        </FloatingLabel>
                                    </Form.Group>
                                </Col>
                                <Col xs={12} sm={12} md={6} className="mt-3">
                                    <Form.Group>
                                        <FloatingLabel label="Año de culminación">
                                            <Form.Control type="text" placeholder="Año de culminación" {...register(`educations.${index}.finish_date`)} isInvalid={!!errors?.educations?.[index]?.finish_date} />
                                            <Form.Text>Ejem: 2020</Form.Text>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.educations?.[index]?.finish_date?.message}
                                            </Form.Control.Feedback>
                                        </FloatingLabel>

                                    </Form.Group>
                                </Col>
                            </Row>
                        </div>
                    ))
                }
                <div className={styles.append}>
                    <span className={styles.text} onClick={() => { append(inivitalValues) }}>+ AÑADIR EDUCATION</span>
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
