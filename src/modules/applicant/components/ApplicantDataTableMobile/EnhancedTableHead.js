import React from "react"
import PropTypes from "prop-types";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles, TableCell, TableHead, TableRow, TableSortLabel } from "@material-ui/core";
import FilterMenu from "./FilterMenu";

const headCells = [
    {
        id: "job_title",
        numeric: false,
        disablePadding: false,
        label: "Filtrar por",
    },
];

const menuOrder = [
    { label: "Titulo de publicación", name: "title", id: "job_title" },
    { label: "Fecha de publicación", name: "date", id: "publicationDate" }
]

const useStyles = makeStyles(theme => ({
    headerTable: {
        display: "flex",
        justifyContent: "space-between"
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
    },
}))

function EnhancedTableHead(props) {
    const {
        order,
        orderBy,
        onRequestSort,
    } = props;

    const classes = useStyles()
    const [anchorEl, setAnchorEl] = React.useState(null);

    // const createSortHandler = (property) => (event) => {
    //     onRequestSort(event, property);
    // };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? "right" : "left"}
                        padding={headCell.disablePadding ? "none" : "default"}
                        sortDirection={orderBy === headCell.id ? order : false}
                        style={{ width: 100 }}
                    >
                        <div className={classes.headerTable}>
                            <span className={classes.headCellLabel}>{headCell.label}</span>
                            <div>
                                <ExpandMoreIcon onClick={handleClick} />
                                <FilterMenu anchorEl={anchorEl} handleClose={handleClose} list={menuOrder} onRequestSort={onRequestSort} />
                            </div>
                        </div>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default EnhancedTableHead

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
};