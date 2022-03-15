import { Container, Grid, makeStyles, Typography } from "@material-ui/core";
import { NavigateBefore } from "@material-ui/icons";
import React, { useEffect } from "react";
import { SessionRoutes } from "../../shared/libs/sessionRoutes";
import { useHistory } from "react-router-dom";
import '../styles/postulate-form.css';
import { useParams } from "react-router-dom";
import { getApplicantInterview } from "../../../store/actions/applicant/applicant.action";
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles(theme => ({
    applicantContainer: {
        background: '#f7f7f7',
        padding: '1rem',
    },
}));


const ApplicantInterview = () => {
    const { publication_account_id } = useParams();
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory()
    const initRoute = SessionRoutes().initRoute;
    const { applicant: { interview } } = useSelector(state => state);

    useEffect(() => {

        getInterview()
    }, [])

    const setBefore = () => {
        history.push(`${initRoute}/evaluaciones/${publication_account_id}`)
    };

    const getInterview = async () => {
        dispatch(getApplicantInterview(publication_account_id))
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
                                <h4 className="title">Entrevista</h4>
                            </div>
                        </Grid>

                    </div>
                </Grid>
                <Grid item xs={12} className="mb-2">

                    <div className="container-detail-aviso">
                        <div>
                            <p><b>Fecha</b></p>
                            <p>{interview?.interview_date}</p>
                        </div>
                        <div>
                            <p><b>Entrevistador</b></p>
                            <p>
                                {interview?.interviewer}
                            </p>
                        </div>
                        {interview?.virtual ?
                            <div>
                                <p><b>Url Entrevista</b></p>
                                <p>
                                    {interview?.url_interview}
                                </p>
                            </div>
                            : <div>
                                <p><b>Dirección</b></p>
                                <p>
                                    {interview?.direction}
                                </p>
                            </div>}
                        <div>
                            <p><b>Instrucciones</b></p>
                            <p>
                                {interview?.instructions}
                            </p>
                        </div>
                    </div>
                </Grid>
            </Container>
        </>
    )

}
export default ApplicantInterview;