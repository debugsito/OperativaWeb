


import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Grid, Typography, Paper, Snackbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Container from '../components2/Container';
import { setUser, signOut } from '../../../store/actions/auth/auth.action';
import { service_ApplicantProfile } from '../../../store/services';
import { EducationForm } from '../components'
import MuiAlert from '@material-ui/lab/Alert';

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
            console.log(data);
            console.log(option)
            // saveApplicantProfile('education', data);
            // setEducation(data);
            // try {
            //     const response = await service_ApplicantProfile.applicantEducationRegister(data);
            //     if (response.status === 200) {
            //         // setStep(4)
            //     }
            // } catch (error) {
            //     // MensajeError(error.response.data.message);
            // }
        }
    }

    const saveApplicantProfile = (property, value) => {
        dispatch(setUser({ ...user, account: { ...user.account, [property]: value } }))
    };

    const handleCloseAlert = () => {
        setOpen(false)
    }



    return (

        <Container navbar>
            <Grid container spacing={4} style={{ marginTop: '2rem' }}>
                <Grid item xs={12}>
                    <Grid container justify="center">
                        <Grid item xs={10}>
                            <Paper className={classes.paper}>
                                <Grid container spacing={3} justify="center">
                                    <Grid item xs={11}>
                                        <Grid container direction="row" justify="space-between">
                                            <EducationForm
                                                user={user?.account?.personalData}
                                                handleSaveEducation={handleSaveEducation}
                                                setOption={setOption}
                                            />
                                        </Grid>
                                    </Grid>

                                </Grid>
                            </Paper>
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