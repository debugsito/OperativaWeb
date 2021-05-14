import React from 'react'
import PropTypes from 'prop-types';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Box, Container, Grid, Tab, Tabs, Typography } from '@material-ui/core';

import { RegisterPostulantTab } from "../components";
import { Breadcrumbs } from "../../shared/components";
import { SessionRoutes } from "../../shared/libs/sessionRoutes";

const useStyles = makeStyles((theme) => ({
    rootAppbar: {
        flexGrow: 1,
        width: '100%',
    },
    //Style for Tabs container
    rootTabs:{
        paddingBottom:'5px'
    },
    indicator: {
        [theme.breakpoints.down('sm')]: {
            backgroundColor: "#F7F7F7",
        },
        [theme.breakpoints.up('md')]: {
            backgroundColor: "var(--primaryButtonColor)",
        },
        
    },
    flexContainer:{
        [theme.breakpoints.down('sm')]: {
            flexDirection:'column',
            alignItems:'flex-start'
        },
    },
    //Fin Tabs

    // Estilos para Tab
    rootTab:{
        maxWidth:'none',
        '&$selected':{
            color:"var(--primaryButtonColor)"
        }
    },
    selected:{},
    textColorPrimary: {
        color: "var(--paragraphColor)",
    },
    // fin
    
}));

export default function Billing(props) {
    const history = useHistory()
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const initRoute = SessionRoutes().initRoute;
    const routes = [{ name: "FACTURACIÓN", to: `${initRoute}` }];
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Container className="dashboard-container">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Breadcrumbs routes={routes} />
                </Grid>
                <Grid item xs={12}>
                    <AppBar position="static" color="default" className="Appbar-tabs">
                        <Tabs
                            classes={{
                                root:classes.rootTabs,
                                indicator: classes.indicator,
                                flexContainer:classes.flexContainer
                            }}
                            value={value}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="scrollable"
                            scrollButtons="auto"
                            aria-label="scrollable auto tabs example"
                        >
                            <Tab
                                classes={{
                                    root: classes.rootTab,
                                    textColorPrimary:classes.textColorPrimary,
                                    selected:classes.selected
                                }}
                                label="VENTAS" {...a11yProps(0)}
                            />
                            <Tab
                                classes={{
                                    root: classes.rootTab,
                                    textColorPrimary:classes.textColorPrimary,
                                    selected:classes.selected
                                }}
                                label="REGISTRO DE POSTULANTES" {...a11yProps(1)}
                            />
                        </Tabs>
                    </AppBar>
                </Grid>
                <Grid item xs={12}>
                    <div className={classes.rootAppbar}>
                        <TabPanel value={value} index={0}>
                            
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <RegisterPostulantTab />
                        </TabPanel>
                        
                    </div>
                </Grid>
            </Grid>
        </Container>
    )
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}