import React, { useContext } from "react";
import { AppBar, Tabs, Tab, makeStyles } from "@material-ui/core";
import { TabPanel, SnackbarsAlert } from "../../../shared/components";
import TabEvaluation from "./TabEvaluation";
import TabVerificativa from "./TabVerificativa";
import TabMedico from "./TabMedico";
import TabEvaluativa from "./TabEvaluativa";
import TabEntrevista from "./TabEntrevista";

//Context
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
    "&$selected": {
      color: "var(--paragraphColor)",
      background: "#fff",
    },
  },
  selected: {},
}));

export default function ApplicantsTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const { notification, setNotification } = useContext(ContextNotification)
  const { horizontal, vertical, open, message, severity } = notification;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const nextTab = () => {
    setValue((currentValue) => currentValue + 1);
  };

  const backTab = () => {
    setValue((currentValue) => currentValue - 1);
  };

  return (
    //   <div className={classes.root}>
    <>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="applicants tabs"
          indicatorColor="primary"
          variant="fullWidth"
          textColor="primary"
          classes={{ root: classes.rootTabs }}
        >
          <Tab
            classes={{ root: classes.rootTab, selected: classes.selected }}
            label="Preguntas"
            {...a11yProps(0)}
          />
          <Tab
            classes={{ root: classes.rootTab, selected: classes.selected }}
            label="Verificativa"
            {...a11yProps(1)}
          />
          <Tab
            classes={{ root: classes.rootTab, selected: classes.selected }}
            label="Médico"
            {...a11yProps(2)}
          />
          {/* <Tab
            classes={{ root: classes.rootTab, selected: classes.selected }}
            label="Evaluativa"
            {...a11yProps(3)}
          /> */}
          <Tab
            classes={{ root: classes.rootTab, selected: classes.selected }}
            label="Entrevista"
            {...a11yProps(3)}
          />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <TabEvaluation nextTab={nextTab} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TabVerificativa nextTab={nextTab} backTab={backTab} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TabMedico nextTab={nextTab} backTab={backTab} />
      </TabPanel>
      {/* <TabPanel value={value} index={3}>
        <TabEvaluativa nextTab={nextTab} backTab={backTab} />
      </TabPanel> */}
      <TabPanel value={value} index={3}>
        <TabEntrevista backTab={backTab} />
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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
