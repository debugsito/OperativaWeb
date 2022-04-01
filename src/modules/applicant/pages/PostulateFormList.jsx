import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container, Grid } from "@material-ui/core";
import { NavigateBefore } from '@material-ui/icons';
import { SessionRoutes } from "../../shared/libs/sessionRoutes";
import '../styles/postulate-form.css'
import ApplicantResultsPostulateForm from '../components/ApplicantPostulateForm/ApplicantResultsPostulateForm';
import { useSelector } from "react-redux";
import { arrow } from '../../shared/images/postulant/index'

const PostulateFormList = () => {
    const history = useHistory()
    const initRoute = SessionRoutes().initRoute;
    const { applicant: { publicationsSearch } } = useSelector(state => state);

    const setBefore = () => {
        history.push(`${initRoute}/formulario-postular`)
    };

    return (
        <Container className="applicant-container">
            <Grid container spacing={0}>
                <Grid item xs={12} className="mb-2">
                    <img src={arrow} alt="" onClick={setBefore} />
                </Grid>
                <Grid item xs={12} className="mb-2">

                    <div className="container-result-postulate-form">
                        <Grid item xs={12} className="mb-2">
                            <h4 className="title">Resultados</h4>
                        </Grid>
                        <Grid item xs={12} className="mb-2">
                            {
                                (publicationsSearch.map((item, i) => {
                                    return <ApplicantResultsPostulateForm data={{ publication: item }} key={item.id} route={`${initRoute}/postulacion/aviso/${item.id}`} />;
                                }))
                            }
                        </Grid>
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
};

export default PostulateFormList;
