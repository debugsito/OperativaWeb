import React, { useState, useEffect } from 'react';
import { Divider, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, InputLabel, MenuItem, RadioGroup, Select, Typography } from '@material-ui/core';

import { Radio } from '../../../shared/components';
import WithoutExperienceComponent from './WithoutExperienceComponent';
import WorkExperienceListComponent from "./WorkExperienceListComponent";

const defaultValues = {
    position: "",
    company: "",
    district: "",
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

const initialValues = [defaultValues]

export default function ApplicantWorkExperienceForm({ userData = initialValues, handleSaveWorkExperience, handleUpdateWorkExperience, history }) {
    const [hasExperience, setHasExperience] = useState({ value: '', error: false });
    // const [disabledButton, setDisabledButton] = useState(false);

    useEffect(() => {
        setHasExperience({ ...hasExperience, value: !Array.isArray(userData) ? 'withoutExperience' : 'withExperience' });
        // getAccount();
    }, [userData])

    useEffect(() => {
        console.log("[4] RENDER WORK")
    });


    const handleCheckBox = (value = hasExperience.value) => {
        setHasExperience({ value: value, error: !value })
        if (value == "withExperience") {
            handleUpdateWorkExperience(initialValues)
        }
    }

    const handleSaveExperience = async () => {
        const body = userData.map(data => ({
            name_inst: data.company,
            district_id: data.district.id,
            rubro_id: parseInt(data.rubro_id),
            job_level_id: parseInt(data.position),
            from_year: data.startDate,
            to_year: data.finishDate,
            buss_travel: 1, // EN DURO
            distan_home: 0, // EN DURO
            hour_rate: parseInt(data.weeklyHours),
            job_sati: parseInt(data.workingRelationship),
            monthly_income: parseInt(data.monthlyIncome),
            over_time: parseInt(data.hasExtraHours),
            work_bal_life: 0, // EN DURO
            job_invol: parseInt(data.commitmentDegree),
            attrition: parseInt(data.withdrawalReason),
        }))

        handleSaveWorkExperience(body, hasExperience);
    }

    const handleSaveWithoutExperience = async (data) => {
        handleSaveWorkExperience(data, hasExperience);
    }

    const handleAddWorkExperience = () => {
        let userDataTemp = [...userData];
        userDataTemp.push(defaultValues);
        handleUpdateWorkExperience(userDataTemp)
    }

    const handleDeleteWorkExperience = (index) => {
        let userDataTemp = [...userData];
        userDataTemp.splice(index, 1)
        handleUpdateWorkExperience(userDataTemp)
    }

    const handleUpdateWorkExperienceTemp = (values, index) => {
        let userDataTemp = [...userData];
        userDataTemp[index] = values;
        // const isButtonDisabled = userDataTemp.map(data => (Object.values(data).includes(""))).includes(true)
        // setDisabledButton(isButtonDisabled)
        handleUpdateWorkExperience(userDataTemp)
    }

    return (
        <Grid container spacing={3} style={{ padding: 20 }}>
            <Grid item xs={12} md={12} className="justify-center">
                <FormControl component="fieldset" error={hasExperience.error}>
                    <RadioGroup row aria-label="hasExperience" name="hasExperience" value={hasExperience.value} onChange={(event) => handleCheckBox(event.target.value)}>
                        <FormControlLabel value="withoutExperience" control={<Radio />} label="Sin experiencia" />
                        <FormControlLabel value="withExperience" control={<Radio />} label="Con experiencia" />
                    </RadioGroup>
                </FormControl>
            </Grid>
            {hasExperience.value === "withoutExperience" &&
                <WithoutExperienceComponent
                    history={history}
                    user={userData}
                    handleFinish={handleSaveWithoutExperience}
                />}
            {hasExperience.value === "withExperience" &&
                <WorkExperienceListComponent
                    workExperienceList={userData}
                    handleSaveExperience={handleSaveExperience}
                    handleAddWorkExperience={handleAddWorkExperience}
                    handleDeleteWorkExperience={handleDeleteWorkExperience}
                    handleUpdateWorkExperience={handleUpdateWorkExperienceTemp}
                // disabledButton={disabledButton}
                />
            }
        </Grid>
    );
}