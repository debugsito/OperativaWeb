import React, { useState, useEffect } from 'react';
import { DateTime } from "luxon";
import { Divider, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select } from '@material-ui/core';

import { Button, TextInput } from '../../../shared/components';
import { documentsTypeList, providerList } from '../../../../store/services/utils.service';
import { onlyNumbers, onlyLetters, isRuc, isDni } from '../../../shared/libs/validators';
import { useForm } from "../../../hooks/useForm";
import PROVIDERS from "../../../global/constants/types/providers";
import DOCUMENT_TYPE from "../../../global/constants/types/documentsTypes";

const defaultValues = {
    first_name: "",
    last_name: "",
    type_doc: "",
    document_number: "",
    birth_date: "",
    gender: "",
    provider_id: "",
    providerSpecification: null,
}

export default function ApplicantContactInformationForm({ user, handleSavePersonalData }) {
    // #region 
    let initialValues = user ? user : defaultValues;
    const yearMax = DateTime.utc().year - 18
    const monthMax = DateTime.utc().month
    const dayMax = DateTime.utc().day
    const dateMax = DateTime.utc(yearMax, monthMax, dayMax).toFormat("yyyy-LL-dd")

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
        if ('type_doc' in fieldValues)
            temp.type_doc = fieldValues.type_doc ? "" : "El campo es requerido."
        if ('document_number' in fieldValues) {
            if (values.type_doc === 1) {
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

    const [providers, setProviders] = useState([]);
    const [documentsType, setDocumentsType] = useState([]);
    const [showProviderSpecification, setShowProviderSpecification] = useState(false)

    useEffect(() => {
        getProviderList();
        getDocumentsTypeList();
    }, []);

    const getProviderList = async () => {
        const response = await providerList();
        setProviders(response?.providers);
    }

    const getDocumentsTypeList = async () => {
        const response = await documentsTypeList();
        let documentTypeTemp = response?.documents.filter(documentType => documentType.id != DOCUMENT_TYPE.RUC_ID)
        setDocumentsType(documentTypeTemp);
    }

    function handleSelectTypeDocument(e) {
        setValues(prevValues => ({
            ...prevValues,
            document_number: ""
        }))
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

    const handleSave = () => {
        if (!disabledButtonState) {
            handleSavePersonalData(values)
        } else {
            validate(values);
            return
        }
    }

    // #endregion
    return (
        <Grid container spacing={3} style={{ padding: 20 }}>
            <Grid item xs={12} md={6}>
                <TextInput
                    fullWidth
                    label="Nombres"
                    name="first_name"
                    value={values.first_name}
                    onChange={handleInputChange}
                    error={errors.first_name ? true : false}
                    helperText={errors.first_name}
                    onKeyPress={e => onlyLetters(e)}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextInput
                    fullWidth
                    label="Apellidos"
                    name="last_name"
                    value={values.last_name}
                    onChange={handleInputChange}
                    error={errors.last_name ? true : false}
                    helperText={errors.last_name}
                    onKeyPress={e => onlyLetters(e)}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <FormControl variant="outlined" fullWidth error={errors.type_doc ? true : false}>
                    <InputLabel id="demo-simple-select-outlined-label">Tipo de documento</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        name="type_doc"
                        value={values.type_doc}
                        onChange={(e) => handleSelectTypeDocument(e)}
                        label="Tipo de documento"
                    >
                        {documentsType.map(element =>
                            <MenuItem key={element.id} value={element.id}>{element.name}</MenuItem>
                        )}
                    </Select>
                    <FormHelperText>{errors.type_doc}</FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
                <TextInput
                    fullWidth
                    label="Número de documento"
                    name="document_number"
                    value={values.document_number}
                    onChange={handleInputChange}
                    error={errors.document_number ? true : false}
                    // maxLength='12'
                    // minLength='8'
                    // type="Number"
                    helperText={errors.document_number}
                    onKeyPress={e => onlyNumbers(e)}
                />
            </Grid>
            <Grid item xs={12} md={6}>
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
                    // max={moment().toDate()}
                    // defaultValue={birthdate.value}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        max: dateMax
                    }}
                />

            </Grid>
            <Grid item xs={12} md={6}>
                <FormControl variant="outlined" fullWidth error={errors.gender ? true : false}>
                    <InputLabel id="demo-simple-select-outlined-label">Género</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        name="gender"
                        value={values.gender}
                        onChange={handleInputChange}
                        label="Género"
                    >
                        <MenuItem value={2}>Femenino</MenuItem>
                        <MenuItem value={1}>Masculino</MenuItem>
                        <MenuItem value={3}>Otro</MenuItem>
                    </Select>
                    <FormHelperText>{errors.gender}</FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
                <Divider />
            </Grid>
            <Grid item xs={12} md={6}>
                <FormControl variant="outlined" fullWidth error={errors.provider_id ? true : false}>
                    <InputLabel id="demo-simple-select-outlined-label">¿Cómo te enteraste de Operativa?</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        name="provider_id"
                        value={values.provider_id}
                        onChange={(e) => handleSelectProvider(e)}
                        label="¿Cómo te enteraste de Operativa?"
                    >
                        {providers.map(element =>
                            <MenuItem key={element.id} value={element.id}>{element.name}</MenuItem>
                        )}
                    </Select>
                    <FormHelperText>{errors.provider_id}</FormHelperText>
                </FormControl>
            </Grid>
            {
                showProviderSpecification &&
                <Grid item xs={12} md={6}>
                    <TextInput
                        fullWidth
                        label="Por favor, especifíque"
                        name="providerSpecification"
                        value={values.providerSpecification || ''}
                        onChange={handleInputChange}
                        error={errors.providerSpecification ? true : false}
                        helperText={errors.providerSpecification}
                    />
                </Grid>
            }
            <Grid item xs={12} md={12} className="justify-end">
                <Button color="primary" onClick={handleSave}>continuar</Button>
            </Grid>
        </Grid>
    );
}