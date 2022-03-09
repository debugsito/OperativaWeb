import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Redirect, useHistory} from "react-router-dom";
import {Container, Grid, AppBar, Box, makeStyles} from "@material-ui/core";
import {Button, Modal, SnackbarsAlert, TextCustom, Typography} from "../../shared/components";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
// import styles from '../styles/applications.scss'
import ApplicationInProgress from '../components/ApplicationInProgress/ApplicationInProgress';
import CompletedApplication from "../components/CompletedApplication/CompletedApplication";

const TABS = [{label: "EN PROCESO"}, {label: "FINALIZADO"}]

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    appBarColorPrimary: {
        background: "#fff"
    },

    // Estilos para Tab
    rootTab: {
        maxWidth: 'none',
        '&$selected': {
            color: "#343843",
        }
    },
    selected: {},
    textColorPrimary: {
        color: "#343843",
    },
    button: {
        width: '50%',
        '.MuiTab-wrapper': {
            'font-weight': 'bold !important'
        }
    }
    // fin
}));

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
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
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const Applications = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [valueTab, setValueTab] = React.useState(0);
    const classes = useStyles();

    const handleChange = (event, newValue) => {
        setValueTab(newValue);
    };

    return (
        <Container className="applicant-container">
            <AppBar position="static" classes={{colorPrimary: classes.appBarColorPrimary}} className="Appbar-tabs">
                <Tabs value={valueTab} onChange={handleChange} textColor="primary">
                    {
                        TABS.map((item, index) => (
                            <Tab
                                key={index}
                                classes={{
                                    root: classes.rootTab,
                                    textColorPrimary: classes.textColorPrimary,
                                    selected: classes.selected,
                                }}
                                className={classes.button}
                                label={item.label}
                                {...a11yProps(index)}
                            />
                        ))
                    }
                </Tabs>
            </AppBar>
            <Grid>
                <TabPanel value={valueTab} index={0} key={0}>
                    <ApplicationInProgress/>
                </TabPanel>
                <TabPanel value={valueTab} index={1} key={1}>
                    <CompletedApplication/>
                </TabPanel>
            </Grid>
        </Container>
    );
}
export default Applications;
