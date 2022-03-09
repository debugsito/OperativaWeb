import React, {useEffect, useState} from "react";
import {Grid} from "@material-ui/core";
import ApplicantAccountItem from "../ApplicantAccountItem/ApplicantAccountItem";

const ApplicationInProgress = () => {
    const [results, setResults] = useState([{},{},{},{},{},{}]);

    useEffect(() => {
        getPublicaciones();
    }, []);

    const getPublicaciones = () => {

    }

    return (
        <Grid item xs={12} className="mb-2">
            <Grid item xs={12} className="mb-2">
                {
                    (results.map((item, i) => {
                        return <ApplicantAccountItem data={item} key={item.id}
                        />;
                    }))
                }
            </Grid>
        </Grid>
    );
};
export default ApplicationInProgress;
