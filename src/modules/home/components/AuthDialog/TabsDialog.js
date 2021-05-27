import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Box, Tabs, Tab, makeStyles, Typography } from '@material-ui/core';
import SignInTab from './SignInTab';
import RegisterForm from './RegisterForm';

const TABS = [{ label: "REGÍSTRATE" }, { label: "INICIA SESIÓN" }]

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
            color: "var(--primaryButtonColor)"
        }
    },
    selected: {},
    textColorPrimary: {
        color: "var(--paragraphColor)",
    },
    // fin
}));

export default function TabsDialog() {
    const classes = useStyles();
    const [value, setValue] = React.useState(1);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" classes={{ colorPrimary: classes.appBarColorPrimary }} className="Appbar-tabs">
                <Tabs value={value} onChange={handleChange} aria-label="sign in" textColor="primary" centered>
                    {
                        TABS.map((item, index) => (
                            <Tab
                                classes={{
                                    root: classes.rootTab,
                                    textColorPrimary: classes.textColorPrimary,
                                    selected: classes.selected
                                }}
                                label={item.label}
                                {...a11yProps(index)}
                            />
                        ))
                    }
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <RegisterForm />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <SignInTab setValue={setValue} />
            </TabPanel>
        </div>
    );
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

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