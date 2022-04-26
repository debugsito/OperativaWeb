

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Grid, Snackbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Container from '../components2/Container';
import { setUser, signOut } from '../../../store/actions/auth/auth.action';
import { service_ApplicantProfile } from '../../../store/services';
import MuiAlert from '@material-ui/lab/Alert';
import { WorkExperienceForm } from "../components";
import { getAccount } from "../../../store/actions/auth/auth.middleware";


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


    const saveHasExperience = async (data) => {
        try {
            await service_ApplicantProfile.applicantPersonalDataRegister(data);

        } catch (error) {
            console.log(error?.data?.message)
        }

    }


    const handleSaveWorkExperience = async (data, hasExperience) => {
        if (data) {
            setHasExperience(hasExperience.value)
            setWorkExperience(data);
            saveApplicantProfile('workExperience', data);
            let dataTemp = hasExperience.value === "withExperience" ? Object.assign({}, { hasExperience: 1 }) : Object.assign({}, { hasExperience: 0 })
            await saveHasExperience(dataTemp);

            if (hasExperience.value === "withExperience") {
                try {
                    const responseWork = await service_ApplicantProfile.applicantWithExperienceRegister(data);
                    responseNextOperation(responseWork)
                } catch (error) {
                    setOpen(true);
                    setError(error?.response?.data?.errorMessage)
                }
            } else {
                try {
                    const response = await service_ApplicantProfile.applicantPersonalDataRegister(data);
                    responseNextOperation(response)
                } catch (error) {
                    setOpen(true);
                    setError(error?.response?.data?.message)
                }

            }
        }
    }

    const responseNextOperation = (response) => {
        if (response.status === 200) {
            dispatch(getAccount())
            goTo(option)
        }
        else {
            setOpen(true);
            setError("Ocurrio un error")
        }
    }

    const saveApplicantProfile = (property, value) => {
        dispatch(setUser({ ...user, account: { ...user.account, [property]: value } }))
    };


    const goTo = (optionParam) => {
        if (optionParam == 1) {
            router.push('/registro/postulante/finish-cv')
        }
        if (optionParam == 2) {
            router.push('/registro/postulante/finish-cv')
        }
    }

    const handleCloseAlert = () => {
        setOpen(false)
    }


    return (
        <Container navbar navProgress progress={75} title={"Experiencia laboral"}>
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
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="error">
                    {error}
                </Alert>
            </Snackbar>
        </Container>
    )
}