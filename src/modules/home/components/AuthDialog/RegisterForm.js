import React from 'react'
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom"
import { FormControlLabel, Grid, RadioGroup, Typography } from '@material-ui/core';

import { useForm } from "../../../hooks"
import { Button, Radio } from "../../../shared/components";
import { setAccountType } from "../../../../store/actions/auth/auth.action";

const initialValues = {
    accountType: "",
}
export default function SignInPostulantDialog() {
    const dispatch = useDispatch()
    const history = useHistory()

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('accountType' in fieldValues)
            temp.accountType = fieldValues.accountType ? "" : "El campo es requerido."

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

    const handleClickAccept = () => {
        let accountType = ""
        switch (values.accountType) {
            case "empresa":
                accountType = "company"
                break;
            case "municipalidad":
                accountType = "municipality"
                break;
            case "postulante":
                accountType = "applicant"
                break;
            default:
                break;
        }
        dispatch(setAccountType(accountType))
        history.push(`/${values.accountType}/registro`, { type: values.accountType })
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Typography variant="h6" component="h6">
                    Cuéntanos
                </Typography>
                <Typography variant="body1" component="p">
                    ¿Para quién desea crear la cuenta?
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <RadioGroup aria-label="accountType" value={values.accountType} onChange={handleInputChange}>
                    <FormControlLabel value="empresa" name="accountType" control={<Radio />} label="Empresa" />
                    <FormControlLabel value="municipalidad" name="accountType" control={<Radio />} label="Municipalidad" />
                    <FormControlLabel value="postulante" name="accountType" control={<Radio />} label="Postulante" />
                </RadioGroup>
            </Grid>
            <Grid item xs={12}>
                <Grid container justify="center">
                    <Grid item xs={6}>
                        <Button variant="outlined" size="large">cancelar</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" size="large" onClick={handleClickAccept}>aceptar</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
