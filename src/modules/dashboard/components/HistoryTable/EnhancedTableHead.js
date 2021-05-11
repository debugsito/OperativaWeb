import React from "react"
import PropTypes from "prop-types";
import { Checkbox } from "../../../shared/components";
import { TableCell, TableHead, TableRow, TableSortLabel } from "@material-ui/core";

const headCells = [
    {
        id: "title",
        numeric: false,
        disablePadding: true,
        label: "Título de la publicación",
    },
    {
        id: "publicationDate",
        numeric: false,
        disablePadding: false,
        label: "Fecha de publicación",
    },
    {
        id: "createBy",
        numeric: false,
        disablePadding: false,
        label: "Creado por",
    },
    { id: "items", numeric: false, disablePadding: false, label: "Rubro del puesto" },
    { id: "statitics", numeric: false, disablePadding: false, label: "Interacción de la publicación" },
    { id: "action", numeric: false, disablePadding: false, label: "Acciones" },
];

function EnhancedTableHead(props) {
    const {
        classes,
        onSelectAllClick,
        order,
        orderBy,
        numSelected,
        rowCount,
        onRequestSort,
    } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox" size="small" align="center">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ "aria-label": "select all desserts" }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? "right" : "left"}
                        padding={headCell.disablePadding ? "none" : "default"}
                        sortDirection={orderBy === headCell.id ? order : false}
                        style={{ width: 100 }}
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
                ))}
            </TableRow>
        </TableHead>
    );
}

export default EnhancedTableHead

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};