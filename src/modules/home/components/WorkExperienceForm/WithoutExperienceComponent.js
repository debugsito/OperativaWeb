import React, { useState, useEffect } from 'react';
import {
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Grid,
    RadioGroup,
    Typography,
    Paper
} from '@material-ui/core';

import { Button, Radio, Snackbars, Modal } from '../../../shared/components';
import { makeStyles } from '@material-ui/core/styles';


const useStyle = makeStyles(theme => ({
    defaultButton: {
        backgroundColor: 'white',
        color: 'black',
        border: 'solid 1px',
        borderColor: 'black',
        "&:hover": {
            background: "white"
        },
        marginRight: '1.5rem'
    },
    defaultRadios: {
        borderRadius: '30px'
    },
    paper: {
        padding: "2.5rem"
    },
}))

export default function WithoutExperienceComponent({ user, handleFinish, history, setOption }) {
    const userData = user;
    const [area, setArea] = useState({ value: '', error: false });
    const [specificArea, setSpecificArea] = useState({ value: '', error: false });
    const [hasVolunteering, setHasVolunteering] = useState({ value: '', error: false });
    const [hasRotativeSchedules, setHasRotativeSchedules] = useState({ value: '', error: false });
    const [hasExtraHours, setHasExtraHours] = useState({ value: '', error: false });
    const [hasWeekend, setHasWeekend] = useState({ value: '', error: false });
    const [openAlert, setOpenAlert] = useState(false)
    const classes = useStyle()
    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        setHasVolunteering({ ...hasVolunteering, value: userData?.volunteering === 0 ? 'no' : (userData?.volunteering === 1 ? 'yes' : '') });
        setHasRotativeSchedules({ ...hasRotativeSchedules, value: userData?.rotating_schedule === 0 ? 'no' : (userData?.rotating_schedule === 1 ? 'yes' : '') });
        setHasExtraHours({ ...hasExtraHours, value: userData?.extra_hours === 0 ? 'no' : (userData?.extra_hours === 1 ? 'yes' : '') });
        setHasWeekend({ ...hasWeekend, value: userData?.work_weekend === 0 ? 'no' : (userData?.work_weekend === 1 ? 'yes' : '') });
    }, [user])

    const handleCloseAlert = () => {
        setOpenAlert(false)
    }


    const handleClickFinish = (option) => {
        if (!isButtonDisabled()) {
            setOption(option)
            setOpenModal(true)
        } else {
            setOpenAlert(true)
        }
    }

    const handleSave = () => {
        const body = {
            volunteering: parseInt(hasVolunteering.value === "yes" ? 1 : 0),
            rotating_schedule: parseInt(hasRotativeSchedules.value === "yes" ? 1 : 0),
            extra_hours: parseInt(hasExtraHours.value === "yes" ? 1 : 0),
            work_weekend: parseInt(hasWeekend.value === "yes" ? 1 : 0),
        };
        if (!isButtonDisabled()) {
            handleFinish(body)
        } else {
            setOpenAlert(true)
        }
    }

    const validateHasVolunteering = (value = hasVolunteering.value) => setHasVolunteering({ value: value, error: !value });
    const validateHasRotativeSchedules = (value = hasRotativeSchedules.value) => setHasRotativeSchedules({ value: value, error: !value });
    const validateHasExtraHours = (value = hasExtraHours.value) => setHasExtraHours({ value: value, error: !value });
    const validateHasWeekend = (value = hasWeekend.value) => setHasWeekend({ value: value, error: !value });

    const isButtonDisabled = () => {
        return !hasVolunteering.value || !hasRotativeSchedules.value || !hasExtraHours.value || !hasWeekend.value
    }



    const bodyModal = (
        <Grid container spacing={3} direction="column" justifyContent="center" alignItems="center">
            <Grid item xs={12}>
                <Typography variant="body1">¿Deseas guardar tu Experiencia laboral?</Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={6}>
                        <Button variant="outlined" onClick={() => setOpenModal(false)}>CANCELAR</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" onClick={handleSave}>GUARDAR</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );

    return (
        <>
            <Paper className={classes.paper}>
                <Grid container spacing={3} justify="center">
                    <Grid item xs={11}>
                        <Grid container direction="row" justify="space-between">
                            <Grid container spacing={3} style={{ padding: 20 }}>
                                <Grid item xs={12} md={12}>
                                    <FormControl component="fieldset" error={hasVolunteering.error}>
                                        <FormLabel component="legend">¿Has realizado algún tipo de voluntariado?</FormLabel>
                                        <RadioGroup row aria-label="hasVolunteering" name="hasVolunteering" value={hasVolunteering.value} onChange={(event) => validateHasVolunteering(event.target.value)}>
                                            <FormControlLabel value="yes" control={<Radio />} label="Sí" />
                                            <FormControlLabel value="no" control={<Radio />} label="No" />
                                        </RadioGroup>
                                        {hasVolunteering.error && <FormHelperText>Este campo es requerido</FormHelperText>}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <FormControl component="fieldset" error={hasRotativeSchedules.error}>
                                        <FormLabel component="legend">¿Cuenta con disponibilidad para trabajar en horarios rotativos?</FormLabel>
                                        <RadioGroup row aria-label="hasRotativeSchedules" name="hasRotativeSchedules" value={hasRotativeSchedules.value} onChange={(event) => validateHasRotativeSchedules(event.target.value)}>
                                            <FormControlLabel value="yes" control={<Radio />} label="Sí" />
                                            <FormControlLabel value="no" control={<Radio />} label="No" />
                                        </RadioGroup>
                                        {hasRotativeSchedules.error && <FormHelperText>Este campo es requerido</FormHelperText>}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <FormControl component="fieldset" error={hasExtraHours.error}>
                                        <FormLabel component="legend">¿Cuenta con disponibilidad para trabajar horas extras?</FormLabel>
                                        <RadioGroup row aria-label="hasExtraHours" name="hasExtraHours" value={hasExtraHours.value} onChange={(event) => validateHasExtraHours(event.target.value)}>
                                            <FormControlLabel value="yes" control={<Radio />} label="Sí" />
                                            <FormControlLabel value="no" control={<Radio />} label="No" />
                                        </RadioGroup>
                                        {hasExtraHours.error && <FormHelperText>Este campo es requerido</FormHelperText>}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <FormControl component="fieldset" error={hasWeekend.error}>
                                        <FormLabel component="legend">¿Cuenta con disponibilidad para trabajos fin de semana?</FormLabel>
                                        <RadioGroup row aria-label="hasWeekend" name="hasWeekend" value={hasWeekend.value} onChange={(event) => validateHasWeekend(event.target.value)}>
                                            <FormControlLabel value="yes" control={<Radio />} label="Sí" />
                                            <FormControlLabel value="no" control={<Radio />} label="No" />
                                        </RadioGroup>
                                        {hasWeekend.error && <FormHelperText>Este campo es requerido</FormHelperText>}
                                    </FormControl>
                                </Grid>
                                <Modal open={openModal} handleCloseModal={() => setOpenModal(false)} >
                                    {bodyModal}
                                </Modal>
                                <Grid item xs={12} md={12} className="justify-end">
                                    <Button className={classes.defaultButton + " " + classes.defaultRadios} variant="contained" size="large" onClick={(e) => handleClickFinish(1)}>Salir y Guardar</Button>
                                    <Button className={classes.defaultRadios} variant="contained" size="large" onClick={(e) => handleClickFinish(2)}>Siguiente</Button>
                                </Grid>
                                <Snackbars
                                    open={openAlert}
                                    onClose={handleCloseAlert}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
}