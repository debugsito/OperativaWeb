

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, FormControlLabel, RadioGroup } from '@material-ui/core';
import { useForm } from "../../../hooks";
import { Button, Snackbars, Modal, Typography, TextInput } from "../../../shared/components";
import { Radio } from '../../../shared/components';

const defaultValues = {
    change_your_mind: null,
    covid_time: null,
    diabetes: null,
    easy_to_take_transport: null,
    financial_help_at_home: null,
    had_covid: null,
    have_allergy: null,
    have_any_operation: null,
    have_any_operation_text: null,
    have_children: null,
    live_alone: null,
    motivates_working_as_operator: null,
    person_in_charge: null,
    person_under_care: null,
    person_under_care_text: "",
    problems_with_your_bosses: null,
    quit_because_dont_like: null,
    received_extra_bonus: null,
    rented_or_own_house: null,
    says_your_opinion: null,
    spinal_problems: null,
    support_child_care: null,
    teamwork: null,
    was_part_of_a_union: null,
    wear_glasses: null,
    worked_as_an_operator: null,
}




export default function ApplicantQuestionnaire({ user, handleSaveQuestionnaire }) {
    let initialValues = user ? user : defaultValues;
    const dispatch = useDispatch()
    const [openAlert, setOpenAlert] = useState(false)
    const [openModal, setOpenModal] = useState(false)



    useEffect(() => {
        // console.log("userData", userData)
    })


    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        // if ('interest_rubro_id' in fieldValues)
        //     temp.interest_rubro_id = fieldValues.interest_rubro_id ? "" : "El campo es requerido."

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
        handleSaveQuestionnaire(values)
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

            <div className="title-form">
                <h3>Familia</h3>
            </div>
            <Grid container spacing={3} style={{ padding: 10 }}>
                <Grid item xs={12} md={12} >
                    <Typography variant="body1" component="p" className="title-color">
                        ¿Tiene hijos?
                    </Typography>
                    <FormControl component="fieldset" >
                        <RadioGroup row aria-label="have_children"
                            name="have_children"
                            value={values.have_children} onChange={handleInputChange}
                        >
                            <FormControlLabel value="1" control={<Radio />} label="Sí" />
                            <FormControlLabel value="0" control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>

                </Grid>

                <Grid item xs={12} md={12}>

                    <Typography variant="body1" component="p" className="title-color">
                        Cuando usted trabaja ¿Quién le apoya con el cuidado de sus hijos?
                    </Typography>

                    <TextInput
                        fullWidth
                        label="Escriba aquí"
                        name="support_child_care"
                        value={values.support_child_care}
                        onChange={handleInputChange}
                    // helperText={errors.otherSpeciality}
                    // error={errors.otherSpeciality ? true : false}
                    />

                </Grid>

                <Grid item xs={12} md={3}>
                    <Typography variant="body1" component="p" className="title-color">
                        ¿Tiene alguna persona bajo su responsabilidad?
                    </Typography>

                    <FormControl component="fieldset" >
                        <RadioGroup row aria-label="person_under_care"
                            name="person_under_care"
                            value={values.person_under_care} onChange={handleInputChange}
                        >
                            <FormControlLabel value="1" control={<Radio />} label="Sí" />
                            <FormControlLabel value="0" control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>

                </Grid>

                <Grid item xs={12} md={9}>

                    <TextInput
                        fullWidth
                        label="Especifique su respuesta"
                        name="person_under_care_text"
                        value={values.person_under_care_text}
                        onChange={handleInputChange}
                    // helperText={errors.otherSpeciality}
                    // error={errors.otherSpeciality ? true : false}
                    />

                </Grid>

                <Grid item xs={12} md={12}>
                    <Typography variant="body1" component="p" className="title-color">
                        ¿Vive solo/a?
                    </Typography>

                    <FormControl component="fieldset" >
                        <RadioGroup row aria-label="live_alone"
                            name="live_alone"
                            value={values.live_alone} onChange={handleInputChange}
                        >
                            <FormControlLabel value="1" control={<Radio />} label="Sí" />
                            <FormControlLabel value="0" control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>

                </Grid>

            </Grid>

            <div className="title-form">
                <h3>Economía</h3>
            </div>
            <Grid container spacing={3} style={{ padding: 10 }}>

                <Grid item xs={12} md={12} >
                    <Typography variant="body1" component="p" className="title-color">
                        Su vivienda es:
                    </Typography>

                    <FormControl component="fieldset" >
                        <RadioGroup row aria-label="rented_or_own_house"
                            name="rented_or_own_house"
                            value={values.rented_or_own_house} onChange={handleInputChange}
                        >
                            <FormControlLabel value="1" control={<Radio />} label="Alquilada" />
                            <FormControlLabel value="0" control={<Radio />} label="Propia" />
                        </RadioGroup>
                    </FormControl>

                </Grid>
                <Grid item xs={12} md={12} >
                    <Typography variant="body1" component="p" className="title-color">
                        ¿Percibiste bonificaciones extras?
                    </Typography>

                    <FormControl component="fieldset" >
                        <RadioGroup row aria-label="received_extra_bonus"
                            name="received_extra_bonus"
                            value={values.received_extra_bonus} onChange={handleInputChange}
                        >
                            <FormControlLabel value="1" control={<Radio />} label="Sí" />
                            <FormControlLabel value="0" control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>

                </Grid>
                <Grid item xs={12} md={12} >
                    <Typography variant="body1" component="p" className="title-color">
                        ¿Ayuda economicamente en su hogar?
                    </Typography>

                    <FormControl component="fieldset" >
                        <RadioGroup row aria-label="financial_help_at_home"
                            name="financial_help_at_home"
                            value={values.financial_help_at_home} onChange={handleInputChange}
                        >
                            <FormControlLabel value="1" control={<Radio />} label="Sí" />
                            <FormControlLabel value="0" control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>

                </Grid>
            </Grid>
            <div className="title-form">
                <h3>Ubicación</h3>
            </div>
            <Grid container spacing={3} style={{ padding: 10 }}>
                <Grid item xs={12} md={12} >
                    <Typography variant="body1" component="p" className="title-color">
                        ¿Le es fácil tomar un vehículo para dirigirse a su centro de labores u otros lugares?
                    </Typography>

                    <FormControl component="fieldset" >
                        <RadioGroup row aria-label="easy_to_take_transport"
                            name="easy_to_take_transport"
                            value={values.easy_to_take_transport} onChange={handleInputChange}
                        >
                            <FormControlLabel value="1" control={<Radio />} label="Sí" />
                            <FormControlLabel value="0" control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>

                </Grid>

            </Grid>
            <div className="title-form">
                <h3>Laboral</h3>
            </div>
            <Grid container spacing={3} style={{ padding: 10 }}>
                <Grid item xs={12} md={12} >
                    <Typography variant="body1" component="p" className="title-color">
                        ¿Anteriormente, ha trabajado como operario?
                    </Typography>

                    <FormControl component="fieldset" >
                        <RadioGroup row aria-label="worked_as_an_operator"
                            name="worked_as_an_operator"
                            value={values.worked_as_an_operator} onChange={handleInputChange}
                        >
                            <FormControlLabel value="1" control={<Radio />} label="Sí" />
                            <FormControlLabel value="0" control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>

                </Grid>
                <Grid item xs={12} md={12} >
                    <Typography variant="body1" component="p" className="title-color">
                        ¿Alguna vez abandonó un trabajo porque no le gustaba?
                    </Typography>

                    <FormControl component="fieldset" >
                        <RadioGroup row aria-label="quit_because_dont_like"
                            name="quit_because_dont_like"
                            value={values.quit_because_dont_like} onChange={handleInputChange}
                        >
                            <FormControlLabel value="1" control={<Radio />} label="Sí" />
                            <FormControlLabel value="0" control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>

                </Grid>
                <Grid item xs={12} md={12} >
                    <Typography variant="body1" component="p" className="title-color">
                        ¿Pertenecia a algún sindicato?
                    </Typography>

                    <FormControl component="fieldset" >
                        <RadioGroup row aria-label="was_part_of_a_union"
                            name="was_part_of_a_union"
                            value={values.was_part_of_a_union} onChange={handleInputChange}
                        >
                            <FormControlLabel value="1" control={<Radio />} label="Sí" />
                            <FormControlLabel value="0" control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>

                </Grid>
            </Grid>
            <div className="title-form">
                <h3>Salud</h3>
            </div>
            <Grid container spacing={3} style={{ padding: 10 }}>
                <Grid item xs={12} md={12} >
                    <Typography variant="body1" component="p" className="title-color">
                        ¿Sufre de alguna alergía?
                    </Typography>

                    <FormControl component="fieldset" >
                        <RadioGroup row aria-label="have_allergy"
                            name="have_allergy"
                            value={values.have_allergy} onChange={handleInputChange}
                        >
                            <FormControlLabel value="1" control={<Radio />} label="Sí" />
                            <FormControlLabel value="0" control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>

                </Grid>
                <Grid item xs={12} md={2} >
                    <Typography variant="body1" component="p" className="title-color">
                        ¿Tiene alguna operación?
                    </Typography>

                    <FormControl component="fieldset" >
                        <RadioGroup row aria-label="have_any_operation"
                            name="have_any_operation"
                            value={values.have_any_operation} onChange={handleInputChange}
                        >
                            <FormControlLabel value="1" control={<Radio />} label="Sí" />
                            <FormControlLabel value="0" control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>

                </Grid>
                <Grid item xs={12} md={10} >

                    <TextInput
                        fullWidth
                        label="Especifique su respuesta"
                        name="have_any_operation_text"
                        value={values.have_any_operation_text}
                        onChange={handleInputChange}
                    // helperText={errors.otherSpeciality}
                    // error={errors.otherSpeciality ? true : false}
                    />

                </Grid>

                <Grid item xs={12} md={12} >
                    <Typography variant="body1" component="p" className="title-color">
                        ¿Has presentado problemas en la columna?
                    </Typography>

                    <FormControl component="fieldset" >
                        <RadioGroup row aria-label="spinal_problems"
                            name="spinal_problems"
                            value={values.spinal_problems} onChange={handleInputChange}
                        >
                            <FormControlLabel value="1" control={<Radio />} label="Sí" />
                            <FormControlLabel value="0" control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>

                </Grid>
                <Grid item xs={12} md={12} >
                    <Typography variant="body1" component="p" className="title-color">
                        ¿Sufre de diabetes?
                    </Typography>

                    <FormControl component="fieldset" >
                        <RadioGroup row aria-label="diabetes"
                            name="diabetes"
                            value={values.diabetes} onChange={handleInputChange}
                        >
                            <FormControlLabel value="1" control={<Radio />} label="Sí" />
                            <FormControlLabel value="0" control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>

                </Grid>
                <Grid item xs={12} md={12} >
                    <Typography variant="body1" component="p" className="title-color">
                        ¿Usa lentes?
                    </Typography>

                    <FormControl component="fieldset" >
                        <RadioGroup row aria-label="wear_glasses"
                            name="wear_glasses"
                            value={values.wear_glasses} onChange={handleInputChange}
                        >
                            <FormControlLabel value="1" control={<Radio />} label="Sí" />
                            <FormControlLabel value="0" control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>

                </Grid>

                <Grid item xs={12} md={2} >
                    <Typography variant="body1" component="p" className="title-color">
                        ¿Has tenido Covid-19?
                    </Typography>

                    <FormControl component="fieldset" >
                        <RadioGroup row aria-label="had_covid"
                            name="had_covid"
                            value={values.had_covid} onChange={handleInputChange}
                        >
                            <FormControlLabel value="1" control={<Radio />} label="Sí" />
                            <FormControlLabel value="0" control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>

                </Grid>
                <Grid item xs={12} md={10}>
                    <FormControl variant="outlined" style={{ width: '100%' }}
                    // fullWidth error={errors.provider_id ? true : false}
                    >
                        <InputLabel id="demo-simple-select-outlined-label">¿Hace cuanto tiempo?</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            name="covid_time"
                            value={values.covid_time}
                            onChange={handleInputChange}
                            label="¿Hace cuanto tiempo?"
                        >
                            {/* {providers.map(element =>
                                <MenuItem key={element.id} value={element.id}>{element.name}</MenuItem>
                            )} */}
                            <MenuItem key="option-1" value="1">2 Semanas</MenuItem>
                            <MenuItem key="option-2" value="2">Hace un mes</MenuItem>
                            <MenuItem key="option-3" value="3">Hace 6 meses</MenuItem>
                            <MenuItem key="option-4" value="4">Hace 1 año</MenuItem>
                        </Select>
                        {/* <FormHelperText>{errors.provider_id}</FormHelperText> */}
                    </FormControl>
                </Grid>


            </Grid>

            <div className="title-form">
                <h3>Área personal</h3>
            </div>

            <Grid container spacing={3} style={{ padding: 10 }}>
                <Grid item xs={12} md={12} >
                    <Typography variant="body1" component="p" className="title-color">
                        ¿Si uted no está contento con alguna situación suele decirlo?
                    </Typography>

                    <FormControl component="fieldset" >
                        <RadioGroup row aria-label="says_your_opinion"
                             name="says_your_opinion"
                             value={values.says_your_opinion} onChange={handleInputChange}
                        >
                            <FormControlLabel value="1" control={<Radio />} label="Sí" />
                            <FormControlLabel value="0" control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>

                </Grid>
                <Grid item xs={12} md={12} >
                    <Typography variant="body1" component="p" className="title-color">
                        ¿Se considera una persona responsable?
                    </Typography>

                    <FormControl component="fieldset" >
                        <RadioGroup row aria-label="person_in_charge"
                         name="person_in_charge"
                         value={values.person_in_charge} onChange={handleInputChange}
                        >
                            <FormControlLabel value="1" control={<Radio />} label="Sí" />
                            <FormControlLabel value="0" control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>

                </Grid>
                <Grid item xs={12} md={12} >
                    <Typography variant="body1" component="p" className="title-color">
                        ¿Le motivia trabajar como operario?
                    </Typography>

                    <FormControl component="fieldset" >
                        <RadioGroup row aria-label="motivates_working_as_operator"
                              name="motivates_working_as_operator"
                              value={values.motivates_working_as_operator} onChange={handleInputChange}
                        >
                            <FormControlLabel value="1" control={<Radio />} label="Sí" />
                            <FormControlLabel value="0" control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>

                </Grid>
                <Grid item xs={12} md={12} >
                    <Typography variant="body1" component="p" className="title-color">
                        ¿Cúando toma desiciones suele cambiar de parecer a cada momento?
                    </Typography>

                    <FormControl component="fieldset" >
                        <RadioGroup row aria-label="change_your_mind"
                             name="change_your_mind"
                             value={values.change_your_mind} onChange={handleInputChange}
                        >
                            <FormControlLabel value="1" control={<Radio />} label="Sí" />
                            <FormControlLabel value="0" control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>

                </Grid>
                <Grid item xs={12} md={12} >
                    <Typography variant="body1" component="p" className="title-color">
                        ¿Tuviste problemas alguna vez con compañeros o jefes?
                    </Typography>

                    <FormControl component="fieldset" >
                        <RadioGroup row aria-label="problems_with_your_bosses"
                             name="problems_with_your_bosses"
                             value={values.problems_with_your_bosses} onChange={handleInputChange}
                        >
                            <FormControlLabel value="1" control={<Radio />} label="Sí" />
                            <FormControlLabel value="0" control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>

                </Grid>
                <Grid item xs={12} md={12} >
                    <Typography variant="body1" component="p" className="title-color">
                        ¿Prefieres trabajar solo o en grupo?
                    </Typography>

                    <FormControl component="fieldset" >
                        <RadioGroup row aria-label="teamwork"
                             name="teamwork"
                             value={values.teamwork} onChange={handleInputChange}
                        >
                            <FormControlLabel value="1" control={<Radio />} label="Solo" />
                            <FormControlLabel value="0" control={<Radio />} label="Grupo" />
                        </RadioGroup>
                    </FormControl>

                </Grid>
            </Grid>

            <Grid item xs={12} md={12} className="justify-end">
                <Button variant="contained" size="large" onClick={handleClickFinish}>Terminar</Button>
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