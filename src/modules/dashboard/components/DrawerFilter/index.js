import React from "react";
import PropTypes from "prop-types";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import AccordionFilter from "./AccordionFilter";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  paper: {
    borderRadius: "10px 0 0 0",
  },
  container: {
    width: 350,
  },
  header: {
    width: "100%",
    height: 68,
    background: "#5D5FEF",
    borderRadius: "10px 0px 0px 0px",

    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: "1.5em",
    color: "#fff",
  },
}));

const DrawerFilter = ({ openDrawer, handleClose }) => {
  const classes = useStyles();
  const apply = () => {
    handleClose();
  };
  return (
    <Drawer
      variant="temporary"
      anchor="right"
      open={openDrawer}
      onClose={handleClose}
      classes={{ paper: classes.paper }}
    >
      <div className={classes.container}>
        <div className={classes.header}>
          <Typography variant="h6" className="color-white">
            Filtrar por:
          </Typography>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={handleClose}
            color="inherit"
          >
            <CloseIcon />
          </IconButton>
        </div>
        <AccordionFilter apply={apply} />
      </div>
    </Drawer>
  );
};

DrawerFilter.propTypes = {
  openDrawer: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default DrawerFilter;
