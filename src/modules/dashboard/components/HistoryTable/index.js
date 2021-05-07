import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { DateTime } from "luxon";

import clsx from "clsx";

import { lighten, makeStyles } from "@material-ui/core/styles";

import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Toolbar, Paper, Tooltip, IconButton } from "@material-ui/core";
import { Button, Checkbox, Chip, Typography, LinearProgressWithDescription } from "../../../shared/components";
import { useDispatch, useSelector } from "react-redux";
import { archivePublication, deletePublication, getPublicationsInfo, setPublicationSelected } from "../../../../store/actions/dashboard/dashboard.action";
import { SessionRoutes } from "../../../shared/libs/sessionRoutes";
import { useHistory } from "react-router-dom";
import {
    calendarIcon,
    registeredIcon,
    editIcon,
    fileIcon,
    folderIcon,
    deleteIcon,
    showIcon,
} from "../../images";

function createData(
    title,
    publicationDate,
    createBy,
    items,
    statitics,
    actions,
    data
) {
    return { title, publicationDate, createBy, items, statitics, actions, data };
}

const historialData = [
    {
        id: 1,
        title: "Motorizado mensajero",
        publicationdate: "2021-03-04T00:18:48.000Z",
        createdBy: "Jean Carlo",
        items: "Motorizado y courier",
        postulantScope: 180,
        postulantProgress: 120,
        postulantContract: 70
    },
    {
        id: 2,
        title: "Call Center",
        publicationdate: "2021-05-06T00:18:48.000Z",
        createdBy: "Jean Carlo",
        items: "Motorizado y courier",
        postulantScope: 170,
        postulantProgress: 120,
        postulantContract: 70
    },
    {
        id: 3,
        title: "Developer",
        publicationdate: "2021-03-04T00:18:48.000Z",
        createdBy: "Jean Carlo",
        items: "Motorizado y courier",
        postulantScope: 150,
        postulantProgress: 120,
        postulantContract: 70
    },
]

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array = [], comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

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

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

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

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
    paper: {
        width: "100%",
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
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
}));

export default function OpenPositionsTable() {
    const classes = useStyles();
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("");
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [publications, setPublications] = useState([createData("", DateTime.utc().toFormat("DDD"), "", "", "", [], { id: "" })]);

    const { publicationsInfo } = useSelector(state => state?.dashboard);
    const dispatch = useDispatch();
    const history = useHistory();
    const initRoute = SessionRoutes().initRoute;

    useEffect(() => {
        dispatch(getPublicationsInfo())
    }, [])

    useEffect(() => {
        const rows = historialData.map(history => (
            createData(
                history.title,
                DateTime.fromISO(history.publicationdate).toFormat("DDD"),
                history.createdBy,
                history.items,
                history.statitics,
                [
                    {
                        id: "REPUBLICAR",
                        name: "REPUBLICAR",
                    },
                    {
                        id: "VER",
                        name: "VER",
                    },
                ],
                history
            )
        ))
        setPublications(rows)
    }, [publicationsInfo])



    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = publications.map((n) => n.data.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, publications?.length - page * rowsPerPage);

    const executeAction = (event, id, publication) => {
        event.preventDefault();
        console.log("hice click")
    }

    const goToPostulants = (publication) => {
        console.log("hice click")
    };

    return (
        <div className="open-positions-table">
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    {selected?.length > 0 && (
                        <EnhancedTableToolbar numSelected={selected?.length} selected={selected} />
                    )}
                    <TableContainer>
                        <Table
                            className={classes.table}
                            aria-labelledby="tableTitle"
                            size={dense ? "small" : "medium"}
                            aria-label="enhanced table"
                        >
                            <EnhancedTableHead
                                classes={classes}
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={publications?.length}
                            />
                            <TableBody>
                                {stableSort(publications, getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        const isItemSelected = isSelected(row.data.id);
                                        const labelId = `enhanced-table-checkbox-${index}`;
                                        return (
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row.data.id}
                                                selected={isItemSelected}

                                            >
                                                <TableCell padding="checkbox" size="small" align="center">
                                                    <Checkbox
                                                        onClick={(event) => handleClick(event, row.data.id)}
                                                        checked={isItemSelected}
                                                        inputProps={{ "aria-labelledby": labelId }}
                                                    />
                                                </TableCell>
                                                <TableCell
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                    padding="none"
                                                >
                                                    <Grid item xs={12}>
                                                        <Typography variant="body1" component="span">{row.title}</Typography>
                                                    </Grid>
                                                </TableCell>
                                                <TableCell
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                    padding="none"
                                                >
                                                    <Grid item xs={12}>
                                                        <Typography variant="body1" component="span">{row.publicationDate}</Typography>
                                                    </Grid>
                                                </TableCell>
                                                <TableCell
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                    padding="none"
                                                >
                                                    <Grid item xs={12}>
                                                        <Typography variant="body1" component="span">{row.createBy}</Typography>
                                                    </Grid>
                                                </TableCell>
                                                <TableCell
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                    padding="none"
                                                >
                                                    <Grid item xs={12}>
                                                        <Typography variant="body1" component="span">{row.items}</Typography>
                                                    </Grid>
                                                </TableCell>
                                                <TableCell
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                    padding="5"
                                                >
                                                    <Grid container spacing={0}>
                                                        <Grid item xs={12}>
                                                            <LinearProgressWithDescription title="180" description="Postulantes alcanzados" value={100} color="celeste" />
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <LinearProgressWithDescription title="120" description="Postulantes alcanzados" value={70} color="naranja" />
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <LinearProgressWithDescription title="70" description="Postulantes alcanzados" value={40} color="verde" />
                                                        </Grid>
                                                    </Grid>
                                                </TableCell>
                                                <TableCell align="left" style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
                                                    {row.actions.map((action, index) => (
                                                        <Button
                                                            onClick={(event) => executeAction(event, action.id, row.data)}
                                                            key={index}
                                                            color=""
                                                            startIcon={
                                                                <img
                                                                    src={action.id === "edit" ? editIcon : (action.id === "archive" ? fileIcon : showIcon)}
                                                                    alt="Calendario"
                                                                />}
                                                        >
                                                            {action.name}
                                                        </Button>
                                                    ))}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        className="table-pagination"
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={publications?.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                        labelRowsPerPage="Filas por página"
                        labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count !== -1 ? count : to}`}
                    />
                </Paper>
            </div>
        </div >
    );
}
