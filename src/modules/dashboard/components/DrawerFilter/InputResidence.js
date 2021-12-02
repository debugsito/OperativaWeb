import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { MenuItem, Grid } from '@material-ui/core'
import { Select } from '../../../shared/components'
import { getDepartments, getProvinces, getDistricts } from '../../../../store/actions/utils/utils.action';

function InputResidence({values, handleInputChange, setValues}) {
    const dispatch = useDispatch()
    const { departments, provinces, districts } = useSelector(state => state?.utils)
    const [provincesList, setProvincesList] = useState([])
    const [districtsList, setDistrictsList] = useState([])

    useEffect(() => {
        dispatch(getDepartments())
        dispatch(getProvinces())
        dispatch(getDistricts())
    }, [])

    useEffect(() => {
        if (departments.length > 0) {
            setFilteredProvinces(values.department_id)
        }
    }, [departments])

    useEffect(() => {
        if (provinces.length > 0) {
            setFilteredDistricts(values.province_id)
        }
    }, [provinces])

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

    const handleChangeSelectDepartment = (e) => {
        const departmen_id = e.target.value
        setValues({ ...values, district_id: "", province_id: "" })
        handleInputChange(e)
        setFilteredProvinces(departmen_id);
    }

    const handleChangeSelectProvince = (e) => {
        setValues({ ...values, district_id: "" })
        handleInputChange(e)
        setFilteredDistricts(e.target.value);
    }

    return (
        
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Select
                    label="Departamento"
                    name="department_id"
                    value={values.department_id}
                    onChange={handleChangeSelectDepartment}
                >
                    {departments.length > 0 && departments.map(element =>
                        <MenuItem key={element.id} value={element.id}>{element.name}</MenuItem>
                    )}

                </Select>
            </Grid>
            <Grid item xs={12}>
                <Select
                size="small"
                    label="Provincia"
                    name="province_id"
                    value={values.province_id}
                    onChange={handleChangeSelectProvince}
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
                >
                    {districtsList.length > 0 && districtsList.map(element =>
                        <MenuItem key={element.id} value={element.id}>{element.name}</MenuItem>
                    )}
                </Select>
            </Grid>
            
        </Grid>
    )
}

export default InputResidence
