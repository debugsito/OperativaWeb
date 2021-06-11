import React from 'react'
import { useSelector } from "react-redux";
import { makeStyles, Grid, Typography } from '@material-ui/core'
// graficos
import { LinearProgressMunicipality } from "../../../shared/components";

import CardReport from "./CardReport";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'grid',
        gridGap: "1rem",
        [theme.breakpoints.down('sm')]: {
            gridTemplateColumns: "1fr",
        },
        [theme.breakpoints.up('md')]: {
            gridTemplateColumns: "2fr 3fr 4fr",
        },
    },
    containerBodyOne: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex",
        alignItems: "center"
    },
    bodyOne: {
        width: "90%",
        height: "250px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    box: {
        background: '#FBC547',
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem"

    },
    bodyTwo: {
        background: '#F1EFEF',
        width: "90%",
        padding: "0.5rem",
        margin: "1rem 0 1rem 0"
    },
    bodyThree: {
        background: '#F1EFEF',
        width: "90%",
        padding: "0.5rem",
        margin: "1rem 0 1rem 0"
    }
}))
export default function RegisteredApplicantsReport(props) {
    const classes = useStyles();
    const { report } = useSelector(state => state?.admin)

    return (
        <div className={classes.root}>
            <CardReport title="TOTAL DE POSTULANTES REGISTRADOS">
                <div className={classes.containerBodyOne}>
                    <div className={classes.bodyOne}>
                        <div className={classes.box}>
                            <Typography variant="h3">{report.registrados}</Typography>
                            <Typography variant="body2">POSTULANTES CON CUENTA CREADA</Typography>
                        </div>
                    </div>

                    <div className={classes.bodyOne}>
                        <div className={classes.box}>
                            <Typography variant="h3">{report.postulantes}</Typography>
                            <Typography variant="body2">POSTULANTES CON DATOS DE REGISTRO COMPLETADO</Typography>
                        </div>
                    </div>
                </div>
            </CardReport>
            <CardReport title="POR QUE MEDIO SE ENTERÓ">
                <div className={classes.bodyTwo}>
                    <Grid container>
                        {report?.medio?.map(medio => (
                            <>
                                <Grid item xs={6}>
                                    <Typography variant="body2">{medio.provedor}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2">{medio.count}</Typography>
                                </Grid>
                            </>
                        ))}

                        <br />
                        <Grid item xs={6}>
                            <Typography variant="body2"><b>Total</b></Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body2"><b>
                                {
                                    report?.medio?.reduce((acc, current) => acc + current.count, 0)
                                }
                            </b></Typography>
                        </Grid>
                    </Grid>
                </div>
            </CardReport>
            <CardReport title="TOP 10 DE REGISTRADOS EN MUNICIPALIDADES">
                <div className={classes.bodyThree}>
                    {
                        report?.munis?.map((data, index) => (
                            <LinearProgressMunicipality
                                index={index}
                                name={data.razon_social}
                                value={data.cantidad}
                                // colorBar={data.color}
                                total={data.cantidad}
                            />
                        ))
                    }
                </div>
            </CardReport>
        </div>
    )
}