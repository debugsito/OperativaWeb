import React, { useState, useEffect } from 'react'
import { DateTime } from "luxon";
import { useDispatch, useSelector } from "react-redux";
import { Grid, MenuItem, Checkbox, Typography, FormControlLabel } from "@material-ui/core";

import { TextInput, Button, Select, Modal, RichText } from "../../../shared/components";
import { actions_Utils } from "../../../../store/actions";
import { onlyNumbers } from '../../../shared/libs/validators';
import { useForm } from "../../../hooks";


const defaultValues = {
    job_title: "",
    description: "",
    requirements: "",
    rubro_id: "",//rubro
    address: "",
    district_id: "",
    period: "",
    salary: "",
    from_date: "",
    to_date: "",
    department_id: "",
    province_id: "",
};

export default function Index({ handleExitForm, data = null, handleSaveData }) {
    const dateLocal = DateTime.local().toFormat("yyyy-LL-dd")
    const dispatch = useDispatch();
    const initialValues = data ? data : defaultValues
    const { departments, provinces, districts, rubrosOp, periods } = useSelector(state => state?.utils)
    const { requestState } = useSelector(state => state?.dashboard)

    const [districtsList, setDistrictsList] = useState([])
    const [provincesList, setProvincesList] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [openConfirmationModal, setOpenConfirmationModal] = useState(false)
    const [isActiveSalary, setIsActiveSalary] = useState(data?.a_tratar)

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('job_title' in fieldValues)
            temp.job_title = fieldValues.job_title ? "" : "El campo es requerido."
        if ('description' in fieldValues)
            temp.description = fieldValues.description[0].children[0].text ? "" : "El campo es requerido."
        if ('requirements' in fieldValues)
            temp.requirements = fieldValues.requirements[0].children[0].text ? "" : "El campo es requerido."
        if ('rubro_id' in fieldValues)
            temp.rubro_id = fieldValues.rubro_id ? "" : "El campo es requerido."
        if ('address' in fieldValues)
            temp.address = fieldValues.address ? "" : "El campo es requerido."
        if ('district_id' in fieldValues)
            temp.district_id = fieldValues.district_id ? "" : "El campo es requerido."
        if ('period' in fieldValues)
            temp.period = fieldValues.period ? "" : "El campo es requerido."
        if (!isActiveSalary) {
            if ('salary' in fieldValues)
                temp.salary = fieldValues.salary ? "" : "El campo es requerido en numeros."
        }
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
        dispatch(actions_Utils.getAllPeriods());
        dispatch(actions_Utils.getItemsOp());
        dispatch(actions_Utils.getDepartments());
        dispatch(actions_Utils.getProvinces());
        dispatch(actions_Utils.getDistricts())
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

    const handleChangeCheckBox = (e) => {
        setIsActiveSalary(statePrev => !statePrev)
        if (e.target.checked) {
            setValues({ ...values, salary: null })
        } else {
            setValues({ ...values, salary: "" })
        }
    }

    const handleClickExit = () => {
        handleExitForm()
    }

    const handleClickSave = () => {
        let valuesTemp = { ...values }
        valuesTemp.description = JSON.stringify(values.description)
        valuesTemp.requirements = JSON.stringify(values.requirements)
        valuesTemp.period_id = values.period
        valuesTemp.job_level_id = values.rubro_id
        valuesTemp.a_tratar = isActiveSalary
        handleSaveData(valuesTemp)
        setOpenModal(false)
    }

    return (
        <Grid container spacing={3}>
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
                    helperText={errors.to_date || "Programa la fecha fin de tu publicación"}
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
                    name="rubro_id"
                    value={values.rubro_id}
                    onChange={handleInputChange}
                    error={errors.rubro_id ? true : false}
                    helperText={errors.rubro_id}
                >
                    {rubrosOp && rubrosOp.map(element =>
                        <MenuItem key={element.id} value={element.id}>{element.name}</MenuItem>
                    )}
                </Select>
            </Grid>
            <Grid item xs={8} style={{ margin: "auto" }}>
                <RichText
                    label="Funciones del puesto"
                    name="description"
                    valueText={values.description}
                    handleInputChange={handleInputChange}
                    error={errors.description ? true : false}
                    helperText={errors.description}
                />
            </Grid>
            <Grid item xs={8} style={{ margin: "auto" }}>
                <RichText
                    label="Requisitos del puesto"
                    name="requirements"
                    valueText={values.requirements}
                    handleInputChange={handleInputChange}
                    error={errors.requirements ? true : false}
                    helperText={errors.requirements}
                />
                {/* <TextInput
                        fullWidth
                        id="outlined-multiline-static"
                        label="Requisitos del puesto"
                        multiline
                        rows={8}
                        variant="outlined"
                        name="requirements"
                        value={values.requirements}
                        onChange={handleInputChange}
                        error={errors.requirements ? true : false}
                        helperText={errors.requirements}
                    /> */}
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
                            value={values.salary || ""}
                            onChange={handleInputChange}
                            onKeyPress={onlyNumbers}
                            error={errors.salary ? true : false}
                            helperText={errors.salary}
                            disabled={isActiveSalary}

                        />
                        <FormControlLabel control={<Checkbox name="isActiveSalary" size="small" checked={isActiveSalary} onChange={handleChangeCheckBox} />} label={
                            <Typography variant="body2" component="p">
                                No mostrar salario en la publicación
                            </Typography>
                        } />
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
                            helperText={errors.from_date || "Fecha de inicio de labores"}
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
                            helperText={errors.period || "Tiempo ideal de permanencia en el puesto"}
                        >
                            {periods && periods.map(element =>
                                <MenuItem key={element.id} value={element.id}>{element.name}</MenuItem>
                            )}
                        </Select>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={8} className="justify-end" >
                <Button variant="outlined" size="large" onClick={() => setOpenConfirmationModal(true)}>CANCELAR</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button variant="contained" size="large" onClick={() => setOpenModal(true)} disabled={disabledButtonState}>REPUBLICAR</Button>
            </Grid>

            <Modal open={openModal} handleCloseModal={() => setOpenModal(false)}>
                <h3 id="simple-modal-title">{true ? "¿Está seguro que desea guardar los cambios?" : "¿Esta seguro que desea publicar la vacante?"}</h3>
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
                            <Button variant="contained" size="large" onClick={handleClickExit}>SALIR</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Modal>

        </Grid>
    )
}
