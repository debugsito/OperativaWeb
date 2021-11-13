import React, { useState, useEffect } from 'react'
import { Grid, MenuItem, makeStyles } from "@material-ui/core";
import { Button, Select, TextInput, Typography } from "../../../shared/components";
import { DialogInfoPremium } from "../";

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
    text: ""
}

export default function Index(props) {
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
                            name="entitys"
                            label="Entidades"
                            value={values.entitys}
                            onChange={handleInputChange}
                            error={errors.entitys ? true : false}
                            helperText={errors.entitys}
                        >
                            <MenuItem value="muni">Municipalidades</MenuItem>
                            <MenuItem value="muni">ONG's</MenuItem>
                            <MenuItem value="muni">Universidades</MenuItem>
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
                        <Button variant="outlined" size="large">CANCELAR</Button>
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
