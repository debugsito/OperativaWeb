import React, { useEffect, useState } from 'react'
import { Grid, MenuItem } from "@material-ui/core";
import { TextInput, Button, Select, Modal } from "../../../shared/components";
import { useForm } from "../../../hooks";
import { itemsList, getPeriods, districtsList } from "../../../../store/services/utils.service";
import { updatePublication, savePublication } from "../../../../store/actions/dashboard/dashboard.action";
import { DateTime } from "luxon";
import * as moment from 'moment';
import { useDispatch, useSelector } from "react-redux";
import { actions_Utils } from "../../../../store/actions";

const defaultValues = {
    job_title: "",
    description: "",
    requirements: "",
    job_level_id: "",//rubro
    address: "",
    district_id: "",
    period: "",
    salary: "",
    from_date: "",
    to_date: "",
    department_id: "",
    province_id: ""
}

export default function PublicationForm({ goForward, data = null, isEditing = false }) {
    const initialValues = data ? {
        job_title: data.job_title,
        description: data.description,
        requirements: data.requirements,
        job_level_id: data.job_level_id,//rubro
        address: data.address,
        district_id: 70104,//data.district_id,
        period: data.period,
        salary: data.salary,
        from_date: moment(data.from_date).format("YYYY-MM-DD"),
        to_date: moment(data.to_date).format("YYYY-MM-DD"),
        department_id: 7,//EN DURO
        province_id: 701, //EN DURO
    } : defaultValues

    const dateLocal = DateTime.local().toFormat("yyyy-LL-dd") //Don't use momentjs, will soon be deprecated
    // const date = DateTime.local().toFormat("dd/LL/yyyy") //Don't use momentjs, will soon be deprecated
    const dispatch = useDispatch()
    const { departments, provinces, districts } = useSelector(state => state?.utils)
    const [items, setItems] = useState([])
    const [periods, setPeriods] = useState([])
    const [districtsList, setDistrictsList] = useState([])
    const [provincesList, setProvincesList] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [openConfirmationModal, setOpenConfirmationModal] = useState(false)

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('job_title' in fieldValues)
            temp.job_title = fieldValues.job_title ? "" : "El campo es requerido."
        if ('description' in fieldValues)
            temp.description = fieldValues.description ? "" : "El campo es requerido."
        if ('requirements' in fieldValues)
            temp.requirements = fieldValues.requirements ? "" : "El campo es requerido."
        if ('job_level_id' in fieldValues)
            temp.job_level_id = fieldValues.job_level_id ? "" : "El campo es requerido."
        if ('address' in fieldValues)
            temp.address = fieldValues.address ? "" : "El campo es requerido."
        if ('district_id' in fieldValues)
            temp.district_id = fieldValues.district_id ? "" : "El campo es requerido."
        if ('period' in fieldValues)
            temp.period = fieldValues.period ? "" : "El campo es requerido."
        if ('salary' in fieldValues)
            temp.salary = fieldValues.salary ? "" : "El campo es requerido."
        if ('from_date' in fieldValues)
            temp.from_date = fieldValues.from_date ? "" : "El campo es requerido."
        if ('to_date' in fieldValues)
            temp.to_date = fieldValues.to_date ? "" : "El campo es requerido."
        if ('department_id' in fieldValues)
            temp.department_id = fieldValues.department_id ? "" : "El campo es requerido."
        if ('province_id' in fieldValues)
            temp.province_id = fieldValues.province_id ? "" : "El campo es requerido."

        setErrors({
            ...temp
        })

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
        getItems();
        getPeriodsList();
        getDepartments();
        getProvinces();
        getDistrics();
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
        // setValues({ ...values, province_id: values.province_id })
    }

    const filterDistricts = () => {
        let filteredDistricts = districts.filter(item => item.province_id == values.province_id);
        setDistrictsList(filteredDistricts);
    }

    const getItems = async () => {
        let response = await itemsList();
        setItems(response.rubros)
    }

    const getPeriodsList = async () => {
        let response = await getPeriods();
        setPeriods(response.periods)
    }

    const getDepartments = async () => {
        await dispatch(actions_Utils.getDepartments())
    }

    const getProvinces = async () => {
        await dispatch(actions_Utils.getProvinces());
    }

    const getDistrics = async () => {
        await dispatch(actions_Utils.getDistricts());
    }

    const handleClickSave = () => {
        if (isEditing) {
            const params = { publication_id: data.id, body: { status: 1, ...values } }
            dispatch(updatePublication(params))
        } else {
            dispatch(savePublication(values))
        }
        goForward(false)
    }

    const handleExit = () => {
        setOpenConfirmationModal(false)
        goForward(false)
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
        <>
            <Grid container spacing={3} >
                <Grid item xs={8} style={{ margin: "auto" }}>
                    <TextInput
                        id="date"
                        fullWidth
                        type="date"
                        name="to_date"
                        label="Fecha de caducidad"
                        value={values.to_date}
                        onChange={handleInputChange}
                        error={errors.to_date ? true : false}
                        helperText={errors.to_date}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            min: dateLocal
                        }}
                    />
                </Grid>
                <Grid item xs={8} style={{ margin: "auto" }}>
                    <TextInput
                        fullWidth
                        name="job_title"
                        label="Nombre del puesto"
                        value={values.job_title}
                        onChange={handleInputChange}
                        error={errors.job_title ? true : false}
                        helperText={errors.job_title}
                    />
                </Grid>
                <Grid item xs={8} style={{ margin: "auto" }}>
                    <Select
                        label="Rubro"
                        name="job_level_id"
                        value={values.job_level_id}
                        onChange={handleInputChange}
                        error={errors.job_level_id ? true : false}
                        helperText={errors.job_level_id}
                    >
                        {items && items.map(element =>
                            <MenuItem key={element.id} value={element.id}>{element.name}</MenuItem>
                        )}
                    </Select>
                </Grid>
                <Grid item xs={8} style={{ margin: "auto" }}>
                    <TextInput
                        fullWidth
                        id="outlined-multiline-static"
                        label="Funciones del puesto"
                        multiline
                        rows={5}
                        variant="outlined"
                        name="description"
                        value={values.description}
                        onChange={handleInputChange}
                        error={errors.description ? true : false}
                        helperText={errors.description}
                    />
                </Grid>
                <Grid item xs={8} style={{ margin: "auto" }}>
                    <TextInput
                        fullWidth
                        id="outlined-multiline-static"
                        label="Requisitos del puesto"
                        multiline
                        rows={5}
                        variant="outlined"
                        name="requirements"
                        value={values.requirements}
                        onChange={handleInputChange}
                        error={errors.requirements ? true : false}
                        helperText={errors.requirements}
                    />
                </Grid>
                <Grid item xs={8} style={{ margin: "auto" }}>
                    <TextInput
                        fullWidth
                        name="address"
                        label="Direccion"
                        value={values.address}
                        onChange={handleInputChange}
                        error={errors.address ? true : false}
                        helperText={errors.address}
                    />
                </Grid>
                <Grid item xs={8} style={{ margin: "auto" }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
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
                        <Grid item xs={6}>
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
                    </Grid>

                </Grid>
                <Grid item xs={8} style={{ margin: "auto" }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
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
                        <Grid item xs={6}>
                            <TextInput
                                fullWidth
                                name="salary"
                                label="Salario"
                                value={values.salary}
                                onChange={handleInputChange}
                                error={errors.salary ? true : false}
                                helperText={errors.salary}
                            />
                        </Grid>
                    </Grid>

                </Grid>
                <Grid item xs={8} style={{ margin: "auto" }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextInput
                                fullWidth
                                type="date"
                                name="from_date"
                                label="Fecha de inicio"
                                value={values.from_date}
                                onChange={handleInputChange}
                                error={errors.from_date ? true : false}
                                helperText={errors.from_date}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    min: dateLocal
                                }}
                            />

                        </Grid>
                        <Grid item xs={6}>
                            <Select
                                label="Periodo de permanencia"
                                name="period"
                                value={values.period}
                                onChange={handleInputChange}
                                error={errors.period ? true : false}
                                helperText={errors.period}
                            >
                                {periods && periods.map(element =>
                                    <MenuItem key={element.id} value={element.id}>{element.name}</MenuItem>
                                )}
                            </Select>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={8} style={{ display: 'flex', justifyContent: 'center', margin: "auto" }} >
                    <Button variant="outlined" size="large" onClick={() => setOpenConfirmationModal(true)}>CANCELAR</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button variant="contained" size="large" onClick={() => setOpenModal(true)} disabled={disabledButtonState}>GUARDAR</Button>
                </Grid>
                <Modal open={openModal} handleCloseModal={() => setOpenModal(false)}>
                    <h3 id="simple-modal-title">{isEditing ? "¿Está seguro que desea guardar los cambios?" : "¿Esta seguro que desea publicar la vacante?"}</h3>
                    <Grid item xs={12}>
                        <Grid container spacing={3} className="justify-center">
                            <Grid item>
                                <Button variant="outlined" size="large" onClick={() => setOpenModal(false)}>NO</Button>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" size="large" onClick={handleClickSave}>SI, GUARDAR</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Modal>
                <Modal open={openConfirmationModal} handleCloseModal={() => setOpenConfirmationModal(false)}>
                    <h3 id="simple-modal-title">Si sales ahora, se perderán los cambios. ¿Seguro que quieres salir?</h3>
                    <Grid item xs={12}>
                        <Grid container spacing={3} className="justify-center">
                            <Grid item>
                                <Button variant="outlined" size="large" onClick={() => setOpenConfirmationModal(false)}>CANCELAR</Button>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" size="large" onClick={handleExit}>SALIR</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Modal>
            </Grid>
        </>
    )
}
