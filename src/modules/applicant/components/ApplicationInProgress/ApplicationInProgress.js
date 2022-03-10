import React, {useEffect, useState} from "react";
import {Grid} from "@material-ui/core";
import ApplicantAccountItem from "../ApplicantAccountItem/ApplicantAccountItem";
import {useSelector, useDispatch} from "react-redux";
import { getPublicationAccount } from "../../../../store/actions/applicant/applicant.action";


const ApplicationInProgress = () => {
    const dispatch = useDispatch();
    const {applicant: {publicationsAccount}} = useSelector(state => state);
    useEffect(() => {
        getPublicaciones();
    }, []);

    const getPublicaciones = () => {
        dispatch(getPublicationAccount("1,2"));
    }

    return (
        <Grid item xs={12} className="mb-2">
            <Grid item xs={12} className="mb-2">
                {
                    (publicationsAccount.map((item, i) => {
                        return <ApplicantAccountItem data={item} key={item.id}  status={item.estado}
                        />;
                    }))
                }
            </Grid>
        </Grid>
    );
};
export default ApplicationInProgress;
