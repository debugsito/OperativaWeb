import React, { useState, useEffect } from 'react';
import {
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Grid,
    InputLabel,
    MenuItem,
    RadioGroup,
    Select,
    Typography,
    Paper,
    Accordion,
    AccordionSummary,
    AccordionDetails
} from '@material-ui/core';
import { Autocomplete, Button, Checkbox, Radio, TextInput, Modal, Snackbars } from '../../../shared/components';
import { itemsList, jobLevelsList, withdrawalReasonsList } from '../../../../store/services/utils.service';
import { onlyNumbers, onlyLetters } from '../../../shared/libs/validators';
import { useForm } from "../../../hooks/useForm";
import { DateTime } from "luxon";
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const defaultValues = {
    position: "",
    company: "",
    district_id: "",
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
    colorLightBlue: {
        color: "#46A9D4"
    }
}))


export default function WithExperienceComponent({ handleDeleteWorkExperience, handleUpdateWorkExperience, handleAddWorkExperience, handleSaveWithExperience, index, length, user, setOption }) {
    let initialValues = user ? user : defaultValues
    const dateLocal = DateTime.local().toFormat("yyyy-LL") //Don't use momentjs, will soon be deprecated
    const [showCheckBox] = useState(index >= 1)
    const [isHidden, setIsHidden] = useState(false) //Si la lista tiene mas de 1 elemento
    const [openConfirmationModal, setOpenConfirmationModal] = useState(false)
    const [openAlert, setOpenAlert] = useState(false)
    const classes = useStyle()
    const [openModal, setOpenModal] = useState(false)

    const validate = (fieldValues = values) => {
        let temp = { ...errors }

        if ('position' in fieldValues)
            temp.position = fieldValues.position ? "" : "El campo es requerido."
        if ('company' in fieldValues)
            temp.company = fieldValues.company ? "" : "El campo es requerido."
        if ('district_id' in fieldValues)
            temp.district_id = fieldValues.district_id ? "" : "El campo es requerido."
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
    const [expanded, setExpanded] = useState(true);

    useEffect(() => {
        getRubros();
        getJobLevels();
        getWithdrawalReasons();
    }, []);

    useEffect(() => {
        handleUpdateWorkExperience(values, index)
    }, [values, index]);

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
            handleAddWorkExperience()
        } else {
            validate();
            setOpenAlert(true)
            return
        }
    }

    const handleClickFinish = (option) => {
        if (!disabledButtonState) {
            setOption(option)
            setOpenModal(true)
        } else {
            validate();
            setOpenAlert(true)
            return
        }
    }

    const handleSave = () => {
        if (!disabledButtonState) {
            handleSaveWithExperience()
            setOpenModal(false)
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

    const handleChange = () => {
        setExpanded(!expanded);
      };

    return (
        <>
            {/* <Paper className={classes.paper}>
                <Grid container spacing={3} justify="center">
                    <Grid item xs={11}>
                      
                    </Grid>

                </Grid>

            </Paper> */}

            <Accordion expanded={expanded} onChange={handleChange} >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Grid container spacing={3} justify="center">
                        <Grid item xs={11}>

                            <Typography variant="h6" component="h6"><strong>Experiencia {index + 1}</strong></Typography>
                        </Grid>
                    </Grid>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={3} justify="center">
                        <Grid item xs={11}>
                            <Grid container direction="row" justify="space-between">
                                <Grid container spacing={3} style={{ padding: 20 }}>

                                    {
                                        (isHidden || index > 0 || length > 1) && //Si existe mas de 1 experiencia guardada(array), mostrar en todos el boton, exepto al final
                                        <>
                                            <Grid item xs={12} md={12} lg={12} className="justify-end">
                                                <Button onClick={() => setOpenConfirmationModal(true)}
                                                    className={classes.colorLightBlue}
                                                    startIcon={<CloseIcon />}
                                                >ELIMINAR </Button>
                                            </Grid>

                                        </>

                                    }
                                    {!showCheckBox &&
                                        <Grid item xs={12} md={12} className="justify-start">
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
                                        <Autocomplete
                                            label="Distrito"
                                            name="district_id"
                                            value={values.district_id}
                                            handleChange={handleInputChange}
                                            error={errors.district_id ? true : false}
                                            helperText={errors.district_id}
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
                                    <Grid item xs={12} md={12}>
                                        <FormControl component="fieldset" error={errors.hasExtraHours ? true : false}>
                                            <FormLabel component="legend">¿Trabajaste horas extras?</FormLabel>
                                            <RadioGroup row aria-label="hasExtraHours" name="hasExtraHours" value={values.hasExtraHours} onChange={handleInputChange}>
                                                <FormControlLabel value="1" control={<Radio />} label="Sí" />
                                                <FormControlLabel value="0" control={<Radio />} label="No" />
                                            </RadioGroup>
                                            <FormHelperText>{errors.hasExtraHours}</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
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
                                    <Grid item xs={12} md={12}>
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

                                </Grid>

                                {
                                    !isHidden && index == length - 1 &&
                                    <Grid item xs={12} md={12} className="justify-end">
                                        <Button className={classes.defaultButton + " " + classes.defaultRadios} variant="contained" size="large" onClick={(e) => handleClickFinish(1)}>Salir y Guardar</Button>
                                        <Button className={classes.defaultRadios} variant="contained" size="large" onClick={(e) => handleClickFinish(2)}>Siguiente</Button>
                                    </Grid>
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>


            {
                //Condiciones para mostrar:
                //1 se debe mostrar en la ultima expriencia (al final de la lista)
                //2 solo debe permitirse agregar 3 experiencias como maximo
                (index == length - 1 && index < 2) &&
                <>
                    <Grid item xs={12} md={12} lg={12} className="justify-end">
                        <Button className={classes.colorLightBlue}
                            onClick={handleClickAddExperience}
                            startIcon={<AddIcon />}
                        > AÑADIR EXPERIENCIA
                        </Button>
                    </Grid>
                </>
            }
            <Modal open={openModal} handleCloseModal={() => setOpenModal(false)} >
                {bodyModal}
            </Modal>
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