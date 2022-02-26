import React, { useContext } from "react";
import { AppBar, Tabs, Tab, makeStyles } from '@material-ui/core';
import { TabPanel, SnackbarsAlert } from "../../../shared/components";
import { TableListPostulants, TablePostulantsInProgress, TableHiredApplicants, TableRejectedPostulants } from "../";
import { ContextNotification } from "../../context/NotificationAlertContext";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
       
    },
    rootTabs: {
        background: "#E7EAF1",
    },
    rootTab: {
        '&$selected': {
            color: "var(--paragraphColor)",
            background: "#fff",
        },
        fontSize: "12px",
        fontWeight: 700
    },
    selected: {},
}));

export default function ApplicantsTabs({ onChangeTab, tabValue, ...props }) {
    const classes = useStyles();
    const {notification, setNotification} = useContext(ContextNotification)
    const { horizontal, vertical, open, message, severity } = notification;

    const handleChange = (event, newValue) => {
        onChangeTab(newValue)
    };

    return (
        //   <div className={classes.root}>
        <>
            <AppBar position="static">
                <Tabs
                    value={tabValue}
                    onChange={handleChange}
                    aria-label="applicants tabs"
                    indicatorColor="primary"
                    variant="fullWidth"
                    textColor="primary"
                    classes={{ root: classes.rootTabs }}
                >
                    <Tab classes={{ root: classes.rootTab, selected: classes.selected }} label="Postulantes" {...a11yProps(0)} />
                    <Tab classes={{ root: classes.rootTab, selected: classes.selected }} label="En Proceso" {...a11yProps(1)} />
                    <Tab classes={{ root: classes.rootTab, selected: classes.selected }} label="Finalista" {...a11yProps(2)} />
                    <Tab classes={{ root: classes.rootTab, selected: classes.selected }} label="Descartado" {...a11yProps(3)} />
                </Tabs>
            </AppBar>
            <TabPanel value={tabValue} index={0} padding={0}>
                <TableListPostulants />
            </TabPanel>
            <TabPanel value={tabValue} index={1} padding={0}>
                <TablePostulantsInProgress {...props} />
            </TabPanel>
            <TabPanel value={tabValue} index={2} padding={0}>
                <TableHiredApplicants />
            </TabPanel>
            <TabPanel value={tabValue} index={3} padding={0}>
                <TableRejectedPostulants />
            </TabPanel>
            <SnackbarsAlert
            open={open}
            anchorOrigin={{ vertical, horizontal }}
            message={message}
            handleClose={() => setNotification({ ...notification, open: false })}
            severity={severity}
          />
        </>
        //   </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}