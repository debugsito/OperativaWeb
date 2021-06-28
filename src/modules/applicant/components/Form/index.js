import React, { useState } from 'react'
import { Divider, Grid, makeStyles } from "@material-ui/core";

import { Typography, Button } from '../../../shared/components';
import { editIconSVG } from "../../../shared/images";
import PersonalDataForm from "./PersonalDataForm";
import ContactDataForm from "./ContactDataForm";
import EducationDataForm from "./EducationDataForm";
import WorkExperienceDataForm from "./WorkExperienceDataForm";
import RubroForm from "./RubroForm";


const useStyles = makeStyles(theme => ({

}))

export default function Index({ activeIndex, handleChangeIndex, title }) {
    const classes = useStyles()
    const [isReadOnly, setIsReadOnly] = useState(true)

    function getFormContent(activeIndex) {
        switch (activeIndex) {
            case 0:
                return <PersonalDataForm isReadOnly={isReadOnly} handleChangeIndex={handleChangeIndex} />
            case 1:
                return <ContactDataForm isReadOnly={isReadOnly} handleChangeIndex={handleChangeIndex} />
            case 2:
                return <EducationDataForm />
            case 3:
                return <WorkExperienceDataForm />
            case 4:
                return <RubroForm />
            default:
                return <span>cargando...</span>
        }
    }

    const handleClickEdit = () => {
        setIsReadOnly(false)
    }

    return (
        <Grid container spacing={3} justify="center">
            <Grid item xs={10}>
                <Grid container justify="space-between">
                    <Typography variant="h6">{title}</Typography>
                    <Button
                        size="large"
                        onClick={handleClickEdit}
                        startIcon={<img src={editIconSVG} alt="editar" />}
                    >
                        EDITAR
                    </Button>
                </Grid>
                <Divider />
            </Grid>
            <Grid item xs={8}>
                {getFormContent(activeIndex)}
            </Grid>
        </Grid>
    )
}
