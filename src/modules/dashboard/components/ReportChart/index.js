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
        width: "100%",
        marginLeft: "7rem"
    }
}))

export default function Index(props) {
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
            const gender = reportByPostulantId[0]?.data?.map(item => (
                {
                    name: item.genero,
                    y: Number(item.count)
                }
            ))
            const rubro = reportByPostulantId[1].data.map(item => (
                {
                    name: item.rubros,
                    y: Number(item.count)
                }
            ))
            const age = reportByPostulantId[2].data.map(item => (
                {
                    name: item.leyenda,
                    y: Number(item.count)
                }
            ))
            const provincias = reportByPostulantId[3].data.map(item => (
                {
                    name: item.provincia,
                    y: Number(item.count)
                }
            ))
            const distritos = reportByPostulantId[4].data.map(item => (
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
            <Grid item xs={6}>
                <div className={classes.title}>
                    <h3>Géneros</h3>
                </div>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={ChartOptions("Géneros", genderData, ["#F3747D", "#0F8DC3", "#FCB81A"])}
                />
            </Grid>
            <Grid item xs={6}>
                <div className={classes.title}>
                    <h3>Rubros</h3>
                </div>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={ChartOptions("Rubros", rubroData, ["#CBE3E9", "#A2EE37", "#78957C", "#27EAF6", "#7F85FD"])}
                />
            </Grid>
            <Grid item xs={6}>
                <div className={classes.title}>
                    <h3>Edades</h3>
                </div>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={ChartOptions("Edades", ageData, ["#C1953C", "#BAE7AF", "#A39470", "#F65470", "#7F85FD"])}
                />
            </Grid>
            <Grid item xs={6}>
                <div className={classes.title}>
                    <h3>Provincias</h3>
                </div>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={ChartOptions("Provincias", provinceData, ["#CBCAC8", "#A2EE37", "#FCB81A", "#F65470", "#7F85FD"])}
                />
            </Grid>
            <Grid item xs={6} style={{ margin: "0 auto" }}>
                <div className={classes.title}>
                    <h3>Top 20 Distritos</h3>
                </div>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={ChartOptions("Top 20 Distritos", topDistrictsData, ["#CBCAC8", "#A2EE37", "#FCB81A", "#F65470", "#7F85FD"])}
                />
            </Grid>
        </Grid>
    )
}