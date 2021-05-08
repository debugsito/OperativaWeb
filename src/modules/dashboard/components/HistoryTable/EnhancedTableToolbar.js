import React from "react"
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Toolbar, Tooltip, IconButton } from "@material-ui/core";
import { useDispatch } from "react-redux";

import { Typography } from "../../../shared/components";
import { archivePublication, deletePublication } from "../../../../store/actions/dashboard/dashboard.action";

import {
    editIcon,
    fileIcon,
    folderIcon,
    deleteIcon,
    showIcon,
} from "../../images";

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === "light"
            ? {
                color: "#FFFFFF !important",
                backgroundColor: "var(--secondaryButtonColor)",
            }
            : {
                color: "#FFFFFF !important",
                backgroundColor: "var(--secondaryButtonColor)",
            },
    title: {
        flex: "1 1 100%",
    },
}));

const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected, selected } = props;
    const dispatch = useDispatch();

    const deletePublicationFn = () => {
        selected.map(id => dispatch(deletePublication({ id })));
    }

    const archivePublicationFn = () => {
        selected.map(id => dispatch(archivePublication({ id })));
    }

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            <Tooltip title="Delete">
                <IconButton aria-label="delete" onClick={deletePublicationFn}>
                    <img src={deleteIcon} alt="Eliminar" />
                    <Typography
                        className={classes.title}
                        color="inherit"
                        variant="subtitle1"
                        component="div"
                    >
                        Eliminar
                    </Typography>
                </IconButton>
            </Tooltip>
            <Tooltip title="Archive">
                <IconButton aria-label="archive" onClick={archivePublicationFn}>
                    <img src={folderIcon} alt="Archivar" />
                    <Typography
                        className={classes.title}
                        color="inherit"
                        variant="subtitle1"
                        component="div"
                    >
                        Archivar
                    </Typography>
                </IconButton>
            </Tooltip>
        </Toolbar>
    );
};

export default EnhancedTableToolbar;

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
    selected: PropTypes.any.isRequired,
};
