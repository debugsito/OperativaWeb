import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { DateTime } from "luxon";
import { Grid, MenuItem } from '@material-ui/core';

import { useForm } from "../../../hooks/useForm";
import { Button, TextInput, Snackbars, Select } from "../../../shared/components";
import { normalize } from "../../../shared/utils/postulantForm.utils";
import { onlyNumbers, onlyLetters, isDni } from '../../../shared/libs/validators';
import { getDocumentsType, getProviders } from '../../../../store/actions/utils/utils.action';
import PROVIDERS from "../../../global/constants/types/providers";

export default function PersonalDataForm({ isReadOnly, handleChangeIndex }) {
    const dispatch = useDispatch()
    const yearMax = DateTime.utc().year - 18
    const monthMax = DateTime.utc().month
    const dayMax = DateTime.utc().day
    const dateMax = DateTime.utc(yearMax, monthMax, dayMax).toFormat("yyyy-LL-dd")
    const [showProviderSpecification, setShowProviderSpecification] = useState(false)
    const { documentsType, providers } = useSelector(state => state?.utils)
    const { applicantProfile } = useSelector(state => state?.dashboard)
    let initialValues = normalize.personalData(applicantProfile)

    useEffect(() => {
        dispatch(getDocumentsType())
        dispatch(getProviders())
    }, [])

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('birth_date' in fieldValues)
            temp.birth_date = fieldValues.birth_date ? "" : "El campo es requerido."
        if ('first_name' in fieldValues)
            temp.first_name = fieldValues.first_name ? "" : "El campo es requerido."
        if ('gender' in fieldValues)
            temp.gender = fieldValues.gender ? "" : "El campo es requerido."
        if ('last_name' in fieldValues)
            temp.last_name = fieldValues.last_name ? "" : "El campo es requerido."
        if ('document_id' in fieldValues)
            temp.document_id = fieldValues.document_id ? "" : "El campo es requerido."
        if ('document_number' in fieldValues) {
            if (values.document_id === 1) {
                temp.document_number = fieldValues.document_number ? (isDni(fieldValues.document_number) ? "" : "Numero de DNI inválido") : "El campo es requerido."
            } else {
                temp.document_number = fieldValues.document_number ? "" : "El campo es requerido."
            }
        }
        if ('provider_id' in fieldValues)
            temp.provider_id = fieldValues.provider_id ? "" : "El campo es requerido."

        if (showProviderSpecification) {
            if ('providerSpecification' in fieldValues)
                temp.providerSpecification = fieldValues.providerSpecification ? "" : "El campo es requerido."
        }

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

    function handleSelectTypeDocument(e) {
        setValues({ ...values, document_number: "" })
        handleInputChange(e);
    }

    const handleSelectProvider = (e) => {
        const option = e.target.value;
        if (option === PROVIDERS.OTHER || option === PROVIDERS.MUNICIPALITY_ID) {//otros y municipalidad
            setShowProviderSpecification(true)
            setValues({ ...values, providerSpecification: '' })
        } else {
            setShowProviderSpecification(false)
            setValues({ ...values, providerSpecification: null })
            setErrors({ ...errors, providerSpecification: '' })
        }
        handleInputChange(e);
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <TextInput
                    fullWidth
                    label="Nombres"
                    name="first_name"
                    value={values.first_name}
                    onChange={handleInputChange}
                    error={errors.first_name ? true : false}
                    helperText={errors.first_name}
                    onKeyPress={e => onlyLetters(e)}
                    inputProps={{
                        readOnly: isReadOnly,
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <TextInput
                    fullWidth
                    label="Apellidos"
                    name="last_name"
                    value={values.last_name}
                    onChange={handleInputChange}
                    error={errors.last_name ? true : false}
                    helperText={errors.last_name}
                    onKeyPress={e => onlyLetters(e)}
                    inputProps={{
                        readOnly: isReadOnly,
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <Select
                    label="Tipo de documento"
                    name="document_id"
                    value={values.document_id}
                    onChange={handleSelectTypeDocument}
                    error={errors.document_id ? true : false}
                    helperText={errors.document_id}
                    inputProps={{
                        readOnly: isReadOnly,
                    }}
                >
                    {documentsType.length > 0 && documentsType.map(element =>
                        <MenuItem key={element.id} value={element.id}>{element.name}</MenuItem>
                    )}

                </Select>
            </Grid>
            <Grid item xs={12}>
                <TextInput
                    fullWidth
                    label="Número de documento"
                    name="document_number"
                    value={values.document_number}
                    onChange={handleInputChange}
                    error={errors.document_number ? true : false}
                    helperText={errors.document_number}
                    onKeyPress={e => onlyNumbers(e)}
                    inputProps={{
                        readOnly: isReadOnly,
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <TextInput
                    id="date"
                    fullWidth
                    type="date"
                    name="birth_date"
                    label="Fecha de nacimiento"
                    value={values.birth_date}
                    onChange={handleInputChange}
                    error={errors.birth_date ? true : false}
                    helperText={errors.birth_date}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        max: dateMax,
                        readOnly: isReadOnly,
                    }}
                />

            </Grid>
            <Grid item xs={12}>
                <Select
                    label="Género"
                    name="gender"
                    value={values.gender}
                    onChange={handleInputChange}
                    error={errors.gender ? true : false}
                    helperText={errors.gender}
                    inputProps={{
                        readOnly: isReadOnly,
                    }}
                >
                    <MenuItem value={1}>Masculino</MenuItem>
                    <MenuItem value={2}>Femenino</MenuItem>
                    <MenuItem value={3}>Otro</MenuItem>
                </Select>
            </Grid>
            <Grid item xs={12}>
                <Select
                    label="¿Cómo te enteraste de Operativa?"
                    name="provider_id"
                    value={values.provider_id}
                    onChange={handleSelectProvider}
                    error={errors.provider_id ? true : false}
                    helperText={errors.provider_id}
                    inputProps={{
                        readOnly: isReadOnly,
                    }}
                >
                    {providers.length > 0 && providers.map(element =>
                        <MenuItem key={element.id} value={element.id}>{element.name}</MenuItem>
                    )}
                </Select>
            </Grid>
            {
                showProviderSpecification &&
                <Grid item xs={12}>
                    <TextInput
                        fullWidth
                        label="Por favor, especifíque"
                        name="providerSpecification"
                        value={values.providerSpecification || ''}
                        onChange={handleInputChange}
                        error={errors.providerSpecification ? true : false}
                        helperText={errors.providerSpecification}
                        InputProps={{
                            readOnly: isReadOnly,
                        }}
                    />
                </Grid>
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
