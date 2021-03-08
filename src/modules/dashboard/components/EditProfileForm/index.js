import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select } from "@material-ui/core";

import { Button, TextInput } from "../../../shared/components";
import { useForm } from "../../../hooks";
import { isEmail, isRuc } from "../../../shared/libs/validators";

import { updateAccount } from "../../../../store/actions/auth/auth.action";

export default function Editprofile({ setIsEditActive, userData, setOpenAlert }) {
    const { auth: { user: { account } }, utils: { items } } = useSelector(state => state);
    const dispatch = useDispatch();

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('razon_social' in fieldValues)
            temp.razon_social = fieldValues.razon_social ? "" : "El campo es requerido."
        if ('document_number' in fieldValues)
            temp.document_number = fieldValues.document_number ? (isRuc(fieldValues.document_number) ? "" : "El RUC debe ser de 11 digitos") : "El campo es requerido."
        if ('first_name' in fieldValues)
            temp.first_name = fieldValues.first_name ? "" : "El campo es requerido."
        if ('last_name' in fieldValues)
            temp.last_name = fieldValues.last_name ? "" : "El campo es requerido."
        if ('email' in fieldValues)
            temp.email = fieldValues.email ? (isEmail(fieldValues.document_number) ? "" : "Ingrese un correo electronico válido.") : "El campo es requerido."
        if ('position' in fieldValues)
            temp.position = fieldValues.position ? "" : "El campo es requerido."
        if ('area' in fieldValues)
            temp.area = fieldValues.area ? "" : "El campo es requerido."
        if (account.role == "business") {
            if ('rubro' in fieldValues)
                temp.rubro = fieldValues.rubro ? "" : "El campo es requerido."
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
    } = useForm(userData, true, validate);

    const handleUpdate = async () => {
        let body = {
            email: values.email,
            razon_social: values.razon_social,
            user: {
                first_name: values.first_name,
                last_name: values.last_name,
                document_number: values.document_number,
                phone: values.phone,
                area_input: values.area,
                cargo_input: values.position,
                interest_rubro_id: values.rubro
            }
        }
        dispatch(updateAccount(body))
        setIsEditActive(false)
        setOpenAlert(true)

    }



    return (
        <>
            <Grid item xs={12}>
                <h2 className="dashboard-subtitle">
                    Datos de la empresa
                </h2>
            </Grid>
            <Grid item xs={12}>
                <TextInput
                    id="outlined-basic"
                    label="Razón social"
                    variant="outlined"
                    fullWidth
                    name="razon_social"
                    value={values.razon_social}
                    onChange={handleInputChange}
                    error={errors.razon_social ? true : false}
                    helperText={errors.razon_social}
                />
            </Grid>
            <Grid item xs={12}>
                <TextInput
                    id="outlined-basic"
                    label="RUC"
                    variant="outlined"
                    fullWidth
                    name="document_number"
                    value={values.document_number}
                    onChange={handleInputChange}
                    error={errors.document_number ? true : false}
                    helperText={errors.document_number}
                />
            </Grid>
            <Grid item xs={12}>
                <TextInput
                    id="outlined-basic"
                    label="Teléfono"
                    variant="outlined"
                    fullWidth
                    name="phone"
                    value={values.phone}
                    onChange={handleInputChange}
                    error={errors.phone ? true : false}
                    helperText={errors.phone}
                />
            </Grid>

            {
                account.role === "business" &&
                <Grid item xs={12}>
                    <FormControl variant="outlined" fullWidth error={errors.rubro ? true : false}>
                        <InputLabel id="demo-simple-select-outlined-label">Rubro</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            name="rubro"
                            value={values.rubro || ""}
                            onChange={handleInputChange}
                            label="Rubro"
                        >
                            {items.length > 0 && items.map(element =>
                                <MenuItem key={element.id} value={element.id}>{element.name}</MenuItem>
                            )}
                        </Select>
                        <FormHelperText>{errors.rubro}</FormHelperText>
                    </FormControl>
                </Grid>
            }

            <Grid item xs={12}></Grid>
            <Grid item xs={12}>
                <h2 className="dashboard-subtitle">
                    Datos del representante
                </h2>
            </Grid>
            <br />
            <Grid item xs={12}>
                <TextInput
                    id="outlined-basic"
                    label="Nombre"
                    variant="outlined"
                    fullWidth
                    name="first_name"
                    value={values.first_name}
                    onChange={handleInputChange}
                    error={errors.first_name ? true : false}
                    helperText={errors.first_name}
                />
            </Grid>
            <Grid item xs={12}>
                <TextInput
                    id="outlined-basic"
                    label="Apellidos"
                    variant="outlined"
                    fullWidth
                    name="last_name"
                    value={values.last_name}
                    onChange={handleInputChange}
                    error={errors.last_name ? true : false}
                    helperText={errors.last_name}
                />
            </Grid>

            <Grid item xs={12}>
                <TextInput
                    id="outlined-basic"
                    label="Correo electrónico"
                    variant="outlined"
                    fullWidth
                    name="email"
                    value={values.email}
                    onChange={handleInputChange}
                    error={errors.email ? true : false}
                    helperText={errors.email}
                />
            </Grid>
            <Grid item xs={12}>
                <TextInput
                    id="outlined-basic"
                    label="Cargo"
                    variant="outlined"
                    fullWidth
                    name="position"
                    value={values.position}
                    onChange={handleInputChange}
                    error={errors.position ? true : false}
                    helperText={errors.position}
                />
            </Grid>
            <Grid item xs={12}>
                <TextInput
                    id="outlined-basic"
                    label="Área"
                    variant="outlined"
                    fullWidth
                    name="area"
                    value={values.area}
                    onChange={handleInputChange}
                    error={errors.area ? true : false}
                    helperText={errors.area}
                />
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={5}>
                <Button
                    variant="outlined"
                    color="secondary"
                    size="large"
                    fullWidth
                    onClick={() => setIsEditActive(false)}
                >
                    CANCELAR
                </Button>
            </Grid>
            <Grid item xs={5}>
                <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    fullWidth
                    onClick={handleUpdate}
                    disabled={disabledButtonState}
                >
                    ACTUALIZAR
                </Button>
            </Grid>
        </>
    )
}
