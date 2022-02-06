import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"

import { Grid, MenuItem } from '@material-ui/core'
import { Select, Button, Snackbars, Modal, Typography } from "../../../shared/components";

import { actions_Utils } from "../../../../store/actions";
import { useForm } from "../../../hooks";

const defaultValues = {
    interest_rubro_id: ""
}

export default function Index({ userData, handleSaveAreasOfInterest }) {

    const initialValues = userData ? userData : defaultValues
    const dispatch = useDispatch()
    const { items } = useSelector(state => state.utils)
    const [openAlert, setOpenAlert] = useState(false)
    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        // console.log("userData", userData)
    })


    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('interest_rubro_id' in fieldValues)
            temp.interest_rubro_id = fieldValues.interest_rubro_id ? "" : "El campo es requerido."

        setErrors({ ...temp })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
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
        dispatch(actions_Utils.getItems())
    }, [])

    const handleCloseAlert = () => {
        setOpenAlert(false)
    }

    const handleClickFinish = () => {
        if (!disabledButtonState) {
            setOpenModal(true)
        } else {
            validate();
            setOpenAlert(true)
            return
        }
    }

    const handleSaveOption = () => {
        handleSaveAreasOfInterest(values)
        setOpenModal(false)
    }

    const bodyModal = (
        <Grid container spacing={3} direction="column" justify="center" alignItems="center">
            <Grid item xs={12}>
                <Typography variant="body1">La creación de tu CV se ha realizado con éxito. ¿Deseas guardar tu CV?</Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={3} justify="center">
                    <Grid item xs={6}>
                        <Button variant="outlined" onClick={() => setOpenModal(false)}>CANCELAR</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" onClick={handleSaveOption}>GUARDAR</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );

    return (
        <Grid container spacing={3} style={{ padding: 20 }}>
            <Grid item xs={10} sm={10} md={10} lg={10}>
                <Typography variant="body1" component="p" className="title-color">
                    Seleccione el rubro principal de su interés.
                </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                <Select
                    label="Rubro"
                    name="interest_rubro_id"
                    value={values.interest_rubro_id}
                    onChange={handleInputChange}
                    error={errors.interest_rubro_id ? true : false}
                    helperText={errors.interest_rubro_id}
                >
                    {items.length > 0 && items.map(element =>
                        <MenuItem key={element.id} value={element.id}>{element.name}</MenuItem>
                    )}

                </Select>
            </Grid>
            <Grid item xs={12} className="justify-center">
                {/* <Button variant="outlined" size="large" onClick={() => history.push('/')}>Cancelar</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
                <Button variant="contained" size="large" onClick={handleClickFinish}>Finalizar</Button>
            </Grid>

            <Modal open={openModal} handleCloseModal={() => setOpenModal(false)} >
                {bodyModal}
            </Modal>

            <Snackbars
                open={openAlert}
                onClose={handleCloseAlert}
            />
        </Grid>
    )
}
