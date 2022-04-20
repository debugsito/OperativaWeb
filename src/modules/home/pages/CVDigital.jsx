
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Grid, Typography, Paper } from "@material-ui/core";
import { Button } from "../../shared/components";
import { makeStyles } from "@material-ui/core/styles";
import Container from '../components2/Container';


const useStyles = makeStyles(theme => ({
    paper: {
        padding: "3rem"
    }
}))


export default function CVDigital(props) {

    const [step, setStep] = useState(0)
    const router = useHistory()
    const classes = useStyles()
    return (
        <Container navbar>
            <Grid container spacing={4} style={{ marginTop: '2rem' }}>
                <Grid item xs={12}>
                    <Grid container justify="center">
                        <Grid item xs={10}>
                            <Paper className={classes.paper}>
                                <Grid container spacing={3} justify="center">
                                    <Grid item xs={11}>
                                    <Grid container direction="row" justify="space-between">
                                            <Grid item xs={6}>
                                                <Typography variant="h6" component="h6">
                                                    <strong>Datos Peronales</strong>
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>

        </Container>
    )

}