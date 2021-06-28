import React, { useEffect, useState } from "react";
import { Container, Grid, Paper, makeStyles } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import { EditProfileForm, ShowProfile } from "../components";
import { Breadcrumbs } from "../../shared/components";

import { useDispatch, useSelector } from 'react-redux';

import { actions_Utils } from "../../../store/actions";

const routes = [{ name: "Perfil", to: "/dashboard" }];

const useStyles = makeStyles(theme => ({
    paper:{
        padding:"4rem"
    }
}))

const Profile = () => {
    const classes = useStyles()
    const dispatch = useDispatch();
    const {user} = useSelector(state => state?.auth)
    const [isEditActive, setIsEditActive] = useState(false);
    const [userData, setUserData] = useState({})
    const [openAlert, setOpenAlert] = useState(false)

    useEffect(() => {
        dispatch(actions_Utils.getItems())
    }, [])

    useEffect(() => {
        const { account } = user;
            let dateTemp = {
                razon_social: account.razon_social,
                document_number: account.user.document_number,
                rubro: account.role== "business"? account.user.interest_rubro_id: null,
                first_name: account.user.first_name,
                last_name: account.user.last_name,
                email: account.email,
                phone: account.user.phone,
                position: account.user.cargo_input,
                area: account.user.area_input
            }
            setUserData(dateTemp)
    },[user])

    const AlertMessage = () => (
        <div className="alert-container">
            <Alert icon={false} severity="success" color="info" onClose={() => setOpenAlert(false)}>
                Los cambios se guardaron con éxito
          </Alert>
        </div>
    );

    return (
        <Container className="dashboard-container">
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <Breadcrumbs routes={routes} />
                </Grid>
                <Grid item xs={12} style={{ margin: "1rem" }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Grid container spacing={3}>
                                <Grid item xs={2}></Grid>
                                <Grid item xs={8}>
                                    <Paper className={classes.paper}>
                                        { openAlert && AlertMessage() }
                                        <Grid container spacing={3} alignContent="center" justify="center">
                                            {
                                                isEditActive ?
                                                    <EditProfileForm setIsEditActive={setIsEditActive} userData={userData} setOpenAlert={setOpenAlert} /> :
                                                    <ShowProfile setIsEditActive={setIsEditActive} userData={userData} />
                                            }
                                        </Grid>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>


    );
};

export default Profile;
