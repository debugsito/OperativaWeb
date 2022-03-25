import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container, Grid, makeStyles } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { SessionRoutes } from "../../shared/libs/sessionRoutes";
import { useSelector, useDispatch } from "react-redux";
import ApplicantLevelComponent from "../components/ApplicantLevelComponent/index"
import { NavigateBefore } from "@material-ui/icons";
import '../styles/applicant-job-hunting-detail.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import * as moment from 'moment';

const useStyles = makeStyles((theme) => ({
    applicantContainer: {
        background: '#f7f7f7',
        padding: '1rem',
    },
    table: {
        minWidth: '100%',
    },

}))


const ApplicantJobHuntingDetail = () => {
    const classes = useStyles();
    const history = useHistory()
    const initRoute = SessionRoutes().initRoute;
    const { auth: { user } } = useSelector(state => state)

    const setBefore = () => {
        history.push(`${initRoute}`)
    };

    useEffect(() => {
        getJobHuntigAccount();
    }, []);

    const getJobHuntigAccount = () => {

    }

    const formatDate = (value) => {
        if (value) {
            const objDate = moment(value);
            return `${objDate.format('YYYY-MM-DD')}`;
        }
        return '';
    };

    return (

        <Container className={classes.applicantContainer}>
            <Grid container spacing={0}>
                <Grid item xs={12} className="mb-2">
                    <a className="btn-logout">
                        <NavigateBefore onClick={setBefore} />
                    </a>

                </Grid>
                <Grid item xs={12} className="mb-2 header-job-hunting-detail"
                    style={{ position: 'relative' }}
                >
                    <Grid item xs={8} style={{
                        fontSize: '18px',
                        marginTop: '10px',
                        marginLeft: '8%'
                    }}>
                        <p>
                            <b>{user?.account?.user?.first_name}</b>
                            <br />
                            esta es tu puntaje
                            <br />
                            a la fecha :
                        </p>
                    </Grid>
                    <Grid item xs={4}   className="applicant-level-detail" >
                        <ApplicantLevelComponent
                           
                            job_hunting_account={user?.account?.job_hunting_account} />
                    </Grid>
                </Grid>

                <Grid item xs={12} className="mt-3 body-job-hunting-detail">
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead className="table-head">
                                <TableRow>
                                    <TableCell align="left"> Fecha</TableCell>
                                    <TableCell align="left">Accion</TableCell>
                                    <TableCell align="left">Puntos</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {user?.account?.job_hunting_account?.details?.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell className="date-format" align="left">{formatDate(row?.createdAt)}</TableCell>
                                        <TableCell align="left">{row?.actions?.description}</TableCell>
                                        <TableCell align="left">{row?.current_points}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </Grid>

            </Grid>

        </Container>
    )


}

export default ApplicantJobHuntingDetail;
