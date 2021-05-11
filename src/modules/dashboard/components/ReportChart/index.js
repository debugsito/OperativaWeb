import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { ChartOptions } from "../../constants";

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

    return (
        <Grid container>
            <Grid item xs={6}>
                <div className={classes.title}>
                    <h3>Generos</h3>
                </div>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={ChartOptions("Generos", dataGenero, ["#F3747D", "#0F8DC3", "#FCB81A"])}
                />
            </Grid>
            <Grid item xs={6}>
                <div className={classes.title}>
                    <h3>Rubros</h3>
                </div>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={ChartOptions("Rubros", dataRubros, ["#CBE3E9", "#A2EE37", "#78957C", "#27EAF6", "#7F85FD"])}
                />
            </Grid>
            <Grid item xs={6}>
                <div className={classes.title}>
                    <h3>Edades</h3>
                </div>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={ChartOptions("Edades", dataEdades, ["#C1953C", "#BAE7AF", "#A39470", "#F65470", "#7F85FD"])}
                />
            </Grid>
            <Grid item xs={6}>
                <div className={classes.title}>
                    <h3>Provincias</h3>
                </div>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={ChartOptions("Provincias", dataProvincias, ["#CBCAC8", "#A2EE37", "#FCB81A", "#F65470", "#7F85FD"])}
                />
            </Grid>
            <Grid item xs={6} style={{ margin: "0 auto" }}>
                <div className={classes.title}>
                    <h3>Top 20 Distritos</h3>
                </div>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={ChartOptions("Top 20 Distritos", dataDistritos, ["#CBCAC8", "#A2EE37", "#FCB81A", "#F65470", "#7F85FD"])}
                />
            </Grid>
        </Grid>
    )
}

const dataGenero = [{
    name: 'Femenino',
    y: 60,
    // sliced: true,
    // selected: true
}, {
    name: 'Masculino',
    y: 28
}, {
    name: 'Otros',
    y: 12
}]

const dataRubros = [{
    name: 'Construccion y obras',
    y: 57,
    // sliced: true,
    // selected: true
}, {
    name: 'Almacén y trasporte',
    y: 28
}, {
    name: 'Call center y ventas',
    y: 10
},
{
    name: 'Producción y operaciones',
    y: 5
},
{
    name: 'Motorizados',
    y: 3
}]

const dataEdades = [{
    name: 'De 18 a 25 años',
    y: 65,
    // sliced: true,
    // selected: true
}, {
    name: 'De 25 a 32 años',
    y: 20
}, {
    name: 'De 32 a 39 años',
    y: 10
},
{
    name: 'De 40 a 47 años',
    y: 5
},
{
    name: 'De 48 a 54 años',
    y: 3
}]

const dataProvincias = [{
    name: 'Lima',
    y: 65,
    // sliced: true,
    // selected: true
}, {
    name: 'Callao',
    y: 20
}, {
    name: 'Piura',
    y: 10
},
{
    name: 'Trujillo',
    y: 5
},
{
    name: 'Puno',
    y: 3
}]

const dataDistritos = [{
    name: 'San Juan de Mirraflores',
    y: 65,
    // sliced: true,
    // selected: true
}, {
    name: 'San Juan de Lurigancho',
    y: 20
}, {
    name: 'Pueblo Libre',
    y: 10
},
{
    name: 'Comas',
    y: 5
},
{
    name: 'Villa el Salvador',
    y: 3
}]