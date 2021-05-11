import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, Paper } from "@material-ui/core";

// graficos
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { Breadcrumbs, Button} from "../../shared/components";
import { ShowPosition, ReportChart } from "../components";
import { SessionRoutes } from "../../shared/libs/sessionRoutes";
import { downloadBlackIcon } from "../images";

const useStyles = makeStyles( theme => ({
    paper:{
        padding: "3rem"
    }
}))

export default function ShowPositionPage() {
    const classes = useStyles()
    const initRoute = SessionRoutes().initRoute;
    const routes = [{ name: "HISTORIAL", to: `${initRoute}/historial-de-publicaciones` }, { name: "VER", to: `${initRoute}/ver-posicion` }];

    return (
        <Container className="dashboard-container">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Breadcrumbs routes={routes} />
                </Grid>
                <Grid item xs={12}>
                    <Grid container direction="column" justify="center" alignItems="center">
                        <Grid item xs={10}>
                            <Paper className={classes.paper}>
                                <ShowPosition 
                                    button={
                                        <Button color="black" onClick={() => console.log("descargando...")}>
                                            <img src={downloadBlackIcon} />
                                            <span className="dashboard-title">Descargar</span>
                                        </Button>
                                    }
                                />
                                <ReportChart />
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}
