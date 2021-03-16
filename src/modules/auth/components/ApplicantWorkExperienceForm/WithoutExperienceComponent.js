import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Divider, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, InputLabel, MenuItem, RadioGroup, Select, Typography } from '@material-ui/core';

import { Button, Radio, TextInput } from '../../../shared/components';
import { areasList, specialtiesList } from '../../../../store/services/utils.service';
import { onlyLetters } from '../../../shared/libs/validators';

export default function WithoutExperienceComponent({ user, handleFinish, history }) {
    const userData = user;
    const [area, setArea] = useState({ value: '', error: false });
    const [specificArea, setSpecificArea] = useState({ value: '', error: false });
    const [hasVolunteering, setHasVolunteering] = useState({ value: '', error: false });
    const [hasRotativeSchedules, setHasRotativeSchedules] = useState({ value: '', error: false });
    const [hasExtraHours, setHasExtraHours] = useState({ value: '', error: false });
    const [hasWeekend, setHasWeekend] = useState({ value: '', error: false });

    const [areas, setAreas] = useState([]);

    useEffect(() => {
        // setArea({ ...area, value: userData?.interest_area_id ? userData?.interest_area_id : '' });
        // setSpecificArea({ ...hasRotativeSchedules, value: userData?.field_id ? userData?.field_id : '' });
        // setHasVolunteering({ ...hasVolunteering, value: userData?.level_id ? userData?.level_id : '' });
        setHasVolunteering({ ...hasVolunteering, value: userData?.volunteering === 0 ? 'no' : (userData?.volunteering === 1 ? 'yes' : '') });
        setHasRotativeSchedules({ ...hasRotativeSchedules, value: userData?.rotating_schedule === 0 ? 'no' : (userData?.rotating_schedule === 1 ? 'yes' : '') });
        setHasExtraHours({ ...hasExtraHours, value: userData?.extra_hours === 0 ? 'no' : (userData?.extra_hours === 1 ? 'yes' : '') });
        setHasWeekend({ ...hasWeekend, value: userData?.work_weekend === 0 ? 'no' : (userData?.work_weekend === 1 ? 'yes' : '') });
    }, [user])

    // useEffect(() => {
    //     getAreas();
    // }, []);

    // const getAreas = async () => {
    //     const response = await areasList();
    //     setAreas(response?.areas);
    // }

    const handleSave = () => {
        const body = {
            volunteering: parseInt(hasVolunteering.value === "yes" ? 1 : 0),
            rotating_schedule: parseInt(hasRotativeSchedules.value === "yes" ? 1 : 0),
            extra_hours: parseInt(hasExtraHours.value === "yes" ? 1 : 0),
            work_weekend: parseInt(hasWeekend.value === "yes" ? 1 : 0),
        };
        if (!isButtonDisabled()) {
            handleFinish(body)
        }
    }

    const validateArea = (value = area.value) => setArea({ value: value, error: !value });
    const validateSpecificArea = (value = specificArea.value) => setSpecificArea({ value: value, error: !value });
    const validateHasVolunteering = (value = hasVolunteering.value) => setHasVolunteering({ value: value, error: !value });
    const validateHasRotativeSchedules = (value = hasRotativeSchedules.value) => setHasRotativeSchedules({ value: value, error: !value });
    const validateHasExtraHours = (value = hasExtraHours.value) => setHasExtraHours({ value: value, error: !value });
    const validateHasWeekend = (value = hasWeekend.value) => setHasWeekend({ value: value, error: !value });

    const isButtonDisabled = () => {
        // return !area.value || (area.value === 'other' && !specificArea.value) || !hasVolunteering.value || !hasRotativeSchedules.value || !hasExtraHours.value || !hasWeekend.value
        return !hasVolunteering.value || !hasRotativeSchedules.value || !hasExtraHours.value || !hasWeekend.value
    }

    const handleClickNextStep = () => {

    }

    return (
        <>
            {/* <Grid item xs={12} md={6}>
                <FormControl variant="outlined" fullWidth error={area.error}>
                    <InputLabel id="demo-simple-select-outlined-label">Rubro de interés</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={area.value}
                        onChange={(event) => validateArea(event.target.value)}
                        label="Rubro de interés"
                    >
                        {areas.map(element =>
                            <MenuItem key={element.id} value={element.id}>{element.name}</MenuItem>
                        )}
                        <MenuItem value="other">Otro</MenuItem>
                    </Select>
                    {area.error && <FormHelperText>Este campo es requerido</FormHelperText>}
                </FormControl>
            </Grid>
            {area.value === 'other' && <Grid item xs={12} md={6}>
                <TextInput
                    fullWidth
                    label="Por favor, especifíque"
                    value={specificArea.value}
                    onChange={(event) => validateSpecificArea(event.target.value)}
                    error={specificArea.error}
                    helperText={specificArea.error && "Este campo es requerido"}
                    onKeyPress={e => onlyLetters(e)}
                />
            </Grid>} */}
            <Grid item xs={12} md={6}>
                <FormControl component="fieldset" error={hasVolunteering.error}>
                    <FormLabel component="legend">¿Has realizado algún tipo de voluntariado?</FormLabel>
                    <RadioGroup row aria-label="hasVolunteering" name="hasVolunteering" value={hasVolunteering.value} onChange={(event) => validateHasVolunteering(event.target.value)}>
                        <FormControlLabel value="yes" control={<Radio />} label="Sí" />
                        <FormControlLabel value="no" control={<Radio />} label="No" />
                    </RadioGroup>
                    {hasVolunteering.error && <FormHelperText>Este campo es requerido</FormHelperText>}
                </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
                <FormControl component="fieldset" error={hasRotativeSchedules.error}>
                    <FormLabel component="legend">¿Cuenta con disponibilidad para trabajar en horarios rotativos?</FormLabel>
                    <RadioGroup row aria-label="hasRotativeSchedules" name="hasRotativeSchedules" value={hasRotativeSchedules.value} onChange={(event) => validateHasRotativeSchedules(event.target.value)}>
                        <FormControlLabel value="yes" control={<Radio />} label="Sí" />
                        <FormControlLabel value="no" control={<Radio />} label="No" />
                    </RadioGroup>
                    {hasRotativeSchedules.error && <FormHelperText>Este campo es requerido</FormHelperText>}
                </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
                <FormControl component="fieldset" error={hasExtraHours.error}>
                    <FormLabel component="legend">¿Cuenta con disponibilidad para trabajar horas extras?</FormLabel>
                    <RadioGroup row aria-label="hasExtraHours" name="hasExtraHours" value={hasExtraHours.value} onChange={(event) => validateHasExtraHours(event.target.value)}>
                        <FormControlLabel value="yes" control={<Radio />} label="Sí" />
                        <FormControlLabel value="no" control={<Radio />} label="No" />
                    </RadioGroup>
                    {hasExtraHours.error && <FormHelperText>Este campo es requerido</FormHelperText>}
                </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
                <FormControl component="fieldset" error={hasWeekend.error}>
                    <FormLabel component="legend">¿Cuenta con disponibilidad para trabajos fin de semana?</FormLabel>
                    <RadioGroup row aria-label="hasWeekend" name="hasWeekend" value={hasWeekend.value} onChange={(event) => validateHasWeekend(event.target.value)}>
                        <FormControlLabel value="yes" control={<Radio />} label="Sí" />
                        <FormControlLabel value="no" control={<Radio />} label="No" />
                    </RadioGroup>
                    {hasWeekend.error && <FormHelperText>Este campo es requerido</FormHelperText>}
                </FormControl>
            </Grid>
            <Grid item xs={12} md={12} className="justify-end">
                <Button color="primary" type="submit" onClick={handleSave}>continuar</Button>
            </Grid>
            {/* <Grid item xs={12} className="justify-center">
                <Button variant="outlined" size="large" onClick={() => history.push('/')}>Cancelar</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button variant="contained" size="large" onClick={handleSave} disabled={isButtonDisabled()}>Finalizar</Button>
            </Grid> */}
        </>
    )
}