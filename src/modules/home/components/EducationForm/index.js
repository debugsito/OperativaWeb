import React, { useState, useEffect } from 'react';
import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, Typography } from '@material-ui/core';
import { useForm } from "../../../hooks";
import { Snackbars, Select, Button, TextInput, Modal } from '../../../shared/components';
import { academicLevelsList, specialtiesList } from '../../../../store/services/utils.service';
import { onlyNumbers } from '../../../shared/libs/validators';
import ACADEMIC_LEVEL from "../../../global/constants/types/academicLevels";
import SPECIALITY from "../../../global/constants/types/speciality";
import { makeStyles } from '@material-ui/core/styles';
import EducationComponent from './EducationComponent'


const defaultValues = {
    level_id: "",
    name_inst: "",
    from_year: "",
    endYear: "",
    speciality_id: null,
    otherSpeciality: null
}
const initialValues = [defaultValues]

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
    }
}))

export default function EducationForm({ userData = initialValues, handleSaveEducation, handleUpdateEducation, history, setOption }) {

    const classes = useStyle()

    // useEffect(() => {
    //     console.log(userData)
    // }, [userData])


    const handleAddEducation = () => {
        let userDataTemp = [...userData];
        userDataTemp.push(defaultValues)
        handleUpdateEducation(userDataTemp);
    }

    const handleDeleteEducation = (index) => {
        let userDataTemp = [...userData]
        userDataTemp.splice(index, 1)
        handleUpdateEducation(userDataTemp)
    }

    const handleUpdateEducationTemp = (values, index) => {
        let userDataTemp = [...userData]
        userDataTemp[index] = values
        handleUpdateEducation(userDataTemp)
    }

    const handleSaveEducationLocal = () => {
        handleSaveEducation(userData);
    }




    return (

        <>
            {
                userData?.map((data, index) =>
                    <>
                        <EducationComponent
                            handleUpdateEducation={handleUpdateEducationTemp}
                            handleDeleteEducation={handleDeleteEducation}
                            handleAddEducation={handleAddEducation}
                            handleSaveEducation={handleSaveEducationLocal}
                            index={index}
                            length={userData.length}
                            key={index}
                            user={data}
                            setOption={setOption}
                        />
                    </>
                )

            }


        </>
    )

}