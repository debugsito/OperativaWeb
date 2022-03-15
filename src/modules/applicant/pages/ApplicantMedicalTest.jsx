import { Container, Grid, makeStyles, Typography } from "@material-ui/core";
import { NavigateBefore } from "@material-ui/icons";
import React, { useEffect } from "react";
import { SessionRoutes } from "../../shared/libs/sessionRoutes";
import { useHistory } from "react-router-dom";
import '../styles/postulate-form.css';
import { useParams } from "react-router-dom";
import { getApplicantMedicalTest } from "../../../store/actions/applicant/applicant.action";
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles(theme => ({
    applicantContainer: {
        background: '#f7f7f7',
        padding: '1rem',
    },
}));


const ApplicantMedicalTest = () => {
    const { publication_account_id } = useParams();
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory()
    const initRoute = SessionRoutes().initRoute;
    const { applicant: { medical_test } } = useSelector(state => state);

    useEffect(() => {

        getMedicalTest()
    }, [])

    const setBefore = () => {
        history.push(`${initRoute}/evaluaciones/${publication_account_id}`)
    };

    const getMedicalTest = async () => {
        dispatch(getApplicantMedicalTest(publication_account_id))
    }

    return (
        <>
            <Container className={classes.applicantContainer}>
                <Grid container spacing={0}>
                    <Grid item xs={12} className="mb-2">
                        <a className="btn-logout">
                            <NavigateBefore onClick={setBefore} />
                        </a>
                    </Grid>

                </Grid>
                <Grid item xs={12} className="mb-2">
                    <div className="container-result-postulate-form">
                        <Grid item xs={12} className="mb-2">
                            <div className="container-header" style={{ paddingTop: '12px' }}>
                                <h4 className="title">Examen Médico</h4>
                            </div>
                        </Grid>

                    </div>
                </Grid>
                <Grid item xs={12} className="mb-2">

                    <div className="container-detail-aviso">
                        <div>
                            <p><b>Fecha</b></p>
                            <p>{medical_test?.medical_date}</p>
                        </div>
                        <div>
                            <p><b>Clinica</b></p>
                            <p>
                                {medical_test?.medical_center}
                            </p>
                        </div>
                        <div>
                            <p><b>Dirección</b></p>
                            <p>
                                {medical_test?.direction}
                            </p>
                        </div>

                        <div>
                            <p><b>Instrucciones</b></p>
                            <p>
                                {medical_test?.instructions}
                            </p>
                        </div>
                    </div>
                </Grid>
            </Container>
        </>
    )

}
export default ApplicantMedicalTest;