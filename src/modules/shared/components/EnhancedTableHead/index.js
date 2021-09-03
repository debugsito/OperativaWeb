import React from "react"
import PropTypes from "prop-types";
import { Checkbox } from "../";
import { TableCell, TableHead, TableRow, TableSortLabel } from "@material-ui/core";

function EnhancedTableHead(props) {
    const {
        classes,
        onSelectAllClick,
        order,
        orderBy,
        numSelected,
        rowCount,
        onRequestSort,
        headCells
    } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {
                    headCells.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            align={headCell.numeric ? "right" : "left"}
                            padding={headCell.disablePadding ? "none" : "default"}
                            sortDirection={orderBy === headCell.id ? order : false}
                            style={{ width: 120 }}
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

export default EnhancedTableHead

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number,
};