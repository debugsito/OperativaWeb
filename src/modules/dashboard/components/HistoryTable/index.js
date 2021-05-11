import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Paper } from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import EnhancedTableHead from "./EnhancedTableHead"
import EnhancedTableToolbar from "./EnhancedTableToolbar"
import { SessionRoutes } from "../../../shared/libs/sessionRoutes";
import { Button, Checkbox, Typography, LinearProgressWithDescription } from "../../../shared/components";
import { getPublicationsInfo } from "../../../../store/actions/dashboard/dashboard.action";
import { fileIcon, showIcon, republishIcon } from "../../images";
import { FormatListNumberedRtlOutlined } from "@material-ui/icons";

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
        createdBy: "Juan Jose Silupu Maza",
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
    {
        id: 4,
        title: "Call Center",
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

export default function HistoryTable({ handleEnableButtonDownload, searchInput }) {
    const classes = useStyles();
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("");
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [publications, setPublications] = useState([createData("", DateTime.utc().toFormat("DDD"), "", "", "", [], { id: "" })]);
    const [dataPublications, setDataPublications] = useState([])
    console.log("render")

    // const { publicationsInfo } = useSelector(state => state?.dashboard);
    // const dispatch = useDispatch();
    const history = useHistory();
    const initRoute = SessionRoutes().initRoute;

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
                        id: "show",
                        name: "VER",
                    },
                    {
                        id: "republish",
                        name: "REPUBLICAR",
                    },
                ],
                history
            )
        ))
        setPublications(rows)
        setDataPublications(rows)
    }, [])

    useEffect(() => {
        if (searchInput !== null) {
            if (searchInput !== "") {
                const filteredPublications = publications.filter(data => {
                    return data.title.toLowerCase().includes(searchInput.toLowerCase())
                })
                setPublications(filteredPublications)
            } else {
                setPublications(dataPublications)
            }
        }
    }, [searchInput])

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = publications.map((n) => n.data.id);
            setSelected(newSelecteds);
            handleEnableButtonDownload(newSelecteds)
            return;
        }
        setSelected([]);
        handleEnableButtonDownload([])
    };

    const handleClickSelectedRow = (event, id) => {
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
        handleEnableButtonDownload(newSelected)
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
        if (id === "show") history.push(`${initRoute}/ver-detalles-de-posicion`);
        if (id === "republish") history.push(`${initRoute}/republicar-posicion`);
    }

    return (
        <div className="open-positions-table">
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    {/* {selected?.length > 0 && (
                        <EnhancedTableToolbar numSelected={selected?.length} selected={selected} />
                    )} */}
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
                                                        onClick={(event) => handleClickSelectedRow(event, row.data.id)}
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
                                                            <LinearProgressWithDescription title={row.data.postulantScope} description="Postulantes alcanzados" value={100} colorBar="celeste" />
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <LinearProgressWithDescription title={row.data.postulantProgress} description="Postulantes en progreso" value={70} colorBar="naranja" />
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <LinearProgressWithDescription title={row.data.postulantContract} description="Postulantes contratados" value={40} colorBar="verde" />
                                                        </Grid>
                                                    </Grid>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Grid container>
                                                        {row.actions.map((action, index) => (
                                                            <Grid item xs={12} key={index}>
                                                                <Button
                                                                    onClick={(event) => executeAction(event, action.id, row.data)}
                                                                    key={index}
                                                                    color=""
                                                                    startIcon={
                                                                        <img
                                                                            src={action.id === "show" ? showIcon : (action.id === "republish" ? republishIcon : fileIcon)}
                                                                            alt="Calendario"
                                                                        />}
                                                                >
                                                                    {action.name}
                                                                </Button>
                                                            </Grid>
                                                        ))}
                                                    </Grid>
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
