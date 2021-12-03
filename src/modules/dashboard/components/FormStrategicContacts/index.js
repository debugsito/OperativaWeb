import React, { useState, useEffect } from 'react'
import { Grid, MenuItem, makeStyles, ListItemText } from "@material-ui/core";
import { Button, Checkbox, Select, TextInput, Typography } from "../../../shared/components";
import { DialogInfoPremium, Chips } from "../";

import { useHistory } from "react-router-dom";

//Redux actions
import { useDispatch, useSelector } from "react-redux";
import { actions_Utils } from "../../../../store/actions";
import { useForm } from "../../../hooks";

const useStyles = makeStyles(theme => ({
    container:{
        padding:"3rem"
    },
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
    municipalities: [],
    ongs: [],
    institutes: [],
    universities: []
}

const DATA_ONGS = [
    { id: 1, name: "ONG ONE" },
    { id: 2, name: "ONG DOS" },
    { id: 3, name: "ONG TRES" },
    { id: 4, name: "ONG CUATRO" },
]
const DATA_INSTITUTES = [
    { id: 1, name: "Instituto Nacional ONE" },
    { id: 2, name: "Instituto Nacional DOS" },
    { id: 3, name: "Instituto Nacional TRES" },
    { id: 4, name: "Instituto Nacional CUATRO" },
]
const DATA_UNIVERSITY = [
    { id: 1, name: "Universidad ONE" },
    { id: 2, name: "Universidad DOS" },
    { id: 3, name: "Universidad TRES" },
    { id: 4, name: "Universidad CUATRO" },
]

export default function Index() {
    const history = useHistory();
    const classes = useStyles()
    const dispatch = useDispatch();
    const { departments, provinces, districts } = useSelector(state => state?.utils)
    const [districtsList, setDistrictsList] = useState([])
    const [provincesList, setProvincesList] = useState([])
    const [openDialog, setOpenDialog] = useState(false)
    const [chipData, setChipData] = useState([]);

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
       console.log("values.municipalities",values.municipalities)
    }, [values.municipalities])

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

    const handleRenderValue = (selected) => {
        let newArray = []
        const arrayTemp = [...departments]
        for (const department_id of selected) {
            const element = arrayTemp.find(department => department.id == department_id)
            newArray.push(element.name)
        }
        return newArray.join(', ')
    }


    return (
        <div className={classes.container}>

        
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h6">Ubicación</Typography>
                <Typography variant="body1">¿Donde quieres difundir tu publicación?</Typography>
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
                <Typography variant="body1">¿Qué entidades quieres que compartan tu publicación?</Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Select
                            name="municipalities"
                            label="Municipalidades"
                            labelId="demo-mutiple-checkbox-municipalities"
                            multiple
                            value={values.municipalities}
                            onChange={handleInputChange}
                            renderValue={(selected) => handleRenderValue(selected)}
                        >
                            {departments && departments.map(element =>
                                <MenuItem key={element.id} value={element.id}>
                                    <Checkbox checked={values.municipalities.indexOf(element.id) > -1} />
                                    <ListItemText primary={element.name} />
                                </MenuItem>
                            )}
                        </Select>
                        {/* <Chips chipData={chipData} handleDelete={handleDelete} /> */}
                    </Grid>
                    <Grid item xs={6}>
                        <Select
                            name="ongs"
                            label="ONG's"
                            labelId="demo-mutiple-checkbox-ongs"
                            multiple
                            value={values.ongs}
                            onChange={handleInputChange}
                            renderValue={(selected) => {
                                let newArray = []
                                const arrayTemp = [...DATA_ONGS]
                                for (const ong_id of selected) {
                                    const element = arrayTemp.find(ong => ong.id == ong_id)
                                    newArray.push(element.name)
                                }
                                return newArray.join(', ')
                            }
                            }
                        >
                            {DATA_ONGS.map(element =>
                                <MenuItem key={element.id} value={element.id}>
                                    <Checkbox checked={values.ongs.indexOf(element.id) > -1} />
                                    <ListItemText primary={element.name} />
                                </MenuItem>
                            )}
                        </Select>
                    </Grid>
                    <Grid item xs={6}>
                        <Select
                            name="institutes"
                            label="Institutos"
                            labelId="demo-mutiple-checkbox-institutes"
                            multiple
                            value={values.institutes}
                            onChange={handleInputChange}
                            renderValue={(selected) => {
                                let newArray = []
                                const arrayTemp = [...DATA_INSTITUTES]
                                for (const institute_id of selected) {
                                    const element = arrayTemp.find(institute => institute.id == institute_id)
                                    newArray.push(element.name)
                                }
                                return newArray.join(', ')
                            }
                            }
                        >
                            {DATA_INSTITUTES.map(element =>
                                <MenuItem key={element.id} value={element.id}>
                                    <Checkbox checked={values.institutes.indexOf(element.id) > -1} />
                                    <ListItemText primary={element.name} />
                                </MenuItem>
                            )}
                        </Select>
                    </Grid>
                    <Grid item xs={6}>
                        <Select
                            name="universities"
                            label="Universidades"
                            labelId="demo-mutiple-checkbox-universities"
                            multiple
                            value={values.universities}
                            onChange={handleInputChange}
                            renderValue={(selected) => {
                                let newArray = []
                                const arrayTemp = [...DATA_INSTITUTES]
                                for (const university_id of selected) {
                                    const element = arrayTemp.find(university => university.id == university_id)
                                    newArray.push(element.name)
                                }
                                return newArray.join(', ')
                            }
                            }
                        >
                            {DATA_UNIVERSITY.map(element =>
                                <MenuItem key={element.id} value={element.id}>
                                    <Checkbox checked={values.universities.indexOf(element.id) > -1} />
                                    <ListItemText primary={element.name} />
                                </MenuItem>
                            )}
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
        </div>
    )
}
