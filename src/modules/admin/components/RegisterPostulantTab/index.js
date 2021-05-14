import React from 'react'
import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

import DateForm from "./DateForm";
import GeneralReport from "./GeneralReport";
import RegisteredApplicantsReport from "./RegisteredApplicantsReport";
import { Button } from "../../../shared/components";
import { downloadSVG } from "../../../shared/images";

const useStyles = makeStyles(theme => ({
    paper: {
        padding: "3rem"
    }
}))
export default function Index(props) {
    const classes = useStyles()

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <DateForm />
            </Grid>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <div className="justify-end">
                                <Button
                                    variant="contained"
                                    size="large"
                                    startIcon={<img src={downloadSVG} alt="descargar" />}>
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
