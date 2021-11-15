import React, { useState, useEffect } from 'react'
import { Grid, MenuItem, makeStyles } from "@material-ui/core";
import { Button, Select, TextInput, Typography } from "../../../shared/components";
import { DialogInfoPremium } from "../";

import { useHistory } from "react-router-dom";

//Redux actions
import { useDispatch, useSelector } from "react-redux";
import { actions_Utils } from "../../../../store/actions";
import { useForm } from "../../../hooks";

const useStyles = makeStyles(theme => ({
    containerMessage: {
        margin: "1.5em",
        padding: "2em",
        background: "#F5F7F9",
        borderRadius: "15px",
    },
    bodyMessage: {
        background: "#fff",
        borderRadius: "15px",
        marginTop: "1em",
        padding: "2em",
    }

}))

const initialValues = {
    department_id: "",
    province_id: "",
    district_id: "",
    text: "",
    municipalities: "",
    ongs: "",
    institutes: "",
    universities: ""


}

export default function Index(props) {
    const history = useHistory();
    const classes = useStyles()
    const dispatch = useDispatch();
    const { departments, provinces, districts } = useSelector(state => state?.utils)
    const [districtsList, setDistrictsList] = useState([])
    const [provincesList, setProvincesList] = useState([])
    const [openDialog, setOpenDialog] = useState(false)

    const validate = (fieldValues = values) => {
        let temp = { ...errors }

        if ('department_id' in fieldValues)
            temp.department_id = fieldValues.department_id ? "" : "El campo es requerido."
        if ('province_id' in fieldValues)
            temp.province_id = fieldValues.province_id ? "" : "El campo es requerido."
        if ('district_id' in fieldValues)
            temp.district_id = fieldValues.district_id ? "" : "El campo es requerido."
        if ('municipalities' in fieldValues)
            temp.municipalities = fieldValues.municipalities ? "" : "El campo es requerido."
        if ('ongs' in fieldValues)
            temp.ongs = fieldValues.ongs ? "" : "El campo es requerido."
        if ('institutes' in fieldValues)
            temp.institutes = fieldValues.institutes ? "" : "El campo es requerido."
        if ('universities' in fieldValues)
            temp.universities = fieldValues.universities ? "" : "El campo es requerido."

        setErrors({ ...temp })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        disabledButtonState,
    } = useForm(initialValues, true, validate);

    useEffect(() => {
        dispatch(actions_Utils.getDepartments());
        dispatch(actions_Utils.getProvinces());
        dispatch(actions_Utils.getDistricts());
    }, [])

    useEffect(() => {
        filterProvinces()
    }, [provinces])

    useEffect(() => {
        filterDistricts()
    }, [districts])

    const filterProvinces = () => {
        let filteredProvinces = provinces.filter(item => item.department_id == values.department_id);
        setProvincesList(filteredProvinces);
    }

    const filterDistricts = () => {
        let filteredDistricts = districts.filter(item => item.province_id == values.province_id);
        setDistrictsList(filteredDistricts);
    }

    const handleChangeDepartments = (event) => {
        setValues({ ...values, province_id: "", district_id: "" })
        setDistrictsList([])
        const { value } = event.target
        let provincesTemp = provinces.filter((province) => province.department_id == value)
        setProvincesList(provincesTemp)
        handleInputChange(event)

    }

    const handleChangeProvinces = (event) => {
        setValues({ ...values, district_id: "" })
        const { value } = event.target
        let districtsTemp = districts.filter((district) => district.province_id == value)
        setDistrictsList(districtsTemp)
        handleInputChange(event)
    }


    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h6">Ubicación</Typography>
                <Typography variant="body">¿Donde quieres difundir tu publicación?</Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Select
                            name="department_id"
                            label="Departamento"
                            value={values.department_id}
                            onChange={(e) => handleChangeDepartments(e)}
                            error={errors.department_id ? true : false}
                            helperText={errors.department_id}
                        >
                            {departments && departments.map(element =>
                                <MenuItem key={element.id} value={element.id}>{element.name}</MenuItem>
                            )}
                        </Select>
                    </Grid>
                    <Grid item xs={4}>
                        <Select
                            name="province_id"
                            label="Provincia"
                            value={values.province_id}
                            onChange={(e) => handleChangeProvinces(e)}
                            error={errors.province_id ? true : false}
                            helperText={errors.province_id}
                        >
                            {provincesList && provincesList.map(element =>
                                <MenuItem key={element.id} value={element.id}>{element.name}</MenuItem>
                            )}
                        </Select>
                    </Grid>
                    <Grid item xs={4}>
                        <Select
                            name="district_id"
                            label="Distrito"
                            value={values.district_id}
                            onChange={handleInputChange}
                            error={errors.district_id ? true : false}
                            helperText={errors.district_id}
                        >
                            {districtsList.length > 0 && districtsList.map(element =>
                                <MenuItem key={element.id} value={element.id}>{element.name}</MenuItem>
                            )}
                        </Select>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h6">Contactos estratégicos</Typography>
                <Typography variant="body">¿Qué entidades quieres que compartan tu publicación?</Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Select
                            name="municipalities"
                            label="municipalidades"
                            value={values.municipalities}
                            onChange={handleInputChange}
                            error={errors.municipalities ? true : false}
                            helperText={errors.municipalities}
                        >
                            <MenuItem value="muni">Municipalidad de Leoncio Prado</MenuItem>
                            <MenuItem value="muni">Municipalidad de Lima</MenuItem>
                            <MenuItem value="muni">Municipalidad de Aucayacu</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={6}>
                        <Select
                            name="ongs"
                            label="ONG's"
                            value={values.ongs}
                            onChange={handleInputChange}
                            error={errors.ongs ? true : false}
                            helperText={errors.ongs}
                        >
                            <MenuItem value="muni">ONG 1</MenuItem>
                            <MenuItem value="muni">ONG 2</MenuItem>
                            <MenuItem value="muni">ONG 3</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={6}>
                        <Select
                            name="institutes"
                            label="Instituo"
                            value={values.institutes}
                            onChange={handleInputChange}
                            error={errors.institutes ? true : false}
                            helperText={errors.institutes}
                        >
                            <MenuItem value="muni">Instituo 1</MenuItem>
                            <MenuItem value="muni">Instituo 2</MenuItem>
                            <MenuItem value="muni">Instituo 3</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={6}>
                        <Select
                            name="universities"
                            label="Universidades"
                            value={values.universities}
                            onChange={handleInputChange}
                            error={errors.universities ? true : false}
                            helperText={errors.universities}
                        >
                            <MenuItem value="muni">Universidades 1</MenuItem>
                            <MenuItem value="muni">UNI</MenuItem>
                            <MenuItem value="muni">UNAS</MenuItem>
                        </Select>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h6">Mensaje</Typography>
            </Grid>
            <section className={classes.containerMessage}>
                <Grid item xs={12}>
                    <Typography variant="h6">Estimado socio:</Typography>
                    <Typography variant="body2">Me es grato dirigirme a ud. con la finalidad de comunicarle que nuestra empresa se encuentra en el proceso de reclutamiento de talentos. Asimismo, comparto con ud. la publicación de empleo con los requisitos del puesto. Agradecería su apoyo para la difusión del anuncio.</Typography>
                    <br />
                    <Typography variant="body2">Muchas gracias.</Typography>
                    <Typography variant="h6">Rappi S.A.</Typography>
                </Grid>
                <Grid item xs={12}>
                    <div className={classes.bodyMessage}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextInput
                                    fullWidth
                                    name="vacantes"
                                    label="Importante empresa requiere"
                                    value={values.text}
                                    onChange={handleInputChange}
                                    error={errors.text ? true : false}
                                    helperText={errors.text}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="subtitle2">
                                    <strong>Categoria</strong>
                                </Typography>
                                <Typography variant="body1">
                                    Logítica - Distribución
                                </Typography>
                                <br />
                                <Typography variant="subtitle2">
                                    <strong>Descripción</strong>
                                </Typography>
                                <Typography variant="body1">
                                    Somos Andes Perú, empresa peruana basada en la operación de negocios mineros de oro y plata en América.
                                    Nos encontramos en la búsqueda de MOTORIZADOS.
                                </Typography>
                                <Typography variant="body1">
                                    Vacante Disponible: REPARTIDORES TIEMPO COMPLETO - ANDES LIMA.
                                </Typography>
                                <br />
                                <Typography variant="subtitle2">
                                    <strong>Requisitos del puesto</strong>
                                </Typography>
                                <ul>
                                    <li>Contar con moto propia y documentos actualizados (licencia de conducir, tarjeta de propiedad y SOAT).</li>
                                    <li>Tener disponibilidad trabajar part time 6 días a la semana en horario rotativo.</li>
                                    <li>Experiencia mínima de 3 meses, de preferencia en el rubro  de fast food y restaurantes.</li>
                                    <li>Buena actitud, orientación al servicio, disposición para el aprendizaje y trabajo en equipo.</li>
                                </ul>
                                <br />
                                <Typography variant="subtitle2">
                                    <strong>Distrito</strong>
                                </Typography>
                                <Typography variant="body1">
                                    Villa El salvador
                                </Typography>
                            </Grid>
                        </Grid>

                    </div>
                </Grid>

            </section>
            <Grid item xs={12}>
                <Grid container spacing={3} justifyContent="flex-end">
                    <Grid item>
                        <Button variant="outlined" size="large" onClick={() => history.push("/")}>CANCELAR</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" size="large" onClick={() => setOpenDialog(true)}>ENVIAR</Button>
                    </Grid>
                </Grid>
            </Grid>
            <DialogInfoPremium open={openDialog} onClose={() => setOpenDialog(false)} />
        </Grid>
    )
}
