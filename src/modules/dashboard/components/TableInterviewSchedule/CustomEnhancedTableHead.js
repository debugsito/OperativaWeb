import React from "react"
import PropTypes from "prop-types";
import { TableCell, TableHead, TableRow, TableSortLabel, makeStyles } from "@material-ui/core";
import { Checkbox } from "../../../shared/components";

const useStyles = makeStyles((theme) => ({
    tableHead: {
        background: "#EBEBEB",
    },
    visuallyHidden: {
        border: 0,
        clip: "rect(0 0 0 0)",
        height: 1,
        margin: -1,
        overflow: "hidden",
        padding: 0,
        position: "absolute",
        top: 20,
        width: 1,
    },
    headCellLabel: {
        color: "#222121",
        fontSize: 16,
        fontWeight: 500
    },
}));

function CustomEnhancedTableHead({ order, orderBy, onRequestSort, headCells, onSelectAllClick }) {
    const classes = useStyles()

    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };


    return (
        <TableHead classes={{ root: classes.tableHead }}>
            <TableRow>

                {
                    headCells.map((headCell) => (
                        headCell.checkbox ?
                            <TableCell padding="normal" size="small" align="center" key={headCell.id}>
                                <Checkbox
                                    inputProps={{ "aria-label": "select all" }}
                                    label={<span className={classes.headCellLabel}>{headCell.label}</span>}
                                    onChange={onSelectAllClick}
                                    name={headCell.id}
                                />
                            </TableCell>
                            :
                            <TableCell
                                key={headCell.id}
                                align={headCell.numeric ? "right" : "left"}
                                padding={headCell.disablePadding ? "none" : "normal"}
                                sortDirection={orderBy === headCell.id ? order : false}
                                style={{ width: headCell.width ? headCell.width : 120 }}
                            >
                                <TableSortLabel
                                    active={orderBy === headCell.id}
                                    direction={orderBy === headCell.id ? order : "asc"}
                                    onClick={createSortHandler(headCell.id)}
                                >
                                    <span className={classes.headCellLabel}>{headCell.label}</span>
                                    {orderBy === headCell.id ? (
                                        <span className={classes.visuallyHidden}>
                                            {order === "desc" ? "sorted descending" : "sorted ascending"}
                                        </span>
                                    ) : null}
                                </TableSortLabel>
                            </TableCell>
                    ))
                }
            </TableRow>
        </TableHead>
    );
}

export default CustomEnhancedTableHead

CustomEnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number,
    columnCheckbox: PropTypes.bool
};