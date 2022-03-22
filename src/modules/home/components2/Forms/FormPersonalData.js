import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Button from '../Button';

import styles from "../../styleshome/components_styles/Forms.module.scss";
import { useHistory } from "react-router-dom";

export default function FormPersonalData({ handleClickNext }) {
    const router = useHistory();

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Nombre es requerido'),
        lastname: Yup.string().required('Apellido es requerido'),
        doc_type: Yup.string().required("Campo requerido"),
        doc: Yup.string().required('Campo es requerido').matches(/^\d+$/, "Ingrese solo numeros")
            .when("doc_type", {
                is: "dni",
                then: Yup.string()
                    .min(8, "DNI debe ser 8 digitos")
                    .max(8, "DNI debe ser 8 digitos"),
            }).when("doc_type", {
                is: "ruc",
                then: Yup.string()
                    .min(11, "RUC debe ser 11 digitos")
                    .max(11, "RUC debe ser 11 digitos"),
            }),
        birthday: Yup.string().required("Fecha de cumpleaños es requerido"),
        gender: Yup.string().required("Genero es requerido"),
        select: Yup.string().required("Campo requerido"),
        department_id: Yup.string().required("Seleccione departamento"),
        province_id: Yup.string().required("Seleccione province"),
        district_id: Yup.string().required("Seleccione distrito"),
        address: Yup.string().required("Dirección es requerido"),
        reference: Yup.string().required("Referencia es requerido"),
        phone: Yup.string().required("Telefono es requerido"),
        civil_status: Yup.string().required("Estado civil es requerido"),
        rubro_interest_id: Yup.string().required("Rubro de interes es requerido"),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = (data) => {
        console.log(data)
        handleClickNext(data)
    }

    return (
        <div className={`${styles.containerForm} mt-4`}>
            <p className="color-gray"><b>Datos personales</b> </p>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col xs={12} sm={12} md={6} className="mt-3">
                        <Form.Group>
                            <FloatingLabel label="Nombres">
                                <Form.Control type="text" placeholder="Nombres" {...register("name")} isInvalid={!!errors.name} />
                                <Form.Control.Feedback type="invalid">
                                    {errors.name?.message}
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>
                    </Col>
                    <Col xs={12} sm={12} md={6} className="mt-3">
                        <Form.Group>
                            <FloatingLabel label="Apellidos">
                                <Form.Control type="text" placeholder="Apellidos" {...register("lastname")} isInvalid={!!errors.lastname} />
                                <Form.Control.Feedback type="invalid">
                                    {errors.lastname?.message}
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={12} md={3} className="mt-3">
                        <Form.Group>
                            <FloatingLabel label="Tipo doc">
                                <Form.Select as="select" {...register("doc_type")} isInvalid={!!errors.doc_type}>
                                    <option value="" selected disabled></option>
                                    <option value="dni">DNI</option>
                                    <option value="ruc">RUC</option>
                                    <option value="passport">PASAPORTE</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    {errors.doc_type?.message}
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>
                    </Col>
                    <Col xs={12} sm={12} md={3} className="mt-3">
                        <Form.Group>
                            <FloatingLabel label="Nro de doc">
                                <Form.Control type="text" placeholder="Nro de doc." {...register("doc")} isInvalid={!!errors.doc} />
                                <Form.Control.Feedback type="invalid">
                                    {errors.doc?.message}
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>
                    </Col>
                    <Col xs={12} sm={12} md={6} className="mt-3">
                        <Form.Group>
                            <FloatingLabel label="Fecha de nacimiento">
                                <Form.Control type="date" placeholder="Fecha de nacimiento" {...register("birthday")} isInvalid={!!errors.birthday} />
                                <Form.Control.Feedback type="invalid">
                                    {errors.birthday?.message}
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col xs={12} sm={12} md={6}>
                        <Form.Group>
                            <FloatingLabel label="Género">
                                <Form.Select as="select" {...register("gender")} isInvalid={!!errors.gender} >
                                    <option value="" selected disabled></option>
                                    <option value="1">Masculino</option>
                                    <option value="2">Femenino</option>
                                    <option value="3">Otro</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    {errors.gender?.message}
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col xs={12} sm={12} md={6}>
                        <Form.Group>
                            <Form.Label>¿Cómo te enteraste de operativa?</Form.Label>
                            <Form.Select as="select" {...register("select")} isInvalid={!!errors.select}>
                                <option value="" selected disabled>Selecciona</option>
                                <option value="1">Redes sociales</option>
                                <option value="2">Radio</option>
                                <option value="3">TV</option>
                                <option value="4">Facebook</option>
                                <option value="4">Instituto</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {errors.select?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <p className="color-gray"><b>Datos de contacto</b> </p>
                </Row>
                <Row>
                    <Col xs={12} sm={12} md={4} className="mt-3">
                        <Form.Group>
                            <Form.Label>Seleccione Departamento</Form.Label>
                            <Form.Select as="select" {...register("department_id")} isInvalid={!!errors.department_id}>
                                <option value="" selected disabled>Departamento</option>
                                <option value="1">Lima</option>
                                <option value="2">Huanuco</option>
                                <option value="3">San Martin</option>
                                <option value="4">Ica</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {errors.department_id?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col xs={12} sm={12} md={4} className="mt-3">
                        <Form.Group>
                            <Form.Label>Seleccione Provincia</Form.Label>
                            <Form.Select as="select" {...register("province_id")} isInvalid={!!errors.province_id}>
                                <option value="" selected disabled>Provincia</option>
                                <option value="1">Callao</option>
                                <option value="2">San Isidro</option>
                                <option value="3">Puente Piedra</option>
                                <option value="4">Puente Nuevo</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {errors.province_id?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col xs={12} sm={12} md={4} className="mt-3">
                        <Form.Group>
                            <Form.Label>Seleccione Distrito</Form.Label>
                            <Form.Select as="select" {...register("district_id")} isInvalid={!!errors.district_id}>
                                <option value="" selected disabled>Provincia</option>
                                <option value="1">Rupa Rupa</option>
                                <option value="2">Mariano Damaso Beraun</option>
                                <option value="3">Castillo Grande</option>
                                <option value="4">Las Palmas</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {errors.district_id?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={12} md={6} className="mt-3">
                        <Form.Group>
                            <FloatingLabel label="Direccion">
                                <Form.Control type="text" placeholder="Direccion" {...register("address")} isInvalid={!!errors.address} />
                                <Form.Control.Feedback type="invalid">
                                    {errors.address?.message}
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>
                    </Col>
                    <Col xs={12} sm={12} md={6} className="mt-3">
                        <Form.Group>
                            <FloatingLabel label="Referencia">
                                <Form.Control type="text" placeholder="Referencia" {...register("reference")} isInvalid={!!errors.reference} />
                                <Form.Control.Feedback type="invalid">
                                    {errors.reference?.message}
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={12} md={6} className="mt-3">
                        <Form.Group>
                            <FloatingLabel label="Nro celular/teléfono">
                                <Form.Control type="tel" placeholder="Nro celular/teléfono" {...register("phone")} isInvalid={!!errors.phone} />
                                <Form.Control.Feedback type="invalid">
                                    {errors.phone?.message}
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>
                    </Col>
                    <Col xs={12} sm={12} md={6} className="mt-3">
                        <Form.Group>
                            <FloatingLabel label="Estado civil">
                                <Form.Select as="select" {...register("civil_status")} isInvalid={!!errors.civil_status}>
                                    <option value="" selected disabled></option>
                                    <option value="1">Soltero</option>
                                    <option value="2">Casado</option>
                                    <option value="3">Viudo</option>
                                    <option value="4">Divorciado</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    {errors.civil_status?.message}
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <p className="color-gray"><b>Interés</b> </p>
                </Row>
                <Row>
                    <Col xs={12} sm={12} md={6}>
                        <Form.Group>
                            <FloatingLabel label="Rubro de interes">
                                <Form.Select as="select" {...register("rubro_interest_id")} isInvalid={!!errors.rubro_interest_id}>
                                    <option value="" selected disabled></option>
                                    <option value="1">Almacén y Transporte</option>
                                    <option value="2">Call Center y Ventas</option>
                                    <option value="3">Construcción y Obras</option>
                                    <option value="4">Mantenimiento y Limpieza</option>
                                    <option value="4">Motorizados y Courier</option>
                                    <option value="4">Produccion y Operaciones</option>
                                    <option value="4">Administracion contabilidad y finanzas</option>
                                    <option value="4">Comercia, ventas y negocio</option>
                                    <option value="4">Salud medicina y farmacia</option>
                                    <option value="4">Tecnologia, sistemas y comunicaciones</option>
                                    <option value="4">Recursos humanos y capacitación</option>
                                    <option value="4">Ingenieros</option>
                                    <option value="4">Seguros</option>
                                    <option value="4">Aduana y comercio exterior</option>
                                    <option value="4">Marketing y publicidad</option>
                                    <option value="4">Diseño</option>
                                    <option value="4">Gastronomia y Turismo</option>
                                    <option value="4">Minería, Petroéo y gas</option>
                                    <option value="4">Educación, docencia e investigacion</option>
                                    <option value="4">Legales</option>
                                    <option value="4">Secretarias y recepcion</option>
                                    <option value="4">Gerencia y dirección general</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    {errors.rubro_interest_id?.message}
                                </Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>
                    </Col>
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
