import React, { useState } from 'react'
import WithExperienceComponent from "./WithExperienceComponent"
import { Grid } from '@material-ui/core';
import { Button } from '../../../shared/components';
import { useHistory } from "react-router-dom";

export default function Workexperiencelistcomponent({ workExperienceList, handleSaveWithExperience, handleAddWorkExperience, handleDeleteWorkExperience, handleUpdateWorkExperience }) {
    const history = useHistory()
    return (
        <>
            {
                workExperienceList?.map((workExperience, index) =>
                    <WithExperienceComponent
                        handleUpdateWorkExperience={handleUpdateWorkExperience}
                        handleDeleteWorkExperience={handleDeleteWorkExperience}
                        handleAddWorkExperience={handleAddWorkExperience}
                        handleSaveWithExperience={handleSaveWithExperience}
                        index={index}
                        length={workExperienceList.length}
                        key={index}
                        user={workExperience}
                    />
                )
            }

            {/* {workExperienceList?.length < 3 && <Grid item xs={12} md={12} lg={12}>
                <Button color="primary" onClick={handleAddWorkExperience}>agregar otra experiencia</Button>
            </Grid>} */}

            {/* <Grid item xs={12} className="justify-center">
                <Button variant="outlined" size="large" onClick={() => history.push('/')}>Cancelar</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button variant="contained" size="large" onClick={handleFinish} disabled={disabledButton}>Finalizar</Button>
            </Grid> */}
        </>
    )

}
