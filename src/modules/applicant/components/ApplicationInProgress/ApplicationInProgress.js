import React, {useState} from "react";
import {Grid} from "@material-ui/core";
import ApplicantResultsPostulateForm from "../ApplicantPostulateForm/ApplicantResultsPostulateForm";

const ApplicationInProgress = () => {
    const [results, setResults] = useState([{id: 200, name: 'ABC'}]);

    return (
        <Grid item xs={12} className="mb-2">
            <Grid item xs={12} className="mb-2">
                {
                    (results.map((item, i) => {
                        return <ApplicantResultsPostulateForm data={item} key={item.id}
                        />;
                    }))
                }
            </Grid>
        </Grid>
    );
};
export default ApplicationInProgress;
