import React, { useState, useEffect } from 'react';
import { Divider, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, InputLabel, MenuItem, RadioGroup, Select, Typography } from '@material-ui/core';
import { AutocompleteTemp, Button, Checkbox, Radio, TextInput, Modal, Snackbars } from '../../../shared/components';
import { itemsList, jobLevelsList, withdrawalReasonsList } from '../../../../store/services/utils.service';
import { onlyNumbers, onlyLetters } from '../../../shared/libs/validators';
import { useForm } from "../../../hooks/useForm";
import { DateTime } from "luxon";

const defaultValues = {
    position: "",
    company: "",
    district: null,
    rubro_id: "",
    startDate: "",
    finishDate: "",
    weeklyHours: "",
    monthlyIncome: "",
    hasExtraHours: "",
    commitmentDegree: "",
    workingRelationship: "",
    withdrawalReason: "",

}

export default function WithExperienceComponent({ handleDeleteWorkExperience, handleUpdateWorkExperience, handleAddWorkExperience, handleSaveExperience, index, length, user }) {
    let initialValues = user ? user : defaultValues
    const dateLocal = DateTime.local().toFormat("yyyy-LL") //Don't use momentjs, will soon be deprecated
    const [showCheckBox] = useState(index >= 1)
    const [isHidden, setIsHidden] = useState(false) //Si la lista tiene mas de 1 elemento
    const [openConfirmationModal, setOpenConfirmationModal] = useState(false)
    const [openAlert, setOpenAlert] = useState(false)

    const validate = (fieldValues = values) => {
        let temp = { ...errors }

        if ('position' in fieldValues)
            temp.position = fieldValues.position ? "" : "El campo es requerido."
        if ('company' in fieldValues)
            temp.company = fieldValues.company ? "" : "El campo es requerido."
        if ('district' in fieldValues)
            temp.district = fieldValues.district ? "" : "El campo es requerido."
        if ('rubro_id' in fieldValues)
            temp.rubro_id = fieldValues.rubro_id ? "" : "El campo es requerido."
        if ('startDate' in fieldValues)
            temp.startDate = fieldValues.startDate ? "" : "El campo es requerido."
        if ('weeklyHours' in fieldValues)
            temp.weeklyHours = fieldValues.weeklyHours ? "" : "El campo es requerido."
        if ('monthlyIncome' in fieldValues)
            temp.monthlyIncome = fieldValues.monthlyIncome ? "" : "El campo es requerido."
        if ('hasExtraHours' in fieldValues)
            temp.hasExtraHours = fieldValues.hasExtraHours ? "" : "El campo es requerido."
        if ('commitmentDegree' in fieldValues)
            temp.commitmentDegree = fieldValues.commitmentDegree ? "" : "El campo es requerido."
        if ('workingRelationship' in fieldValues)
            temp.workingRelationship = fieldValues.workingRelationship ? "" : "El campo es requerido."
        if (!hasWork) {
            if ('finishDate' in fieldValues)
                temp.finishDate = fieldValues.finishDate ? "" : "El campo es requerido."
            if ('withdrawalReason' in fieldValues)
                temp.withdrawalReason = fieldValues.withdrawalReason ? "" : "El campo es requerido."
        }

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

    const [rubros, setRubros] = useState([]);
    const [jobLevels, setJobLevels] = useState([]);
    const [withdrawalReasons, setWithdrawalReasons] = useState([]);
    const [hasWork, setHasWork] = useState(false);

    useEffect(() => {
        getRubros();
        getJobLevels();
        getWithdrawalReasons();
    }, []);

    useEffect(() => {
        handleUpdateWorkExperience(values, index)
    }, [values, index]);

    useEffect(() => {
        console.log(`${user.id} RENDER WORK`)
    });

    const getRubros = async () => {
        const response = await itemsList();
        setRubros(response?.rubros);
    }

    const getJobLevels = async () => {
        const response = await jobLevelsList();
        setJobLevels(response?.job_levels);
    }

    const getWithdrawalReasons = async () => {
        const response = await withdrawalReasonsList();
        setWithdrawalReasons(response?.attritions);
    }

    const handleChangeCheckbox = (e) => {
        setHasWork(prevState => !prevState)
        setErrors({})
        if (e.target.checked) {
            setValues({ ...values, finishDate: null, withdrawalReason: null })
        } else {
            setValues({ ...values, finishDate: "", withdrawalReason: "" })
        }
    }

    const handleCloseAlert = () => {
        setOpenAlert(false)
    }

    const handleClickAddExperience = () => {
        if (!disabledButtonState) {
            console.log("ADD")
            handleAddWorkExperience()
        } else {
            validate();
            setOpenAlert(true)
            return
        }
    }

    const handleClickNextStep = () => {
        if (!disabledButtonState) {
            handleSaveExperience()
        } else {
            validate();
            setOpenAlert(true)
            return
        }
    }

    const handleClickDeleteExperience = () => {
        handleDeleteWorkExperience(index)
        setOpenConfirmationModal(false)
    }

    return (
        <>
            {!showCheckBox &&
                <Grid item xs={12} md={12} className="justify-center">
                    <FormControl variant="outlined">
                        <Checkbox
                            label={
                                <Typography variant="body2" component="p">
                                    Actualmente estoy laborando.
                                </Typography>
                            }
                            name="hasWork"
                            checked={hasWork}
                            onChange={(e) => handleChangeCheckbox(e)}
                        />
                    </FormControl>
                </Grid>
            }
            <Grid item xs={12} md={6}>
                <FormControl variant="outlined" fullWidth error={errors.position ? true : false}>
                    <InputLabel id="demo-simple-select-outlined-label">Cargo</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        name="position"
                        value={values.position}
                        onChange={handleInputChange}
                        label="Cargo"
                    >
                        {jobLevels.map(element =>
                            <MenuItem key={element.id} value={element.id}>{element.name}</MenuItem>
                        )}
                    </Select>
                    <FormHelperText>{errors.position}</FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
                <TextInput
                    fullWidth
                    label="Empresa"
                    name="company"
                    value={values.company}
                    onChange={handleInputChange}
                    error={errors.company ? true : false}
                    helperText={errors.company}
                    onKeyPress={e => onlyLetters(e)}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <AutocompleteTemp
                    label="Distrito"
                    name="district"
                    value={values.district}
                    handleChange={handleInputChange}
                    error={errors.district ? true : false}
                    helperText={errors.district}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <FormControl variant="outlined" fullWidth error={errors.rubro_id ? true : false}>
                    <InputLabel id="demo-simple-select-outlined-label">Rubro</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        name="rubro_id"
                        value={values.rubro_id}
                        onChange={handleInputChange}
                        label="Rubro"
                    >
                        {rubros && rubros.map(element =>
                            <MenuItem key={element.id} value={element.id}>{element.name}</MenuItem>
                        )}
                        {/* <MenuItem value="other">Otro</MenuItem> */}
                    </Select>
                    <FormHelperText>{errors.rubro_id}</FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
                <TextInput
                    id="date"
                    fullWidth
                    name="startDate"
                    label="Fecha de inicio"
                    value={values.startDate}
                    onChange={handleInputChange}
                    error={errors.startDate ? true : false}
                    helperText={errors.startDate}
                    type="month"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        max: dateLocal
                    }}
                />
            </Grid>
            {!hasWork && <Grid item xs={12} md={6}>
                <TextInput
                    id="date"
                    fullWidth
                    type="month"
                    name="finishDate"
                    label="Fecha de fin"
                    value={values.finishDate || ''}
                    onChange={handleInputChange}
                    error={errors.finishDate ? true : false}
                    helperText={errors.finishDate}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        max: dateLocal
                    }}
                />
            </Grid>}
            <Grid item xs={12} md={6}>
                <TextInput
                    fullWidth
                    label="Promedio de horas semanales"
                    name="weeklyHours"
                    value={values.weeklyHours}
                    onChange={handleInputChange}
                    error={errors.weeklyHours ? true : false}
                    helperText={errors.weeklyHours}
                    onKeyPress={e => onlyNumbers(e)}
                    type="Number"
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextInput
                    fullWidth
                    type="Number"
                    label="Ingreso Mensual"
                    name="monthlyIncome"
                    value={values.monthlyIncome}
                    onChange={handleInputChange}
                    error={errors.monthlyIncome ? true : false}
                    helperText={errors.monthlyIncome}
                    onKeyPress={e => onlyNumbers(e)}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <FormControl component="fieldset" error={errors.hasExtraHours ? true : false}>
                    <FormLabel component="legend">¿Trabajaste horas extras?</FormLabel>
                    <RadioGroup row aria-label="hasExtraHours" name="hasExtraHours" value={values.hasExtraHours} onChange={handleInputChange}>
                        <FormControlLabel value="1" control={<Radio />} label="Sí" />
                        <FormControlLabel value="0" control={<Radio />} label="No" />
                    </RadioGroup>
                    <FormHelperText>{errors.hasExtraHours}</FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
                <FormControl component="fieldset" error={errors.commitmentDegree ? true : false}>
                    <FormLabel component="legend">¿Cómo calificaría su grado de compromiso con la empresa?</FormLabel>
                    <FormHelperText>Marque un número del 1 al 5 siendo 1 totalmente descomprometido y 5 totalmente comprometido</FormHelperText>
                    <RadioGroup row aria-label="commitmentDegree" name="commitmentDegree" value={values.commitmentDegree} onChange={handleInputChange}>
                        <FormControlLabel value="1" control={<Radio />} label="1" />
                        <FormControlLabel value="2" control={<Radio />} label="2" />
                        <FormControlLabel value="3" control={<Radio />} label="3" />
                        <FormControlLabel value="4" control={<Radio />} label="4" />
                        <FormControlLabel value="5" control={<Radio />} label="5" />
                    </RadioGroup>
                    <FormHelperText>{errors.commitmentDegree}</FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
                <FormControl component="fieldset" error={errors.workingRelationship ? true : false}>
                    <FormLabel component="legend">¿Qué tan satisfecho se siente/sintió con la relación entre el trabajo y su vida personal?</FormLabel>
                    <FormHelperText>Marque un número del 1 al 5 siendo 1 totalmente insatisfecho y 5 totalmente satisfecho</FormHelperText>
                    <RadioGroup row aria-label="workingRelationship" name="workingRelationship" value={values.workingRelationship} onChange={handleInputChange}>
                        <FormControlLabel value="1" control={<Radio />} label="1" />
                        <FormControlLabel value="2" control={<Radio />} label="2" />
                        <FormControlLabel value="3" control={<Radio />} label="3" />
                        <FormControlLabel value="4" control={<Radio />} label="4" />
                        <FormControlLabel value="5" control={<Radio />} label="5" />
                    </RadioGroup>
                    <FormHelperText>{errors.workingRelationship}</FormHelperText>
                </FormControl>
            </Grid>
            {!hasWork && <Grid item xs={12} md={6}>
                <FormControl variant="outlined" fullWidth error={errors.withdrawalReason ? true : false}>
                    <InputLabel id="demo-simple-select-outlined-label">Motivo de retiro</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        name="withdrawalReason"
                        value={values.withdrawalReason || ''}
                        onChange={handleInputChange}
                        label="Motivo de retiro"
                    >
                        {withdrawalReasons.map(element =>
                            <MenuItem key={element.id} value={element.id}>{element.name}</MenuItem>
                        )}
                    </Select>
                    <FormHelperText>{errors.withdrawalReason}</FormHelperText>
                </FormControl>
            </Grid>}

            {
                //Condiciones para mostrar:
                //1 se debe mostrar en la ultima expriencia (al final de la lista)
                //2 solo debe permitirse agregar 3 experiencias como maximo
                (index == length - 1 && index < 2) &&
                <>
                    <Grid item xs={12} md={12} lg={12}>
                        <Divider />
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                        <Button color="primary" onClick={handleClickAddExperience} > Agregar otra experiencia</Button>
                    </Grid>
                </>
            }
            {
                (isHidden || index > 0 || length > 1) && //Si existe mas de 1 experiencia guardada(array), mostrar en todos el boton, exepto al final
                <>
                    <Grid item xs={12} md={12} lg={12}>
                        <Button color="primary" onClick={() => setOpenConfirmationModal(true)}>eliminar experiencia</Button>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                        <Divider />
                    </Grid>
                </>

            }
            {
                !isHidden && index == length - 1 &&
                <Grid item xs={12} md={12} className="justify-end">
                    <Button variant="contained" size="large" onClick={handleClickNextStep}>Continuar</Button>
                    {/* <Button color="primary" type="submit" onClick={handleClickNextStep}>continuar</Button> */}
                </Grid>
            }

            <Modal open={openConfirmationModal} handleCloseModal={() => setOpenConfirmationModal(false)}>
                <h3 id="simple-modal-title">¿Está seguro que desa eliminar su experiencia laboral?</h3>
                <Grid item xs={12}>
                    <Grid container spacing={3} className="justify-center">
                        <Grid item>
                            <Button variant="outlined" size="large" onClick={() => { setOpenConfirmationModal(false); return }}>CANCELAR</Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" size="large" onClick={handleClickDeleteExperience}>ELIMINAR</Button>
                        </Grid>
                    </Grid>
                </Grid>

            </Modal>
            <Snackbars
                open={openAlert}
                onClose={handleCloseAlert}
            />

        </>
    )
}