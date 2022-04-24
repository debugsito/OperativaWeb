import React, { useState, useEffect } from 'react';
import { FormControl, FormHelperText, Grid, InputLabel, MenuItem,Typography } from '@material-ui/core';
import { useForm } from "../../../hooks";
import { Snackbars, Select, Button, TextInput,Modal } from '../../../shared/components';
import { academicLevelsList, specialtiesList } from '../../../../store/services/utils.service';
import { onlyNumbers } from '../../../shared/libs/validators';
import ACADEMIC_LEVEL from "../../../global/constants/types/academicLevels";
import SPECIALITY from "../../../global/constants/types/speciality";
import { makeStyles } from '@material-ui/core/styles';


const defaultValues = {
    level_id: "",
    name_inst: "",
    from_year: "",
    endYear: "",
    speciality_id: null,
    otherSpeciality: null
}



const useStyle = makeStyles(theme => ({
    defaultButton: {
        backgroundColor : 'white',
        color: 'black',
        border : 'solid 1px',
        borderColor : 'black',
        "&:hover": {
            background: "white"
        },
        marginRight :'1.5rem'
    },
    defaultRadios : {
        borderRadius :'30px'
    }
}))

export default function EducationForm({ user, handleSaveEducation,setOption }) {
    let initialValues = user ? user : defaultValues;
    const [openAlert, setOpenAlert] = useState(false)
    const [showSpeciality, setShowSpeciality] = useState(false)
    const [showOtherSpeciality, setShowOtherSpeciality] = useState(false)
    const [isWithoutEducation, setIsWithoutEducation] = useState(false)
    const [academicLevels, setAcademicLevels] = useState([]);
    const [specialties, setSpecialties] = useState([]);
    const [openModal, setOpenModal] = useState(false)
    const classes = useStyle()

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('level_id' in fieldValues)
            temp.level_id = fieldValues.level_id ? "" : "El campo es requerido."
        if (!isWithoutEducation) {
            if ('name_inst' in fieldValues)
                temp.name_inst = fieldValues.name_inst ? "" : "El campo es requerido."
            if ('from_year' in fieldValues)
                temp.from_year = fieldValues.from_year ? (fieldValues.from_year.length === 4 ? "" : "Ejemplo: 1990") : "El campo es requerido. Ejemplo: 1990"
            if ('endYear' in fieldValues)
                temp.endYear = fieldValues.endYear ? (fieldValues.endYear.length === 4 ? "" : "Ejemplo: 1990") : "El campo es requerido.  Ejemplo: 1990"
            if (showSpeciality) {
                if ('speciality' in fieldValues) {
                    temp.speciality_id = fieldValues.speciality_id ? "" : "El campo es requerido"
                }
            }
            if (showOtherSpeciality) {
                if ('speciality' in fieldValues) {
                    temp.otherSpeciality = fieldValues.otherSpeciality ? "" : "El campo es requerido"
                }
            }
        }



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

    useEffect(() => {
        getAcademicLevels();
        getSpecialties();
    }, []);

    useEffect(() => {
        const value = values.level_id
        if (value === ACADEMIC_LEVEL.INCOMPLETE_TECHNICIAN_ID || value === ACADEMIC_LEVEL.COMPLETE_TECHNICIAN_ID ||
            value === ACADEMIC_LEVEL.INCOMPLETE_UNIVERSITY_ID || value === ACADEMIC_LEVEL.COMPLETE_UNIVERSITY_ID) {
            setValues({ ...values, speciality_id: "", name_inst: "", from_year: "", endYear: "" })
            setShowSpeciality(true)
            setIsWithoutEducation(false)
        } else if (value === ACADEMIC_LEVEL.WITHOUT_EDUCATION_ID) {
            setValues({ ...values, name_inst: null, from_year: null, endYear: null })
            setIsWithoutEducation(true)
        } else {
            setValues({ ...values, speciality_id: null, name_inst: "", from_year: "", endYear: "" })
            setShowSpeciality(false)
            setIsWithoutEducation(false)
        }
    }, [values.level_id])

    useEffect(() => {
        const value = values.speciality_id
        if (value == SPECIALITY.OTHERS) { //otros = 28
            setShowOtherSpeciality(true)
            setValues({ ...values, otherSpeciality: "" })
        } else {
            setShowOtherSpeciality(false)
            setErrors({ ...errors, otherSpeciality: "" })
            setValues({ ...values, otherSpeciality: null })
        }
    }, [values.speciality_id])

    const getAcademicLevels = async () => {
        const response = await academicLevelsList();
        setAcademicLevels(response?.levels);
    }

    const getSpecialties = async () => {
        const response = await specialtiesList();
        setSpecialties(response?.fields);
    }

    const handleCloseAlert = () => {
        setOpenAlert(false)
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
            handleSaveEducation(values)
            setOpenModal(false)
        } else {
            validate(values);
            setOpenAlert(true)
            return
        }
    }

    const bodyModal = (
        <Grid container spacing={3} direction="column" justifyContent="center" alignItems="center">
            <Grid item xs={12}>
                <Typography variant="body1">¿Estas seguro que deseas guardar tu educación?</Typography>
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
            <Grid item xs={6}>
                <Typography variant="h6" component="h6">
                    <strong>Educación </strong>
                </Typography>
            </Grid>
            <Grid  item xs={12} md={12} lg={12}>
            <InputLabel id="demo-simple-select-outlined-label">Ingresa los datos del último nivel de estudio que alcanzaste</InputLabel>
            </Grid>
            <Grid container spacing={3} style={{ padding: 20 }}>
                <Grid item xs={12} md={6}>
                    <FormControl variant="outlined" fullWidth error={errors.level_id ? true : false}>
                        {/* <InputLabel id="demo-simple-select-outlined-label">Nivel máximo alcanzado</InputLabel> */}
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            name="level_id"
                            value={values.level_id}
                            onChange={handleInputChange}
                            label="Nivel máximo alcanzado"
                        >
                            {
                                academicLevels.map(element =>
                                    <MenuItem key={element.id} value={element.id}>{element.name}</MenuItem>
                                )
                            }
                        </Select>
                        <FormHelperText>{errors.level_id}</FormHelperText>
                    </FormControl>
                </Grid>
                {
                    !isWithoutEducation &&
                    <>
                        <Grid item xs={12} md={6}>
                            <TextInput
                                fullWidth
                                label="Institución educativa"
                                name="name_inst"
                                value={values.name_inst || ''}
                                onChange={handleInputChange}
                                error={errors.name_inst ? true : false}
                                helperText={errors.name_inst}
                            />
                        </Grid>
                        {
                            showSpeciality &&
                            <Grid item xs={12} md={6}>
                                <FormControl variant="outlined" fullWidth error={errors.speciality ? true : false}>
                                    {/* <InputLabel id="demo-simple-select-outlined-label">Especialidad</InputLabel> */}
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        name='speciality_id'
                                        value={values.speciality_id || ''}
                                        onChange={handleInputChange}
                                        label="Especialidad"
                                    >
                                        {specialties.sort((a, b) => a.id - b.id).map(element =>
                                            <MenuItem key={element.id} value={element.id}>{element.name}</MenuItem>
                                        )}
                                    </Select>
                                    <FormHelperText>{errors.speciality_id}</FormHelperText>
                                </FormControl>
                            </Grid>
                        }
                        {
                            showOtherSpeciality &&
                            <Grid item xs={12} md={6}>
                                <TextInput
                                    fullWidth
                                    label="Especifique especialidad"
                                    name="otherSpeciality"
                                    value={values.otherSpeciality}
                                    onChange={handleInputChange}
                                    helperText={errors.otherSpeciality}
                                    error={errors.otherSpeciality ? true : false}
                                />
                            </Grid>
                        }
                        <Grid item xs={12} md={6}>
                            <TextInput
                                fullWidth
                                type="text"
                                label="Año de inicio"
                                name="from_year"
                                value={values.from_year || ''}
                                onChange={handleInputChange}
                                helperText={errors.from_year}
                                error={errors.from_year ? true : false}
                                onKeyPress={e => onlyNumbers(e)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextInput
                                fullWidth
                                type="text"
                                label="Año de fin"
                                name="endYear"
                                value={values.endYear || ''}
                                onChange={handleInputChange}
                                helperText={errors.endYear}
                                error={errors.endYear ? true : false}
                                onKeyPress={e => onlyNumbers(e)}
                            />
                        </Grid>
                    </>
                }
            </Grid >
            <Grid item xs={12} md={12} className="justify-end">
                <Button className={classes.defaultButton +" "+classes.defaultRadios} variant="contained" size="large" onClick={(e)=> handleClickFinish(1)}>Salir y Guardar</Button>
                <Button className={classes.defaultRadios}  variant="contained" size="large" onClick={(e) => handleClickFinish(2)}>Siguiente</Button>
            </Grid>
            <Modal open={openModal} handleCloseModal={() => setOpenModal(false)} >
                {bodyModal}
            </Modal>
            <Snackbars
                open={openAlert}
                onClose={handleCloseAlert}
            />


        </>
    )

}