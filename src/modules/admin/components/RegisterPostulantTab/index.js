import React, { useEffect, useState } from 'react'
import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";


import DateForm from "./DateForm";
import GeneralReport from "./GeneralReport";
import RegisteredApplicantsReport from "./RegisteredApplicantsReport";
import { getReport } from "../../../../store/actions/admin/admin.midleware";
import { Button } from "../../../shared/components";
import { downloadSVG } from "../../../shared/images";
import { service_UserAdmin } from "../../../../store/services";

const useStyles = makeStyles(theme => ({
    paper: {
        padding: "3rem"
    }
}))
const date = { startDate: "2021-03-19", finishDate: "2021-03-31" }

export default function Index() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [values, setValues] = useState("")

    useEffect(() => {
        dispatch(getReport(date))
    }, [])

    const updateReport = (values) => {
        dispatch(getReport(values))
        setValues(values)
        console.log(":::::values:::::", values)
    }

    const handleDownload = async () => {
        // await service_UserAdmin.getFileReport(date);
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <DateForm updateReport={updateReport} />
            </Grid>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <div className="justify-end">
                                <Button
                                    size="large"
                                    variant="contained"
                                    onClick={handleDownload}
                                    startIcon={<img src={downloadSVG} alt="descargar" />}
                                >
                                    DESCARGAR
                                </Button>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <RegisteredApplicantsReport />
                        </Grid>
                        <Grid item xs={12}>
                            <GeneralReport />
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    )
}
