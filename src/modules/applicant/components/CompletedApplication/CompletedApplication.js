import React, {useState,useEffect} from "react";
import {Grid} from "@material-ui/core";
import ApplicantResultsPostulateForm from "../ApplicantPostulateForm/ApplicantResultsPostulateForm";
import {useSelector, useDispatch} from "react-redux";
import { getPublicationAccount } from "../../../../store/actions/applicant/applicant.action";

const CompletedApplication = () => {
    const dispatch = useDispatch();
    const {applicant: {publicationsAccount}} = useSelector(state => state);
    // const [results, setResults] = useState([{id: 200, name: 'ABC'}]);
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
                        return <ApplicantResultsPostulateForm data={item} key={item.id} status={item.estado}
                        />;
                    }))
                }
            </Grid>
        </Grid>
    );
};
export default CompletedApplication;
