import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Grid, MenuItem } from '@material-ui/core';

import { useForm } from "../../../hooks/useForm";
import { Button, TextInput, Snackbars, Select } from "../../../shared/components";
import { normalize } from "../../../shared/utils/postulantForm.utils";
import { onlyNumbers, isPhone } from '../../../shared/libs/validators';
import { getDepartments, getProvinces, getDistricts, getCivilStatuses } from '../../../../store/actions/utils/utils.action';

export default function ContactDataForm({ isReadOnly, handleChangeIndex }) {
    const dispatch = useDispatch()
    const [provincesList, setProvincesList] = useState([])
    const [districtsList, setDistrictsList] = useState([])

    const { departments, provinces, districts } = useSelector(state => state?.utils)
    const { applicantProfile } = useSelector(state => state?.dashboard)
    let initialValues = normalize.contactData(applicantProfile)

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
        if ('reference' in fieldValues)
            temp.reference = fieldValues.reference ? "" : "El campo es requerido."
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

    useEffect(() => {
        dispatch(getDepartments())
        dispatch(getProvinces())
        dispatch(getDistricts())
        dispatch(getCivilStatuses())
    }, [])

    useEffect(() => {
        if (values.department_id) {
            setFilteredProvinces(values.department_id)
        }
    }, [values.department_id])

    useEffect(() => {
        if (values.province_id) {
            setFilteredDistricts(values.province_id)
        }
    }, [values.province_id])

    const setFilteredProvinces = (department_id) => {
        setDistrictsList([]);
        setProvincesList([]);
        const filteredProvinces = provinces.filter(item => item.department_id == department_id);
        setProvincesList(filteredProvinces);
    }

    const setFilteredDistricts = function (province_id) {
        setDistrictsList([]);
        let filteredDistricts = districts.filter(item => item.province_id == province_id);
        setDistrictsList(filteredDistricts);
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Select
                    label="Departamento"
                    name="department_id"
                    value={values.department_id}
                    onChange={handleInputChange}
                    error={errors.department_id ? true : false}
                    helperText={errors.department_id}
                    inputProps={{
                        readOnly: isReadOnly,
                    }}
                >
                    {departments.length > 0 && departments.map(element =>
                        <MenuItem key={element.id} value={element.id}>{element.name}</MenuItem>
                    )}

                </Select>
            </Grid>
            <Grid item xs={12}>
                <Select
                    label="Provincia"
                    name="province_id"
                    value={values.province_id}
                    onChange={handleInputChange}
                    error={errors.province_id ? true : false}
                    helperText={errors.province_id}
                    inputProps={{
                        readOnly: isReadOnly,
                    }}
                >
                    {provincesList.length > 0 && provincesList.map(element =>
                        <MenuItem key={element.id} value={element.id}>{element.name}</MenuItem>
                    )}
                </Select>
            </Grid>
            <Grid item xs={12}>
                <Select
                    label="Distrito"
                    name="district_id"
                    value={values.district_id}
                    onChange={handleInputChange}
                    error={errors.district_id ? true : false}
                    helperText={errors.district_id}
                    inputProps={{
                        readOnly: isReadOnly,
                    }}
                >
                    {districtsList.length > 0 && districtsList.map(element =>
                        <MenuItem key={element.id} value={element.id}>{element.name}</MenuItem>
                    )}
                </Select>
            </Grid>
            <Grid item xs={12}>
                <TextInput
                    fullWidth
                    label="Dirección"
                    name="address"
                    value={values.address}
                    onChange={handleInputChange}
                    error={errors.address ? true : false}
                    helperText={errors.address}
                    inputProps={{
                        readOnly: isReadOnly,
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <TextInput
                    fullWidth
                    label="Referencia"
                    name="reference"
                    value={values.reference}
                    onChange={handleInputChange}
                    error={errors.reference ? true : false}
                    helperText={errors.reference}
                    inputProps={{
                        readOnly: isReadOnly,
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <TextInput
                    fullWidth
                    label="Celular/Teléfono"
                    name="phone"
                    value={values.phone}
                    onChange={handleInputChange}
                    error={errors.phone ? true : false}
                    helperText={errors.phone}
                    onKeyPress={onlyNumbers}
                    inputProps={{
                        readOnly: isReadOnly,
                    }}
                />
            </Grid>

            <Grid item xs={6} className="justify-center">
                <Button variant="outlined" size="large">CANCELAR</Button>
            </Grid>
            <Grid item xs={6} className="justify-center">
                <Button variant="contained" size="large" onClick={handleChangeIndex}>Continuar</Button>
            </Grid>
        </Grid>
    )
}
