import React from 'react'
import PropTypes from "prop-types";
import clsx from "clsx";
import { Toolbar, makeStyles } from "@material-ui/core";


const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
        color: "#FFF",
    },
    highlight: {
        color: "#fff",
        backgroundColor: "#5D5FEF",
    },
}));

export default function EnhancedTableToolbar({ numSelected, children }) {
    const classes = useToolbarStyles();

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {children}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};