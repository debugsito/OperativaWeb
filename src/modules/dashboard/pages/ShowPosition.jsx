import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";

import { Breadcrumbs, Container} from "../../shared/components";
import { ShowPositionHistory, ReportChartHistory } from "../components";
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
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Breadcrumbs routes={routes} />
                </Grid>
                <Grid item xs={12}>
                    <Grid container justify="center">
                        <Grid item xs={10}>
                            <Paper className={classes.paper}>
                                <ShowPositionHistory 
                                    // button={
                                    //     <Button color="black" onClick={() => console.log("descargando...")}>
                                    //         <img src={downloadBlackIcon} />
                                    //         <span className="dashboard-title">Descargar</span>
                                    //     </Button>
                                    // }
                                />
                                <ReportChartHistory />
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}
