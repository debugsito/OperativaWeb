import React, { useState, useEffect } from 'react'
import { Alert } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';
import { Autocomplete, Button, Checkbox, Link, TextInput, Select } from '../../../shared/components';
import { FormControl, FormHelperText, Grid, IconButton, MenuItem, Typography } from '@material-ui/core';

import { useForm } from "../../../hooks";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { onlyNumbers, isRuc, isPhone } from "../../../shared/libs/validators";

import service_MunicipalitySignUp from "../../../../store/services/auth/municipalitySignUp.service";
import service_CompanySignUp from "../../../../store/services/auth/companySignUp.service";
import { actions_Utils } from '../../../../store/actions';
import { setCorporationData } from '../../../../store/actions/auth/auth.action';

const initialValues = {
    razon_social: '',
    document_number: '',
    phone: '',
    interest_rubro_id: null,
    termsAndCondition: false,
    district_id: null,
}

export default function CorporationDataForm({ handleRegisterCompleted, goToPreviousForm }) {
    const { auth: { accountType, corporationSignUp }, utils: { items } } = useSelector(state => state);
    const dispatch = useDispatch();
    const history = useHistory()
    const [userError, setUserError] = useState(null);

    const defaultValues = corporationSignUp.stepTwo ? corporationSignUp.corporationdata : initialValues

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('businessName' in fieldValues)
            temp.businessName = fieldValues.businessName ? "" : "El campo es requerido."
        if ('document_number' in fieldValues)
            temp.document_number = fieldValues.document_number ? (isRuc(fieldValues.document_number) ? "" : "El RUC debe ser de 11 digitos") : "El campo es requerido."
        if ('phone' in fieldValues)
            temp.phone = fieldValues.phone ? (isPhone(fieldValues.phone) ? "" : "Numero de celular inválido") : "El campo es requerido."
        if (accountType === "municipality") {
            if ('district_id' in fieldValues)
                temp.district_id = fieldValues.district_id ? "" : "El campo es requerido."
        }
        if ('termsAndCondition' in fieldValues)
            temp.termsAndCondition = fieldValues.termsAndCondition != false ? "" : "Acepte los términos y condiciones."

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
    } = useForm(defaultValues, true, validate);

    useEffect(() => {
        dispatch(actions_Utils.getItems())
        dispatch(actions_Utils.getDistrictsLima())
    }, [])

    const openTermsAndConditionModal = (event) => {
        event.preventDefault();
        dispatch(setCorporationData(values))
        history.push("/terminos-y-condiciones-operativa")
    }

    const handleClickAccept = async () => {
        const body = {
            ...corporationSignUp.reprensentativeData,
            ...values,
            interest_area_id: "2"//en DURO
        }
        if (!disabledButtonState) {
            try {
                let response = accountType === "municipality" ? await service_MunicipalitySignUp(JSON.stringify(body)) : await service_CompanySignUp(JSON.stringify(body))
                if (response.data) {
                    handleRegisterCompleted();
                }
            } catch (error) {
                if (error.response.status === 401) {
                    setUserError(error.response.data.message);
                } else {
                    setUserError("Ha ocurrido un error interno.");
                };
            }
        }
        else {
            validate();
            return;
        }
    }

    return (
        <>
            <Grid item xs={12} justify="center">
                <Typography variant="h6" component="h6" className="title-color">
                    {accountType === "municipality" ? "DATOS DE LA MUNICIPALIDAD" : "DATOS DE LA EMPRESA"}
                </Typography>
            </Grid>
            <Grid item xs={12} justify="center">
                <TextInput
                    fullWidth
                    name="razon_social"
                    label="Razón social"
                    value={values.razon_social}
                    onChange={handleInputChange}
                    error={errors.razon_social ? true : false}
                    helperText={errors.razon_social}
                />
            </Grid>
            <Grid item xs={12} justify="center">
                <TextInput
                    fullWidth
                    name="document_number"
                    label="RUC"
                    value={values.document_number}
                    onChange={handleInputChange}
                    onKeyPress={e => onlyNumbers(e)}
                    error={errors.document_number ? true : false}
                    helperText={errors.document_number}
                />
            </Grid>
            {
                accountType === "municipality" &&
                <Grid item xs={12} justify="center">
                    <Autocomplete
                        label="Distrito"
                        name="district_id"
                        value={values.district_id || ""}
                        handleChange={handleInputChange}
                        error={errors.district_id ? true : false}
                        helperText={errors.district_id}
                    />
                </Grid>
            }
            <Grid item xs={12} justify="center">
                <TextInput
                    fullWidth
                    name="phone"
                    label="Telefono"
                    value={values.phone}
                    onChange={handleInputChange}
                    onKeyPress={e => onlyNumbers(e)}
                    error={errors.phone ? true : false}
                    helperText={errors.phone}
                />
            </Grid>
            {
                accountType === "company" &&
                <Grid item xs={12}>
                    <Select
                        label="Rubro"
                        name="interest_rubro_id"
                        value={values.interest_rubro_id || ''}
                        onChange={handleInputChange}
                        error={errors.interest_rubro_id ? true : false}
                        helperText={errors.interest_rubro_id}
                    >
                        {items.length > 0 && items.map(element =>
                            <MenuItem key={element.id} value={element.id}>{element.name}</MenuItem>
                        )}
                    </Select>
                </Grid>
            }
            <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth error={errors.termsAndCondition ? true : false}>
                    <Checkbox
                        label={
                            <Typography variant="body2" component="p">
                                Acepto los&nbsp; <Link onClick={openTermsAndConditionModal} underline="always">Términos y condiciones y la Política de privacidad</Link>
                            </Typography>
                        }
                        name="termsAndCondition"
                        checked={values.termsAndCondition}
                        onChange={handleInputChange}
                    />
                    <FormHelperText>{errors.termsAndCondition}</FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                {userError && <Alert action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setUserError(null);
                        }}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                } severity="error">{userError}</Alert>}
            </Grid>
            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="outlined" size="large" onClick={goToPreviousForm}>regresar</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button variant="contained" size="large" onClick={handleClickAccept} disabled={disabledButtonState}>Aceptar</Button>
            </Grid>
        </>
    )
}
