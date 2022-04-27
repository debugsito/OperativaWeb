import React, { useContext } from "react";
import { AppBar, Tabs, Tab, makeStyles } from '@material-ui/core';
import { TabPanel, SnackbarsAlert } from "../../../shared/components";
import { TableAdmin, TableApplicant, TableCompanyMuni } from "../";

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




export default function UsersTabs({ onChangeTab, tabValue, setOpenModal, setAccountId, ...props }) {
    const classes = useStyles();
    const handleChange = (event, newValue) => {
        onChangeTab(newValue)
    };
    return (
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
                    <Tab classes={{ root: classes.rootTab, selected: classes.selected }} label="Administradores" {...a11yProps(0)} />
                    <Tab classes={{ root: classes.rootTab, selected: classes.selected }} label="Empresas y Municipalidades" {...a11yProps(1)} />
                    <Tab classes={{ root: classes.rootTab, selected: classes.selected }} label="Postulantes" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={tabValue} index={0} padding={0}>
                <TableAdmin setOpenModal={setOpenModal} setAccountId={setAccountId}
                ></TableAdmin>
            </TabPanel>
            <TabPanel value={tabValue} index={1} padding={0}>
                <TableCompanyMuni setOpenModal={setOpenModal} setAccountId={setAccountId}
                ></TableCompanyMuni>
            </TabPanel>
            <TabPanel value={tabValue} index={2} padding={0}>
                <TableApplicant setOpenModal={setOpenModal} setAccountId={setAccountId}
                ></TableApplicant>
            </TabPanel>
        </>

    )
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}