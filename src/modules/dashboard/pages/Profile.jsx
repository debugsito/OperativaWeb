import React, { useEffect, useState } from "react";
import { Alert } from "@material-ui/lab";
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Paper, makeStyles } from "@material-ui/core";

import { EditProfileForm, ShowProfile } from "../components";
import { Breadcrumbs } from "../../shared/components";
import { actions_Utils } from "../../../store/actions";
import { updateAccount } from "../../../store/actions/auth/auth.action";

const routes = [{ name: "Perfil", to: "/dashboard" }];

const useStyles = makeStyles(theme => ({
    paper:{
        padding:"4rem"
    }
}))

const ALERT = {
    SUCCESS : "success",
    ERROR : "error"
}

const Profile = () => {
    const classes = useStyles()
    const dispatch = useDispatch();
    const {user} = useSelector(state => state?.auth)
    const [isEditActive, setIsEditActive] = useState(false);
    const [userData, setUserData] = useState({})
    const [openAlert, setOpenAlert] = useState({state: false})

    useEffect(() => {
        dispatch(actions_Utils.getItems())
    }, [])

    useEffect(() => {
        const { account } = user;
            let dateTemp = {
                first_name: account.user.first_name,
                last_name: account.user.last_name,
                document_number: account.user.document_number,
                phone: account.user.phone,
                razon_social: account.razon_social,
                rubro: account.role== "business"? account.user.interest_rubro_id: null,
                email: account.email,
                position: account.user.cargo_input,
                area: account.user.area_input,
                image_url: account.user?.image_url
            }
            setUserData(dateTemp)
    },[user])

    const updateData = (values) => {
        let body = {}
        if(values.image_key){
            body = {
                email: userData.email,
                razon_social: userData.razon_social,
                user: {
                    first_name: userData.first_name,
                    last_name: userData.last_name,
                    document_number: userData.document_number,
                    phone: userData.phone,
                    area_input: userData.area,
                    cargo_input: userData.position,
                    interest_rubro_id: userData.rubro,
                    image_key:values.image_key
                }
            }
        }else{
            body = {...values}
        }
        dispatch(updateAccount(body))
        setIsEditActive(false)
        handleAlertSuccess()
    }

    const handleAlertSuccess = () => {
        setOpenAlert({state:true, type:ALERT.SUCCESS})
    }

    const handleAlertError = () => {
        setOpenAlert({state:true, type:ALERT.ERROR})
    }

    const AlertMessage = () => (
        <div className="alert-container">
            <Alert icon={false} severity={openAlert.type} onClose={() => setOpenAlert({state:false})}>
                {openAlert.type === "success" ? "Los cambios se guardaron con éxito" : "Ocurrio un error, recargue la página y vuelva a intentarlo"}
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
                                        { openAlert.state && AlertMessage() }
                                        <Grid container spacing={3} alignContent="center" justify="center">
                                            {
                                                isEditActive ?
                                                    <EditProfileForm updateAccount={updateData} userData={userData} setIsEditActive={setIsEditActive}/> :
                                                    <ShowProfile updateAccount={updateData} setIsEditActive={setIsEditActive} userData={userData} handleAlertError={handleAlertError}/>
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
