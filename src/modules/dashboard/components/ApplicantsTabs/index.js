import React from "react";
import { AppBar, Tabs, Tab, makeStyles } from '@material-ui/core';
import { TabPanel } from "../../../shared/components";


function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    rootTabs: {
        background: "#E7EAF1",
    }
}));

export default function ApplicantsTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        //   <div className={classes.root}>
        <>
            <AppBar position="static">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="applicants tabs"
                    indicatorColor="secondary"
                    textColor="secondary"
                    classes={{ root: classes.rootTabs }}
                >
                    <Tab label="Postulantes" {...a11yProps(0)} />
                    <Tab label="En Proceso" {...a11yProps(1)} />
                    <Tab label="Finalista" {...a11yProps(2)} />
                    <Tab label="Descartado" {...a11yProps(3)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                Item One
            </TabPanel>
            <TabPanel value={value} index={1}>
                Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
                Item Three
            </TabPanel>
            <TabPanel value={value} index={3}>
                Item Four
            </TabPanel>
        </>
        //   </div>
    );
}
