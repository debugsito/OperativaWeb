


import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Grid,  Snackbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Container from '../components2/Container';
import { setUser, signOut } from '../../../store/actions/auth/auth.action';
import { service_ApplicantProfile } from '../../../store/services';
import { EducationForm } from '../components'
import MuiAlert from '@material-ui/lab/Alert';
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

export default function Education(props) {
    const dispatch = useDispatch();
    const [step, setStep] = useState(0)
    const router = useHistory()
    const classes = useStyles()
    const [option, setOption] = useState()
    const { user } = useSelector(state => state?.auth);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState();
    const [education, setEducation] = useState()

    const handleSaveEducation = async (data) => {
        if (data) {
            saveApplicantProfile('education', data);
            setEducation(data);
          
            try {
                const response = await service_ApplicantProfile.applicantEducationsResgister(data);
                
                if (response.status === 200) {
                    saveApplicantProfile('education', response.data);
                    dispatch(getAccount())
                    goTo(option)
                }
                else {
                    setOpen(true);
                    setError("Ocurrion un error")
                }
            } catch (error) {
                setOpen(true);
                setError(error?.response?.data?.message)
            }
        }
    }

    const saveApplicantProfile = (property, value) => {
        dispatch(setUser({ ...user, account: { ...user.account, [property]: value } }))
    };

    const handleCloseAlert = () => {
        setOpen(false)
    }

    const goTo =(optionParam)  => {
        if (optionParam == 1) {
            router.push('/registro/postulante/finish-cv')
        }
        if (optionParam == 2) {
            router.push('/registro/postulante/experiencia-laboral')
        }
    }

    return (

        <Container navbar navProgress progress={50} title={"Educación"}>
            <Grid container spacing={4} style={{ marginTop: '2rem' }}>
                <Grid item xs={12}>
                    <Grid container justify="center">
                        <Grid item xs={10}>
                            <EducationForm
                                userData={user?.account?.education}
                                handleSaveEducation={handleSaveEducation}
                                handleUpdateEducation={(data) => saveApplicantProfile('education', data)}
                                setOption={setOption}
                            />
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