import {Container, Dialog, Grid, makeStyles, Typography} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {SessionRoutes} from "../../shared/libs/sessionRoutes";
import {NavigateBefore} from "@material-ui/icons";
import React from "react";
import ApplicantResultsPostulateForm from "../components/ApplicantPostulateForm/ApplicantResultsPostulateForm";

const useStyles = makeStyles((theme) => ({
    // background: #f7f7f7;
    // padding: 1rem;
    container: {
        background: '#f7f7f7',
        padding: '1rem',
    }
}));

const ApplicationDetail = () => {
    const classes = useStyles();
    const history = useHistory()
    const initRoute = SessionRoutes().initRoute;
    const setBefore = () => {
        history.push(`${initRoute}/postulaciones`)
    };

    return (
        <Container className={classes.container}>
            <Grid container spacing={0}>
                <Grid item xs={12} className="mb-2">
                    <a className="btn-logout">
                        <NavigateBefore onClick={setBefore}/>
                    </a>
                </Grid>
                <Grid item xs={12}>
                    <ApplicantResultsPostulateForm/>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ApplicationDetail;
