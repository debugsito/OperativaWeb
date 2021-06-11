import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { ChartOptions } from "../../../shared/constants";

import { getReportByPostulantId } from "../../../../store/actions/dashboard/dashboard.middleware";
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

const REPORT_DATA = {
    GENDER: 0,
    RUBRO: 1,
    AGE: 2,
    PROVINCES: 3,
    TOP_TEN_DISTRICTS: 4
}

export default function Index() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const { publicationSelected, reportByPostulantId } = useSelector(state => state?.dashboard)
    const [genderData, setGenderData] = useState([])
    const [rubroData, setRubroData] = useState([])
    const [ageData, setAgeData] = useState([])
    const [provinceData, setProvinceData] = useState([])
    const [topDistrictsData, setTopDisctrictsData] = useState([])

    useEffect(() => {
        dispatch(getReportByPostulantId({ postulant_id: publicationSelected.id }))
    }, [])

    useEffect(() => {
        if (reportByPostulantId.length > 0) {
            const gender = reportByPostulantId[REPORT_DATA.GENDER]?.data?.map(item => (
                {
                    name: item.genero,
                    y: Number(item.count)
                }
            ))
            const rubro = reportByPostulantId[REPORT_DATA.RUBRO]?.data.map(item => (
                {
                    name: item.rubros,
                    y: Number(item.count)
                }
            ))
            const age = reportByPostulantId[REPORT_DATA.AGE]?.data.map(item => (
                {
                    name: item.leyenda,
                    y: Number(item.count)
                }
            ))
            const provincias = reportByPostulantId[REPORT_DATA.PROVINCES]?.data.map(item => (
                {
                    name: item.provincia,
                    y: Number(item.count)
                }
            ))
            const distritos = reportByPostulantId[REPORT_DATA.TOP_TEN_DISTRICTS]?.data.map(item => (
                {
                    name: item.distrito,
                    y: Number(item.count)
                }
            ))

            setGenderData(gender)
            setRubroData(rubro)
            setAgeData(age)
            setProvinceData(provincias)
            setTopDisctrictsData(distritos)
        }

    }, [reportByPostulantId])

    return (
        <Grid container>
            <Grid item xs={12}>
                <h2 className={classes.title}>REPORTE GENERAL</h2>
            </Grid>
            <Grid item xs={12} md={6}>
                <h3 className={classes.subTitle}>Género</h3>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={ChartOptions("Géneros", genderData, ["#F3747D", "#0F8DC3", "#FCB81A"])}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <h3 className={classes.subTitle}>Rubros</h3>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={ChartOptions("Rubros", rubroData, ["#CBE3E9", "#A2EE37", "#78957C", "#27EAF6", "#7F85FD"])}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <h3 className={classes.subTitle}>Edades</h3>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={ChartOptions("Edades", ageData, ["#C1953C", "#BAE7AF", "#A39470", "#F65470", "#7F85FD"])}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <h3 className={classes.subTitle}>Provincias</h3>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={ChartOptions("Provincias", provinceData, ["#CBCAC8", "#A2EE37", "#FCB81A", "#F65470", "#7F85FD"])}
                />
            </Grid>
            <Grid item xs={12} md={6} style={{ margin: "0 auto" }}>
                <h3 className={classes.subTitle}>Top 10 Distritos</h3>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={ChartOptions("Top 20 Distritos", topDistrictsData, ["#CBCAC8", "#A2EE37", "#FCB81A", "#F65470", "#7F85FD"])}
                />
            </Grid>
        </Grid>
    )
}