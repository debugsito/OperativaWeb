import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Grid, MenuItem } from '@material-ui/core';

import { useForm } from "../../../hooks/useForm";
import { Button, TextInput, Snackbars, Select } from "../../../shared/components";
import { normalize } from "../../../shared/utils/postulantForm.utils";
import { onlyNumbers } from '../../../shared/libs/validators';
import { getAcademicLevels, getSpecialties } from '../../../../store/actions/utils/utils.action';
import ACADEMIC_LEVEL from "../../../global/constants/types/academicLevels";
import SPECIALITY from "../../../global/constants/types/speciality";


export default function EducationDataForm({ isReadOnly, handleChangeIndex }) {
    const dispatch = useDispatch()

    const { academicLevels, specialties } = useSelector(state => state?.utils)
    const { applicantProfile } = useSelector(state => state?.dashboard)
    let initialValues = normalize.educationData(applicantProfile.education[0])

    const [isWithoutEducation, setIsWithoutEducation] = useState(false)
    const [showSpeciality, setShowSpeciality] = useState(initialValues.level_id > ACADEMIC_LEVEL.INCOMPLETE_TECHNICIAN_ID)
    const [showOtherSpeciality, setShowOtherSpeciality] = useState(false)

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('level_id' in fieldValues)
            temp.level_id = fieldValues.level_id ? "" : "El campo es requerido."
        if (!isWithoutEducation) {
            if ('name_inst' in fieldValues)
                temp.name_inst = fieldValues.name_inst ? "" : "El campo es requerido."
            if ('from_year' in fieldValues)
                temp.from_year = fieldValues.from_year ? (fieldValues.from_year.length === 4 ? "" : "Ejemplo: 1990") : "El campo es requerido. Ejemplo: 1990"
            if ('endYear' in fieldValues)
                temp.endYear = fieldValues.endYear ? (fieldValues.endYear.length === 4 ? "" : "Ejemplo: 1990") : "El campo es requerido.  Ejemplo: 1990"
            if (showSpeciality) {
                if ('speciality' in fieldValues) {
                    temp.speciality_id = fieldValues.speciality_id ? "" : "El campo es requerido"
                }
            }
            if (showOtherSpeciality) {
                if ('speciality' in fieldValues) {
                    temp.otherSpeciality = fieldValues.otherSpeciality ? "" : "El campo es requerido"
                }
            }
        }

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
        dispatch(getAcademicLevels())
        dispatch(getSpecialties())
    }, [])

    const handleChangeAcademicLevel = (e) => {
        const LEVEL_TEMP = e.target.value
        if (LEVEL_TEMP > ACADEMIC_LEVEL.INCOMPLETE_TECHNICIAN_ID) { //SI TIENE EL NIVEL ACADEMICO MAYOR QUE TECNICO INCOMPLETO || TECNICO || UNIV...
            setValues({ ...values, speciality_id: "", name_inst: "", from_year: "", endYear: "" })
            setShowSpeciality(true)
            setIsWithoutEducation(false)
        } else if (LEVEL_TEMP === ACADEMIC_LEVEL.WITHOUT_EDUCATION_ID) { //SI NO TIENE EDUCACIÓN
            setValues({ ...values, name_inst: null, from_year: null, endYear: null })
            setIsWithoutEducation(true)
        } else {
            setValues({ ...values, speciality_id: null, otherSpeciality: null, name_inst: "", from_year: "", endYear: "" })
            setShowSpeciality(false)
            setIsWithoutEducation(false)
        }
        handleInputChange(e)
    }

    const handleChangeSpeciality = (e) => {
        const SPECIALITY_TEMP = e.target.value
        if (SPECIALITY_TEMP == SPECIALITY.OTHERS) {
            setShowOtherSpeciality(true)
            setValues({ ...values, otherSpeciality: "" })
        } else {
            setShowOtherSpeciality(false)
            setErrors({ ...errors, otherSpeciality: "" })
            setValues({ ...values, otherSpeciality: null })
        }
        handleInputChange(e)
    }


    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Select
                    label="Nivel máximo alcanzado"
                    name="level_id"
                    value={values.level_id}
                    onChange={handleChangeAcademicLevel}
                    error={errors.level_id ? true : false}
                    helperText={errors.level_id}
                    inputProps={{
                        readOnly: isReadOnly,
                    }}
                >
                    {academicLevels.length > 0 && academicLevels.map(element =>
                        <MenuItem key={element.id} value={element.id}>{element.name}</MenuItem>
                    )}

                </Select>
            </Grid>
            {
                !isWithoutEducation &&
                <>
                    <Grid item xs={12}>
                        <TextInput
                            fullWidth
                            label="Institución educativa"
                            name="name_inst"
                            value={values.name_inst || ''}
                            onChange={handleInputChange}
                            error={errors.name_inst ? true : false}
                            helperText={errors.name_inst}
                            inputProps={{
                                readOnly: isReadOnly,
                            }}
                        />
                    </Grid>
                    {
                        showSpeciality &&
                        <Grid item xs={12}>
                            <Select
                                label="Especialidad"
                                name="speciality_id"
                                value={values.speciality_id}
                                onChange={handleChangeSpeciality}
                                error={errors.speciality_id ? true : false}
                                helperText={errors.speciality_id}
                                inputProps={{
                                    readOnly: isReadOnly,
                                }}
                            >
                                {
                                    specialties.sort((a, b) => a.id - b.id).map(element =>
                                        <MenuItem key={element.id} value={element.id}>{element.name}</MenuItem>
                                    )
                                }
                            </Select>
                        </Grid>
                    }
                    {
                        showOtherSpeciality &&
                        <Grid item xs={12}>
                            <TextInput
                                fullWidth
                                label="Especifique especialidad"
                                name="otherSpeciality"
                                value={values.otherSpeciality}
                                onChange={handleInputChange}
                                error={errors.otherSpeciality ? true : false}
                                helperText={errors.otherSpeciality}
                                inputProps={{
                                    readOnly: isReadOnly,
                                }}
                            />
                        </Grid>
                    }
                    <Grid item xs={12}>
                        <TextInput
                            fullWidth
                            type="text"
                            label="Año de inicio"
                            name="from_year"
                            value={values.from_year || ''}
                            onChange={handleInputChange}
                            error={errors.from_year ? true : false}
                            helperText={errors.from_year}
                            onKeyPress={onlyNumbers}
                            inputProps={{
                                readOnly: isReadOnly,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextInput
                            fullWidth
                            type="text"
                            label="Año de fin"
                            name="endYear"
                            value={values.endYear || ''}
                            onChange={handleInputChange}
                            onKeyPress={onlyNumbers}
                            error={errors.endYear ? true : false}
                            helperText={errors.endYear}
                            inputProps={{
                                readOnly: isReadOnly,
                            }}
                        />
                    </Grid>
                </>
            }

            <Grid item xs={6} className="justify-center">
                <Button variant="outlined" size="large">CANCELAR</Button>
            </Grid>
            <Grid item xs={6} className="justify-center">
                <Button variant="contained" size="large" onClick={handleChangeIndex}>Continuar</Button>
            </Grid>
        </Grid>
    )
}

