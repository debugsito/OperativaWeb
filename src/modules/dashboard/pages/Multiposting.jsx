import React from 'react'
import { useHistory } from "react-router-dom";
import { AppBar, Grid, Paper, Tabs, Tab, makeStyles } from "@material-ui/core";
import {  } from '@material-ui/core';

import { Breadcrumbs, Container, TabPanel, TitlePage } from "../../shared/components";
import { SessionRoutes } from '../../shared/libs/sessionRoutes';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: "3rem"
    },
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    rootTabs: {
        background: "#E7EAF1",
    }
}))

export default function Multiposting(props) {
    const classes = useStyles()
    const history = useHistory()
    const initRoute = SessionRoutes().initRoute;
    const routes = [{ name: "Inicio", to: `${initRoute}` }, { name: "Multiposting", to: `${initRoute}/multiposting` }];

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };


    return (
        <Container>
            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12}>
                    <Breadcrumbs routes={routes} />
                </Grid>
                <Grid item xs={12}>
                    <TitlePage
                        description="Si deseas ampliar tu búsqueda de candidatos te ayudamos compartiendo tu aviso en tus redes sociales, envíalo a tu base de datos de correos o genera un link que puedes pegar el cualquier bolsa de trabajo. Los CVs que recopilemos serán agregados a tu lista de candidatos."
                        handleClick={() => history.goBack()}
                    >
                        Difusión por Multiposting
                    </TitlePage>
                </Grid>
                <Grid item xs={8}>
                    <Paper>
                        <AppBar position="static">
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                aria-label="multiposting tabs"
                                variant="fullWidth"
                                wrapped
                                classes={{ root: classes.rootTabs }}
                            >
                                <Tab label="Compartir en redes" {...a11yProps(0)} />
                                <Tab label="Publicar en nuestra Red de Contactos Estratégicos" {...a11yProps(1)} />
                            </Tabs>
                        </AppBar>
                        <TabPanel value={value} index={0}>
                            Item One
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            Item Two
                        </TabPanel>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
