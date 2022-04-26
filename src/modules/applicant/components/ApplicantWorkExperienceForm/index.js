import React, { useState, useEffect } from 'react';
//Componentes
import { Radio } from '../../../shared/components';
import WithoutExperienceComponent from './WithoutExperienceComponent';
import WorkExperienceListComponent from "./WorkExperienceListComponent";
import { FormControl, FormControlLabel, Grid, RadioGroup } from '@material-ui/core';

//Utils
import { normalize } from "../../../shared/utils/postulantForm.utils";

//Services
import { service_ApplicantProfile } from '../../../../store/services';
import { deleteWorkExperience } from '../../../../store/services/applicant/perfil.service';

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
    hasWork: false

}

const initialValues = [defaultValues]

export default function ApplicantWorkExperienceForm({ userData = initialValues, history, setStep }) {
    const [hasExperience, setHasExperience] = useState({ value: !Array.isArray(userData) ? 'withoutExperience' : 'withExperience', error: false });
    const [workExperience, setWorkExperience] = useState(userData);

    const handleCheckBox = (value = hasExperience.value) => {
        setHasExperience({ value: value, error: !value })
        if (value == "withExperience") {
            setWorkExperience(initialValues)
            //handleUpdateWorkExperience(initialValues)
        }
    }

    const handleSaveExperience = async () => {
        const body = workExperience.map(data => ({
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
        let userDataTemp = [...workExperience];
        userDataTemp.push(defaultValues);
        setWorkExperience(userDataTemp)
        // handleUpdateWorkExperience(userDataTemp)
    }

    const handleDeleteWorkExperience = async (index) => {
        let userDataTemp = [...workExperience];
        const workExperience_id = workExperience[index]?.id
        const body = { job_id: workExperience_id }
        userDataTemp.splice(index, 1)
        setWorkExperience(userDataTemp)
        if (workExperience_id) {
            try {
                await deleteWorkExperience(body)
                // if (responseEducation.status === 200) setWorkExperience(userDataTemp)
            } catch (error) {
                console.log("ERROR")
            }
        }
    }

    const handleUpdateWorkExperienceTemp = (values, index) => {
        let userDataTemp = [...workExperience];
        userDataTemp[index] = values;
        setWorkExperience(userDataTemp)
    }

    const handleSaveWorkExperience = async (data, hasExperience) => {
        if (data) {
            if (hasExperience.value === "withExperience") {
                try {
                    const responseEducation = await service_ApplicantProfile.applicantWithExperienceRegister(data);
                    if (responseEducation.status === 200) setStep(5)
                } catch (error) {
                }
            } else if (hasExperience.value === "withoutExperience") {
                const data_temp = { ...data, experience: 0 }//sin experiencia
                setWorkExperience(data_temp);
                try {
                    const responseEducation = await service_ApplicantProfile.applicantWithoutExperienceRegister(data_temp);
                    if (responseEducation.status === 200) setStep(5)
                } catch (error) {

                }
            }
        }
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
                    user={workExperience}
                    handleFinish={handleSaveWithoutExperience}
                />}
            {hasExperience.value === "withExperience" &&
                <WorkExperienceListComponent
                    workExperienceList={workExperience}
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