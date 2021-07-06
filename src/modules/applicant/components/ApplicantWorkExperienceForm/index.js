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

}

const initialValues = [defaultValues]

export default function ApplicantWorkExperienceForm({ userData = initialValues, history, setStep }) {
    const [hasExperience, setHasExperience] = useState({ value: '', error: false });
    const [workExperience, setWorkExperience] = useState([]);
    // const [disabledButton, setDisabledButton] = useState(false);

    useEffect(() => {
        const workExperience_temp = normalize.workExperienceData(userData)
        setHasExperience({ ...hasExperience, value: !Array.isArray(workExperience_temp) ? 'withoutExperience' : 'withExperience' });
        setWorkExperience(workExperience_temp)
        // getAccount();
    }, [userData])

    const handleCheckBox = (value = hasExperience.value) => {
        setHasExperience({ value: value, error: !value })
        if (value == "withExperience") {
            setWorkExperience(initialValues)
            // handleUpdateWorkExperience(initialValues)
        }
    }

    const handleSaveExperience = async () => {
        const body = workExperience.map(data => ({
            id: data?.id,
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
        let userDataTemp = [...workExperience];
        userDataTemp.push(defaultValues);
        setWorkExperience(userDataTemp)
        // handleUpdateWorkExperience(userDataTemp)
    }

    const handleDeleteWorkExperience = async (index) => {
        let userDataTemp = [...workExperience];
        const body = { job_id: userDataTemp[index].id }
        userDataTemp.splice(index, 1)
        try {
            const responseEducation = await deleteWorkExperience(body)
            if (responseEducation.status === 200) setWorkExperience(userDataTemp)
        } catch (error) {
            console.log("ERROR")
        }

        // handleUpdateWorkExperience(userDataTemp)
    }

    const handleUpdateWorkExperienceTemp = (values, index) => {
        let userDataTemp = [...workExperience];
        userDataTemp[index] = values;
        // const isButtonDisabled = userDataTemp.map(data => (Object.values(data).includes(""))).includes(true)
        // setDisabledButton(isButtonDisabled)
        setWorkExperience(userDataTemp)
        // handleUpdateWorkExperience(userDataTemp)
    }

    const handleSaveWorkExperience = async (data, hasExperience) => {
        if (data) {
            setHasExperience(hasExperience.value)
            setWorkExperience(data);
            // setStep(5)
            // saveApplicantProfile('workExperience', data);
            if (hasExperience.value === "withExperience") {
                try {
                    const responseEducation = await service_ApplicantProfile.applicantWithExperienceRegister(data);
                    if (responseEducation.status === 200) setStep(5)
                } catch (error) {
                }
            } else if (hasExperience.value === "withoutExperience") {
                try {
                    const responseEducation = await service_ApplicantProfile.applicantWithoutExperienceRegister(data);
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