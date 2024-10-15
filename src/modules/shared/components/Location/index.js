import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from "react-redux";
import { actions_Utils } from "../../../../store/actions";
import { useForm } from "../../../hooks";

const initialValues = {
    department_id: "",
    province_id: "",
    district_id: "",
}

export default function Location({children, validateOnChange = true}) {
    const dispatch = useDispatch();
    const { departments, provinces, districts } = useSelector(state => state?.utils)
    const [districtsList, setDistrictsList] = useState([])
    const [provincesList, setProvincesList] = useState([])

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
    } = useForm(initialValues, validateOnChange, validate);

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

    const isCompleted = disabledButtonState

    return (children(values, setValues, errors, isCompleted, handleInputChange, handleChangeDepartments, handleChangeProvinces, departments, provincesList, districtsList))
}
