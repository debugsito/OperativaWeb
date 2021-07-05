import React, { useState, useEffect } from 'react';
import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, } from '@material-ui/core';
import { Button, TextInput, Snackbars } from '../../../shared/components';
import { civilStatusesList, departmentsList, districtsList, provincesList } from '../../../../store/services/utils.service';
import { onlyNumbers, isPhone } from '../../../shared/libs/validators';
import { useForm } from "../../../hooks/useForm";

const defaultValues = {
    department_id: "",
    province_id: "",
    district_id: "",
    address: "",
    // reference: "",
    phone: "",
    civil_id: "",
}

const DEPARTMENT = {
    CALLAO: 7
}
const PROVINCE = {
    CALLAO: 701
}

export default function ApplicantPersonalDataForm({ user, handleSaveContactInformation }) {
    // #region 
    let initialValues = user ? user : defaultValues;
    const [openAlert, setOpenAlert] = useState(false)

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('department_id' in fieldValues)
            temp.department_id = fieldValues.department_id ? "" : "El campo es requerido."
        if ('province_id' in fieldValues)
            temp.province_id = fieldValues.province_id ? "" : "El campo es requerido."
        if ('district_id' in fieldValues)
            temp.district_id = fieldValues.district_id ? "" : "El campo es requerido."
        if ('address' in fieldValues)
            temp.address = fieldValues.address ? "" : "El campo es requerido."
        // if ('reference' in fieldValues)
        //     temp.reference = fieldValues.reference ? "" : "El campo es requerido."
        if ('phone' in fieldValues)
            temp.phone = fieldValues.phone ? (isPhone(fieldValues.phone) ? "" : "Ingrese un numero de teléfono/celular válido") : "El campo es requerido."
        if ('civil_id' in fieldValues)
            temp.civil_id = fieldValues.civil_id ? "" : "El campo es requerido."

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

    const [civilStatuses, setCivilStatuses] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [baseProvinces, setBaseProvinces] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [baseDistricts, setBaseDistricts] = useState([]);
    const [districts, setDistricts] = useState([]);

    useEffect(() => {
        getCivilStatuses();
        getDepartmentsList();
        getProvincesList();
        getDistrictsList();
    }, []);

    useEffect(() => {
        getFilteredProvinces(values.department_id);
    }, [baseProvinces])

    useEffect(() => {
        getFilteredDistricts(values.province_id);
    }, [baseDistricts])

    // useEffect(() => {
    //     if (values.department_id !== "") {
    //         if (values.department_id === DEPARTMENT.CALLAO) {
    //             const e = { target: { name: "", value: "" } }
    //             e.target.name = "province_id"
    //             e.target.value = PROVINCE.CALLAO
    //             handleChangeSelectProvince(e)
    //         }
    //     }
    // }, [values.department_id])

    useEffect(() => {
        console.log("[2] RENDER CONTACT DATA")
    });

    const handleChangeSelectDepartment = (e) => {
        const departmen_id = e.target.value
        setValues({ ...values, district_id: "", province_id: "" })
        handleInputChange(e)
        getFilteredProvinces(departmen_id);
    }

    const handleChangeSelectProvince = (e) => {
        setValues({ ...values, district_id: "" })
        handleInputChange(e)
        getFilteredDistricts(e.target.value);
    }

    const getCivilStatuses = async () => {
        const response = await civilStatusesList();
        setCivilStatuses(response?.civils);
    }

    const getDepartmentsList = async () => {
        const response = await departmentsList();
        setDepartments(response?.departments);
    }

    const getProvincesList = async () => {
        const response = await provincesList();
        setBaseProvinces(response?.provinces);
    }

    const getDistrictsList = async () => {
        const response = await districtsList();
        setBaseDistricts(response?.districts);
    }

    const getFilteredProvinces = (value) => {
        setProvinces([]);
        setDistricts([]);

        let filteredProvinces = baseProvinces.filter(item => item.department_id == value);
        setProvinces(filteredProvinces);
    }

    const getFilteredDistricts = function (value) {
        setDistricts([]);
        let filteredDistricts = baseDistricts.filter(item => item.province_id == value);
        setDistricts(filteredDistricts);
    }

    const handleCloseAlert = () => {
        setOpenAlert(false)
    }

    const handleSave = () => {
        if (!disabledButtonState) {
            let data = { ...values, country_id: 1 } //Country_id en DURO
            handleSaveContactInformation(data)
        } else {
            validate(values);
            setOpenAlert(true)
            return
        }

    }
    // #endregion
    return (
        <Grid container spacing={3} style={{ padding: 20 }}>
            <Grid item xs={12} md={6}>
                <FormControl variant="outlined" fullWidth error={errors.department_id ? true : false}>
                    <InputLabel id="demo-simple-select-outlined-label">Departamento</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        name="department_id"
                        value={values.department_id}
                        onChange={(e) => handleChangeSelectDepartment(e)}
                        label="Departamento"
                    >
                        {departments.map(element =>
                            <MenuItem key={element.id} value={element.id}>{element.name}</MenuItem>
                        )}
                    </Select>
                    <FormHelperText>{errors.department_id}</FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
                <FormControl variant="outlined" fullWidth error={errors.province_id ? true : false}>
                    <InputLabel id="demo-simple-select-outlined-label">Provincia</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        name="province_id"
                        value={values.province_id}
                        onChange={(e) => handleChangeSelectProvince(e)}
                        label="Provincia"
                        disabled={!values.department_id}
                    >
                        {provinces.map(element =>
                            <MenuItem key={element.id} value={element.id}>{element.name}</MenuItem>
                        )}
                    </Select>
                    <FormHelperText>{errors.province_id}</FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
                <FormControl variant="outlined" fullWidth error={errors.district_id ? true : false}>
                    <InputLabel id="demo-simple-select-outlined-label">Distrito</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        name="district_id"
                        value={values.district_id}
                        onChange={handleInputChange}
                        label="Distrito"
                        disabled={!values.province_id}
                    >
                        {districts.map(element =>
                            <MenuItem key={element.id} value={element.id}>{element.name}</MenuItem>
                        )}
                    </Select>
                    <FormHelperText>{errors.district_id}</FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
                <TextInput
                    fullWidth
                    label="Dirección"
                    name="address"
                    value={values.address}
                    onChange={handleInputChange}
                    error={errors.address ? true : false}
                    helperText={errors.address}
                />
            </Grid>
            {/* <Grid item xs={12} md={6}>
                <TextInput
                    fullWidth
                    name="reference"
                    label="Referencia"
                    value={values.reference}
                    onChange={handleInputChange}
                    error={errors.reference ? true : false}
                    helperText={errors.reference}
                />
            </Grid> */}
            <Grid item xs={12} md={6}>
                <TextInput
                    fullWidth
                    label="Celular/Teléfono"
                    name="phone"
                    value={values.phone}
                    onChange={handleInputChange}
                    error={errors.phone ? true : false}
                    helperText={errors.phone}
                    onKeyPress={e => onlyNumbers(e)}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <FormControl variant="outlined" fullWidth error={errors.civil_id ? true : false}>
                    <InputLabel id="demo-simple-select-outlined-label">Estado civil</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        name="civil_id"
                        value={values.civil_id}
                        onChange={handleInputChange}
                        label="Estado civil"
                    >
                        {civilStatuses.map(element =>
                            <MenuItem key={element.id} value={element.id}>{element.name}</MenuItem>
                        )}
                    </Select>
                    <FormHelperText>{errors.civil_id}</FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12} md={12} className="justify-end">
                <Button variant="contained" size="large" onClick={handleSave}>Continuar</Button>
            </Grid>
            <Snackbars
                open={openAlert}
                onClose={handleCloseAlert}
            />
        </Grid>
    );
}