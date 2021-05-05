import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Box, Grid, Link, Tab, Tabs, Typography } from '@material-ui/core';
import { TermsAndCondition, PrivacyPolicies, CookesPolicy } from "../components";
import "../styles/TermsAndConditionPage.css"

const useStyles = makeStyles((theme) => ({
    root:{
        backgroundColor: "#F7F7F7",
    },
    tabsHeader:{
        position:'fixed',
        width:'100%',
        backgroundColor:'#F7F7F7',
        paddingTop:'2%'
    },
    rootAppbar: {
        flexGrow: 1,
        width: '100%',
        marginTop:'10%',
    },
    rootTabs:{
    },
    indicator: {
        backgroundColor: "var(--primaryButtonColor)"
    },

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

export default function TermsAndCodition() {
    const history = useHistory()
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Grid container justify="center" className={classes.root}>
            <Grid item xs={12} className={classes.tabsHeader}>
                <Grid container justify="center">
                    <Grid item xs={11}>
                        <Link color="inherit" href="#" onClick={() => history.goBack()}>
                            <Typography variant="button">
                                {"< Atras"}
                            </Typography>
                        </Link>
                    </Grid>
                    <Grid item xs={10}>
                    <AppBar position="static" color="default" className="Appbar-terms-and-condition">
                        <Tabs
                            classes={{
                                root:classes.rootTabs,
                                indicator: classes.indicator
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
                                label="TÉRMINOS Y CONDICIONES DEL SERVICIO" {...a11yProps(0)}
                            />
                            <Tab
                                classes={{
                                    root: classes.rootTab,
                                    textColorPrimary:classes.textColorPrimary,
                                    selected:classes.selected
                                }}
                                label="POLÍTICAS DE PRIVACIDAD" {...a11yProps(1)}
                            />
                            <Tab
                                classes={{
                                    root: classes.rootTab,
                                    textColorPrimary:classes.textColorPrimary,
                                    selected:classes.selected
                                }}
                                label="POLÍTICA DE COOKIES" {...a11yProps(2)}
                            />
                        </Tabs>
                    </AppBar>
                    </Grid>
                </Grid>
            </Grid>
            
            <Grid item xs={10}>
                <div className={classes.rootAppbar}>
                    <TabPanel value={value} index={0}>
                        <TermsAndCondition />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <PrivacyPolicies />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <CookesPolicy />
                    </TabPanel>
                </div>
            </Grid>
        </Grid>
    );
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