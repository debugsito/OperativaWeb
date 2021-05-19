import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { ChartOptions } from "../../../shared/constants";

// graficos
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const useStyles = makeStyles(theme => ({
    title: {
        textAlign: "center"
    },
    subTitle: {
        marginLeft: "5rem"
    }
}))


export default function Index(props) {
    const classes = useStyles()
    const { report } = useSelector(state => state?.admin)
    const [systemOperation, setSystemOperation] = useState([]);
    const [genderData, setGenderData] = useState([]);
    const [rubrosData, setRubrosData] = useState([]);
    const [ageData, setAgeData] = useState([]);
    const [provinceData, setProvinceData] = useState([]);
    const [topTenData, setTopTenData] = useState([]);


    useEffect(() => {
        const SO = report.general[0]?.data?.map(so => (
            {
                name: so.operating_system,
                y: Number(so.count)
            }
        ))

        const gender = report.general[1]?.data?.map(item => (
            {
                name: item.genero,
                y: Number(item.count)
            }
        ))

        const rubros = report.general[2]?.data?.map(item => (
            {
                name: item.rubros,
                y: Number(item.count)
            }
        ))

        const age = report.general[3]?.data?.map(item => (
            {
                name: item.leyenda,
                y: Number(item.count)
            }
        ))

        const province = report.general[4]?.data?.map(item => (
            {
                name: item.provincia,
                y: Number(item.count)
            }
        ))

        const topTen = report.general[5]?.data?.map(item => (
            {
                name: item.distrito,
                y: Number(item.count)
            }
        ))

        setSystemOperation(SO)
        setGenderData(gender)
        setRubrosData(rubros)
        setAgeData(age)
        setProvinceData(province)
        setTopTenData(topTen)
    }, [])

    return (
        <Grid container>
            <Grid item xs={12}>
                <h2 className={classes.title}>REPORTE GENERAL</h2>
            </Grid>
            <Grid item xs={6}>
                <h3 className={classes.subTitle}>Usuarios por sistema operativo</h3>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={ChartOptions("Usuarios por sistema operativo", systemOperation, ["#CBE3E9", "#A2EE37", "#78957C", "27EAF6", "7F85FD"])}
                />
            </Grid>
            <Grid item xs={6}>
                <h3 className={classes.subTitle}>Géneros</h3>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={ChartOptions("Géneros", genderData, ["#F3747D", "#0F8DC3", "#FCB81A", , "27EAF6", "7F85FD"])}
                />
            </Grid>
            <Grid item xs={6}>
                <h3 className={classes.subTitle}>Rubros</h3>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={ChartOptions("Rubros", rubrosData, ["#CBE3E9", "#A2EE37", "#78957C", "#27EAF6", "#7F85FD"])}
                />
            </Grid>
            <Grid item xs={6}>
                <h3 className={classes.subTitle}>Edades</h3>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={ChartOptions("Edades", ageData, ["#C1953C", "#BAE7AF", "#A39470", "#F65470", "#7F85FD"])}
                />
            </Grid>
            <Grid item xs={6}>
                <h3 className={classes.subTitle}>Provincias</h3>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={ChartOptions("Provincias", provinceData, ["#CBCAC8", "#A2EE37", "#FCB81A", "#F65470", "#7F85FD"])}
                />
            </Grid>
            <Grid item xs={6} style={{ margin: "0 auto" }}>
                <h3 className={classes.subTitle}>Top 20 Distritos</h3>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={ChartOptions("Top 20 Distritos", topTenData, ["#CBCAC8", "#A2EE37", "#FCB81A", "#F65470", "#7F85FD"])}
                />
            </Grid>

        </Grid>
    )
}
