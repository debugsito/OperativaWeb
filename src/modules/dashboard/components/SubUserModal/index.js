import React from 'react';
import { FormControl, Grid } from '@material-ui/core';
import { Button, TextInput, Modal } from '../../../shared/components';
import { useForm } from "../../../hooks/useForm"
import { isEmail } from "../../../shared/libs/validators";


const initialValues = {
    first_name: '',
    last_name: '',
    cargo_input: '',
    area_input: '',
    email: '',
}

export default function SimpleModal({ open, handleCloseModal, executeAction }) {

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('first_name' in fieldValues)
            temp.first_name = fieldValues.first_name ? "" : "El campo es requerido."
        if ('last_name' in fieldValues)
            temp.last_name = fieldValues.last_name ? "" : "El campo es requerido."
        if ('cargo_input' in fieldValues)
            temp.cargo_input = fieldValues.cargo_input ? "" : "El campo es requerido."
        if ('area_input' in fieldValues)
            temp.area_input = fieldValues.area_input ? "" : "El campo es requerido."
        if ('email' in fieldValues)
            temp.email = fieldValues.email ? (isEmail(fieldValues.email) ? "" : "Correo electronico no válido") : "El campo es requerido."
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

    const handleSave = () => {
        const { email, first_name, last_name, area_input, cargo_input } = values
        let valuesTemp = {
            email,
            user: {
                first_name,
                last_name,
                area_input,
                cargo_input
            }
        }
        executeAction(valuesTemp)
    }

    const body = (
        <>
            <h2 id="simple-modal-title">Nuevo Usuario</h2>
            <FormControl component="fieldset" fullWidth={true}>
                <Grid container spacing={3} style={{ padding: 10 }}>
                    <Grid item xs={12} justify="center">
                        <TextInput
                            fullWidth
                            name="first_name"
                            label="Nombre"
                            value={values.first_name}
                            onChange={handleInputChange}
                            error={errors.first_name ? true : false}
                            helperText={errors.first_name}
                        />
                    </Grid>
                    <Grid item xs={12} justify="center">
                        <TextInput
                            fullWidth
                            name="last_name"
                            label="Apellido"
                            value={values.last_name}
                            onChange={handleInputChange}
                            error={errors.last_name ? true : false}
                            helperText={errors.last_name}
                        />
                    </Grid>
                    <Grid item xs={12} justify="center">
                        <TextInput
                            fullWidth
                            name="cargo_input"
                            label="Cargo"
                            value={values.cargo_input}
                            onChange={handleInputChange}
                            error={errors.cargo_input ? true : false}
                            helperText={errors.cargo_input}
                        />
                    </Grid>

                    <Grid item xs={12} justify="center">
                        <TextInput
                            fullWidth
                            name="area_input"
                            label="Area"
                            value={values.area_input}
                            onChange={handleInputChange}
                            error={errors.area_input ? true : false}
                            helperText={errors.area_input}
                        />
                    </Grid>

                    <Grid item xs={12} justify="center">
                        <TextInput
                            fullWidth
                            name="email"
                            label="Correo eletrónico"
                            value={values.email}
                            onChange={handleInputChange}
                            error={errors.email ? true : false}
                            helperText={errors.email}
                        />
                    </Grid>
                </Grid>
            </FormControl>
            <Grid container spacing={3} direction="row" justify="center" style={{ marginTop: 5 }}>
                <Grid item >
                    <Button variant="outlined" onClick={handleCloseModal}>CANCELAR</Button>
                </Grid>
                <Grid item >
                    <Button variant="contained" onClick={handleSave} disabled={disabledButtonState}>ACEPTAR</Button>
                </Grid>
            </Grid>
        </>
    );

    return (
        <div>
            <Modal
                open={open}
                onClose={handleCloseModal}
            >
                {body}
            </Modal>
        </div>
    );
}
