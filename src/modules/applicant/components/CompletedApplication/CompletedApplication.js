import React, {useState,useEffect} from "react";
import {Grid} from "@material-ui/core";
import ApplicantResultsPostulateForm from "../ApplicantPostulateForm/ApplicantResultsPostulateForm";
import {useSelector, useDispatch} from "react-redux";
import { getPublicationAccount } from "../../../../store/actions/applicant/applicant.action";
import { SessionRoutes } from "../../../shared/libs/sessionRoutes";

const CompletedApplication = () => {
    const dispatch = useDispatch();
    const {applicant: {publicationsAccount}} = useSelector(state => state);
    const initRoute = SessionRoutes().initRoute;
    useEffect(() => {
        getPublicaciones();
    }, []);

    const getPublicaciones = () => {
        dispatch(getPublicationAccount(3));
    }

    return (
        <Grid item xs={12} className="mb-2">
            <Grid item xs={12} className="mb-2">
                {
                    (publicationsAccount.map((item, i) => {
                        return <ApplicantResultsPostulateForm 
                        data={item} 
                        key={item.id} 
                        status={item.estado}
                        route={`${initRoute}/postulacion/detalle/${item.id}/2`} 
                        />;
                    }))
                }
            </Grid>
        </Grid>
    );
};
export default CompletedApplication;
