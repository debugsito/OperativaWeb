

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Container from '../components2/Container';
import { setUser, signOut } from '../../../store/actions/auth/auth.action';
import { service_ApplicantProfile } from '../../../store/services';
import { PersonalDataForm } from '../components'
import MuiAlert from '@material-ui/lab/Alert';
import { WorkExperienceForm } from "../components";



const useStyles = makeStyles(theme => ({
    paper: {
        padding: "3rem"
    }
}))

const vertical = 'top'
const horizontal = 'right'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function WorkExperience(props) {

    const dispatch = useDispatch();
    const classes = useStyles()
    const router = useHistory()
    const { user } = useSelector(state => state?.auth);
    const [workExperience, setWorkExperience] = useState()
    const [open, setOpen] = useState(false);
    const [error, setError] = useState();
    const [option, setOption] = useState()
    const [hasExperience, setHasExperience] = useState()



    const handleSaveWorkExperience = async (data, hasExperience) => {
        if (data) {
            console.log(data)
            setHasExperience(hasExperience.value)
            setWorkExperience(data);
            //saveApplicantProfile('workExperience', data);
            // if (hasExperience.value === "withExperience") {
            //     try {
            //         const responseEducation = await service_ApplicantProfile.applicantWithExperienceRegister(data);
            //         if (responseEducation.status === 200) {
            //             setStep(5)
            //         }
            //     } catch (error) {
            //         // MensajeError(error.response.data.message);
            //     }
            // } else {
            //     setStep(5)
            // }
        }
    }

    const saveApplicantProfile = (property, value) => {
        dispatch(setUser({ ...user, account: { ...user.account, [property]: value } }))
    };


    return (
        <Container navbar>
            <Grid container spacing={4} style={{ marginTop: '2rem' }}>
                <Grid item xs={12}>
                    <Grid container justify="center">
                        <Grid item xs={10}>
                            {/* <Paper className={classes.paper}> */}
                            <WorkExperienceForm
                                                userData={user?.account?.workExperience}
                                                handleSaveWorkExperience={handleSaveWorkExperience}
                                                handleUpdateWorkExperience={(data) => saveApplicantProfile('workExperience', data)}
                                                setOption={setOption}
                                            />
                               
                            {/* </Paper> */}
                        </Grid>
                    </Grid>
                </Grid>


            </Grid>
        </Container>
    )
}