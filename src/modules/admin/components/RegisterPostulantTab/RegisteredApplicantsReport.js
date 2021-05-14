import React from 'react'
import { makeStyles, Grid, Typography } from '@material-ui/core'
// graficos
import { LinearProgressMunicipality } from "../../../shared/components";

import CardReport from "./CardReport";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'grid',
        gridGap: "1rem",
        gridTemplateColumns: "2fr 3fr 4fr"
    },
    bodyOne: {
        width: "90%",
        height: "350px",
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

    return (
        <div className={classes.root}>
            <CardReport title="TOTAL DE POSTULANTES REGISTRADOS">
                <div className={classes.bodyOne}>
                    <div className={classes.box}>
                        <Typography variant="h6">82 839</Typography>
                        <Typography variant="h6">POSTULANTES</Typography>
                    </div>
                </div>
            </CardReport>
            <CardReport title="POR QUE MEDIO SE ENTERÓ">
                <div className={classes.bodyTwo}>
                    <Grid container>
                        <Grid item xs={6}>
                            <Typography variant="body2">Municipalidad</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body2">80300</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body2">ONG</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body2">250</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body2">Instituo</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body2">200</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body2">Facebook</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body2">100</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body2">Instagram</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body2">150</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body2">Periódico</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body2">4</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body2">Mailing</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body2">200</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body2">TV</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body2">103</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body2">Radio</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body2">300</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body2">En bolsa de trabajo</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body2">0</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body2">Feria laboral</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body2">20</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body2">Referido</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body2">10</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body2">Otro</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body2">50</Typography>
                        </Grid>
                        <br />
                        <Grid item xs={6}>
                            <Typography variant="body2"><b>Total</b></Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body2"><b>82 839</b></Typography>
                        </Grid>
                    </Grid>
                </div>
            </CardReport>
            <CardReport title="TOP 10 DE REGISTRADOS EN MUNICIPALIDADES">
                <div className={classes.bodyThree}>
                    {
                        dataMunicipality.map(data =>
                        (<LinearProgressMunicipality
                            name={data.name}
                            value={data.value}
                            colorBar={data.color}
                            number={data.total}
                        />)
                        )
                    }
                </div>
            </CardReport>
        </div>
    )
}

const dataMunicipality = [
    { name: "Muni Lima", total: 5000, value: 100, color: "#B8EA71" },
    { name: "Muni Callao", total: 4000, value: 95, color: "#FBC547" },
    { name: "Muni SJL", total: 3000, value: 90, color: "#731D88" },
    { name: "Muni Lurin", total: 2000, value: 80, color: "#8FA5DD" },
    { name: "Muni A", total: 1000, value: 70, color: "#F96E6E" },
    { name: "Muni B", total: 900, value: 60, color: "#3F7DF6" },
    { name: "Muni C", total: 800, value: 50, color: "#D280BB" },
    { name: "Muni D", total: 700, value: 40, color: "#FFBE9D" },
    { name: "Muni E", total: 600, value: 30, color: "#78AD80" },
    { name: "Municipalidad distrital de leoncio prado", total: 500, value: 20, color: "#867789" }
]
