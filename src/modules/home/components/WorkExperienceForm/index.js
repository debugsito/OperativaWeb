
import React, { useState, useEffect } from 'react';
import { FormControl, FormControlLabel, Grid, RadioGroup } from '@material-ui/core';
import { Radio } from '../../../shared/components';
import WithoutExperienceComponent from './WithoutExperienceComponent';
import WorkExperienceListComponent from "./WorkExperienceListComponent";
import { makeStyles } from "@material-ui/core/styles";

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
    hasWork: false

}
const initialValues = [defaultValues]

const useStyles = makeStyles(theme => ({
    controlStyle: {
        border: "1px solid #C8C8C8",
        boxSizing: "border-box",
        borderRadius: "10px",
        padding: "16px"

    }
}))

export default function WorkExperienceForm({ userData = initialValues, handleSaveWorkExperience, handleUpdateWorkExperience, history, setOption }) {
    const [hasExperience, setHasExperience] = useState({ value: '', error: false });
    const classes = useStyles()

    useEffect(() => {
        setHasExperience({ ...hasExperience, value: Array.isArray(userData) ? 'withExperience' : (userData?.interest_area_id ? 'withoutExperience' : '') });
    }, [userData])

    const handleCheckBox = (value = hasExperience.value) => {
        setHasExperience({ value: value, error: !value })
        if (value == "withExperience") {
            handleUpdateWorkExperience(initialValues)
        }
    }

    const handleSaveWithExperience = async () => {
        const body = userData.map(data => ({
            name_inst: data.company,
            company : data.company,
            district_id: data.district_id,
            rubro_id: parseInt(data.rubro_id),
            job_level_id: parseInt(data.position),
            postion: data.position,
            from_year: data.startDate,
            to_year: data.finishDate,
            startDate :  data.startDate,
            finishDate : data.finishDate,
            hour_rate: parseInt(data.weeklyHours),
            weeklyHours : data.weeklyHours,
            job_sati: parseInt(data.workingRelationship),
            workingRelationship : data.workingRelationship,
            monthly_income: parseInt(data.monthlyIncome),
            monthlyIncome : data.monthlyIncome,
            over_time: parseInt(data.hasExtraHours),
            hasExtraHours : data.hasExtraHours,
            job_invol: parseInt(data.commitmentDegree),
            commitmentDegree : data.commitmentDegree,
            attrition: parseInt(data.withdrawalReason),
            withdrawalReason : data.withdrawalReason,
            hasWork: data.hasWork,
        }))

        handleSaveWorkExperience(body, hasExperience);
    }

    const handleSaveWithoutExperience = async (data) => {
        handleSaveWorkExperience(data, hasExperience);
    }

    const handleAddWorkExperience = () => {
        console.log("add work")
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


    return (<>

        <Grid container spacing={3} style={{ padding: 20 }}>
            <Grid item xs={12} md={12} className="justify-start">
                <FormControl component="fieldset" error={hasExperience.error}>
                    <RadioGroup row aria-label="hasExperience" name="hasExperience" value={hasExperience.value} onChange={(event) => handleCheckBox(event.target.value)}>
                        <FormControlLabel className={classes.controlStyle} value="withoutExperience" control={<Radio />} label="Sin experiencia" />
                        <FormControlLabel className={classes.controlStyle} value="withExperience" control={<Radio />} label="Con experiencia" />
                    </RadioGroup>
                </FormControl>
            </Grid>
            {hasExperience.value === "withoutExperience" &&
                <WithoutExperienceComponent
                    history={history}
                    user={userData}
                    handleFinish={handleSaveWithoutExperience}
                    setOption={setOption}
                />}
            {hasExperience.value === "withExperience" &&
                <WorkExperienceListComponent
                    workExperienceList={userData}
                    handleSaveWithExperience={handleSaveWithExperience}
                    handleAddWorkExperience={handleAddWorkExperience}
                    handleDeleteWorkExperience={handleDeleteWorkExperience}
                    handleUpdateWorkExperience={handleUpdateWorkExperienceTemp}
                    setOption={setOption}
                // disabledButton={disabledButton}
                />
            }
        </Grid>
    </>)
}