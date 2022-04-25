
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Grid, Paper,Snackbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Container from '../components2/Container';
import { setUser, signOut } from '../../../store/actions/auth/auth.action';
import { service_ApplicantProfile } from '../../../store/services';
import { PersonalDataForm } from '../components'
import MuiAlert from '@material-ui/lab/Alert';
import { getOS } from '../../shared/utils';
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

export default function PersonalInformation(props) {

    const dispatch = useDispatch();
    const router = useHistory()
    const classes = useStyles()
    const [personalData, setPersonalData] = useState()
    const [option, setOption] = useState()
    const { user } = useSelector(state => state?.auth);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState();

    const handleSavePersonalData = async (data) => {
        if (data) {
            const dataTemp = {...data}
            dataTemp.operating_system = getOS()
            saveApplicantProfile('personalData', dataTemp)
            setPersonalData(dataTemp)
            try {
                const response = await service_ApplicantProfile.applicantPersonalDataRegister(dataTemp);
                if (response.status === 200) {
                    dispatch(getAccount())
                    goTo(option)
                }else{
                    console.log(response)
                }
            } catch (error) {
                setOpen(true);
                setError(error?.response?.message)
                // MensajeError(error.response.data.message);
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
            router.push('/registro/postulante/educacion')
        }
    }


    return (

        <Container navbar navProgress progress={25} title={"Datos personales y de contacto"}>
            <Grid container spacing={4} style={{ marginTop: '2rem' }}>
                <Grid item xs={12}>
                    <Grid container justify="center">
                        <Grid item xs={10}>
                            <Paper className={classes.paper}>
                                <Grid container spacing={3} justify="center">
                                    <Grid item xs={11}>
                                        <Grid container direction="row" justify="space-between">
                                            <PersonalDataForm
                                                user={user?.account?.personalData}
                                                handleSavePersonalData={handleSavePersonalData}
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