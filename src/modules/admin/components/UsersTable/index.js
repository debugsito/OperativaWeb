import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import { stableSort, getComparator } from "../../../shared/utils/table.utils";
import { Button, Checkbox, Typography, EnhancedTableHead } from "../../../shared/components";
import { Grid, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Paper } from "@material-ui/core";

import { SessionRoutes } from "../../../shared/libs/sessionRoutes";
import { getUsers } from "../../../../store/actions/admin/admin.midleware";

const headCells = [
    {
        id: "enterAs",
        numeric: false,
        disablePadding: false,
        label: "Entrar como",
    },
    {
        id: "typeOfUser",
        numeric: false,
        disablePadding: false,
        label: "tipo",
    },
    {
        id: "account",
        numeric: false,
        disablePadding: false,
        label: "Cuenta",
    },
    { id: "area", numeric: false, disablePadding: false, label: "Área" },
    { id: "lastName", numeric: false, disablePadding: false, label: "Apellidos" },
    // { id: "motherLastName", numeric: false, disablePadding: false, label: "Apellido materno" },
    { id: "name", numeric: false, disablePadding: false, label: "Nombre" },
    { id: "document", numeric: false, disablePadding: false, label: "N° Documento" },
];

function createData(
    action,
    role,
    account,
    area,
    lastName,
    firstName,
    document,
    data
) {
    return { action, role, account, area, lastName, firstName, document, data };
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

export default function HistoryTable({ handleEnableButtonDownload }) {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [total, setTotal] = useState(10)
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("");
    const [selected, setSelected] = useState([]);
    const [dense, setDense] = useState(false);
    const [users, setUsers] = useState([createData({ id: "" }, "", "", "", "", "", "", { id: "" })]);

    const { listUsers } = useSelector(state => state?.admin);
    const dispatch = useDispatch();
    const history = useHistory();
    const initRoute = SessionRoutes().initRoute;

    useEffect(() => {
        dispatch(getUsers({ page, rowsPerPage }))
    }, [])

    useEffect(() => {
        console.log("UseEffect", listUsers)
        if (listUsers.data) {
            console.log("UseEffect2")
            const rows = listUsers?.data?.map(user => {
                return (createData(
                    {
                        id: "editor",
                        name: "EDITOR",
                    },
                    user.role,
                    user.user.fullname,
                    "AREA DE PRUEBA",
                    user.user.last_name,
                    user.user.first_name,
                    user.user.document_number,
                    user
                )
                )
            })
            setUsers(rows)
            setTotal(listUsers.count)
        }

    }, [listUsers.data])

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = users.map((n) => n.data.id);
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
        console.log("newPage", newPage)
        console.log("event", event)
        dispatch(getUsers({ page: newPage, rowsPerPage }))
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
        rowsPerPage - Math.min(rowsPerPage, users?.length - page * rowsPerPage);

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
                                // rowCount={users?.length}
                                headCells={headCells}
                            />
                            <TableBody>
                                {
                                    stableSort(users, getComparator(order, orderBy))
                                        // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                                                    {/* <TableCell padding="checkbox" size="small" align="center">
                                                    <Checkbox
                                                        onClick={(event) => handleClickSelectedRow(event, row.data.id)}
                                                        checked={isItemSelected}
                                                        inputProps={{ "aria-labelledby": labelId }}
                                                    />
                                                </TableCell> */}
                                                    <TableCell
                                                        component="th"
                                                        id={labelId}
                                                        scope="row"
                                                        padding="normal"
                                                    >
                                                        <Grid item xs={12}>
                                                            <Typography variant="body1" component="span">EDITOR</Typography>
                                                        </Grid>
                                                    </TableCell>
                                                    <TableCell
                                                        component="th"
                                                        id={labelId}
                                                        scope="row"
                                                        padding="none"
                                                    >
                                                        <Grid item xs={12}>
                                                            <Typography variant="body1" component="span">{row.role}</Typography>
                                                        </Grid>
                                                    </TableCell>
                                                    <TableCell
                                                        component="th"
                                                        id={labelId}
                                                        scope="row"
                                                        padding="none"
                                                    >
                                                        <Grid item xs={12}>
                                                            <Typography variant="body1" component="span">{row.account}</Typography>
                                                        </Grid>
                                                    </TableCell>
                                                    <TableCell
                                                        component="th"
                                                        id={labelId}
                                                        scope="row"
                                                        padding="none"
                                                    >
                                                        <Grid item xs={12}>
                                                            <Typography variant="body1" component="span">{row.area}</Typography>
                                                        </Grid>
                                                    </TableCell>
                                                    <TableCell
                                                        component="th"
                                                        id={labelId}
                                                        scope="row"
                                                        padding="none"
                                                    >
                                                        <Grid item xs={12}>
                                                            <Typography variant="body1" component="span">{row.lastName}</Typography>
                                                        </Grid>
                                                    </TableCell>
                                                    <TableCell
                                                        component="th"
                                                        id={labelId}
                                                        scope="row"
                                                        padding="none"
                                                    >
                                                        <Grid item xs={12}>
                                                            <Typography variant="body1" component="span">{row.firstName}</Typography>
                                                        </Grid>
                                                    </TableCell>
                                                    <TableCell
                                                        component="th"
                                                        id={labelId}
                                                        scope="row"
                                                        padding="none"
                                                    >
                                                        <Grid item xs={12}>
                                                            <Typography variant="body1" component="span">{row.document}</Typography>
                                                        </Grid>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })
                                }
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
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        component="div"
                        count={-1}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        labelRowsPerPage="Filas por página"
                        labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count !== -1 ? count : to}`}
                    />
                </Paper>
            </div>
        </div >
    );
}
