
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Grid, Paper, Snackbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Container from '../components2/Container';
import { setUser, signOut } from '../../../store/actions/auth/auth.action';
import { service_ApplicantProfile } from '../../../store/services';
import { QuestionnaireForm } from '../components'
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


export default function Questionnaire(props) {
    const dispatch = useDispatch();
    const router = useHistory()
    const classes = useStyles()
    const [questionnaire, setQuestionnaire] = useState()
    const [option, setOption] = useState()
    const { user } = useSelector(state => state?.auth);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState();

    const handleSaveQuestionnaire = async (data) => {
        if (data) {
            saveApplicantProfile('questionnaire', data)
            setQuestionnaire(data)

            try {
                const response = await service_ApplicantProfile.applicantPersonalDataRegister(data);
                if (response.status === 200) {
                    dispatch(getAccount())
                    router.push('/')
                }else{
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

    return (

        <Container navbar navProgress progress={100} title={"Cuestionario de posicionamiento"} >
            <Grid container spacing={4} style={{ marginTop: '2rem' }}>
                <Grid item xs={12}>
                    <Grid container justify="center">
                        <Grid item xs={10}>
                            <Paper className={classes.paper}>
                                <Grid container spacing={3} justify="center">
                                    <Grid item xs={11}>
                                        <Grid container direction="row" justify="space-between">
                                            <QuestionnaireForm
                                                user={user?.account?.questionnaire}
                                                handleSaveQuestionnaire={handleSaveQuestionnaire}
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