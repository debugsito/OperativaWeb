import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import { stableSort, getComparator } from "../../../shared/utils/table.utils";
import { Typography, EnhancedTableHead, Link } from "../../../shared/components";
import { Grid, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Paper } from "@material-ui/core";

import { getUsers } from "../../../../store/actions/admin/admin.midleware";
import { setPage as setPageAction, setRowsPerPage as setRowsPerPageAction } from "../../../../store/actions/admin/admin.action";

const headCells = [
    {
        id: "enterAs",
        numeric: false,
        disablePadding: false,
        label: "Entrar como",
    },
    {
        id: "rol",
        numeric: false,
        disablePadding: false,
        label: "Rol",
    },
    { id: "area", numeric: false, disablePadding: false, label: "Área" },
    { id: "lastName", numeric: false, disablePadding: false, label: "Apellidos" },
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

export default function TableApplicant({ setOpenModal, setAccountId }){
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("");
    const [selected, setSelected] = useState([]);
    const [users, setUsers] = useState([createData({ id: "" }, "", "", "", "", "", "", { id: "" })]);

    const { listUsers, usersTable } = useSelector(state => state?.admin);
    const dispatch = useDispatch();
    const rolequery = `&role=postulante`;

    useEffect(() => {
        const query = `page=${page}&size=${rowsPerPage}${rolequery}`
        dispatch(getUsers(query))
    }, [])


    useEffect (() => {
        let query = `page=${page}&size=${rowsPerPage}${rolequery}`
        query+= usersTable.query ? `&${usersTable.query}` : '';
        dispatch(getUsers(query))
    },[usersTable])

    useEffect(() => {
        if (listUsers.rows) {
            const rows = listUsers?.rows?.map(user => {
                return (createData(
                    {
                        id: "editor",
                        name: "EDITOR",
                    },
                    user.rol_query,
                    user?.user?.fullname,
                    user?.user?.area_text,
                    user.user?.last_name,
                    user.user?.first_name,
                    user.user?.document_number,
                    user
                )
                )
            })
            setUsers(rows)
        }

    }, [listUsers.rows])

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        const pagination = `page=${newPage}&size=${rowsPerPage}${rolequery}`
        const query = usersTable.query ? `${usersTable.query}&${pagination}` : `${pagination}`
        dispatch(getUsers(query))
        setPage(newPage)
        dispatch(setPageAction(newPage))
    };

    const handleChangeRowsPerPage = (event) => {
        const rowsPerPageTemp = parseInt(event.target.value, 10)
        const pagination = `page=${0}&size=${rowsPerPageTemp}${rolequery}`
        const query = usersTable.query ? `${usersTable.query}&${pagination}` : `${pagination}`
        setPage(0);
        setRowsPerPage(rowsPerPageTemp);
        dispatch(getUsers(query))
        dispatch(setPageAction(0))
        dispatch(setRowsPerPageAction(rowsPerPageTemp))
    };

    const handleClickLoginAs = (data) => {
        setOpenModal(true)
        setAccountId({ account_id: data.id })
    }

    const isSelected = (id) => selected.indexOf(id) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, users?.length);

    return (
        <div className="open-positions-table">
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <TableContainer>
                        <Table
                            className={classes.table}
                            aria-labelledby="tableTitle"
                            aria-label="enhanced table"
                        >
                            <EnhancedTableHead
                                classes={classes}
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                                headCells={headCells}
                            />
                            <TableBody>
                                {
                                    users.length < 1 ?
                                        <TableRow
                                            component="tr"
                                            hover
                                        >
                                            <p className="text-center">No se encuentra en la base de datos</p>
                                        </TableRow>
                                        :
                                        stableSort(users, getComparator(order, orderBy))
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
                                                        <TableCell
                                                            component="th"
                                                            id={labelId}
                                                            scope="row"
                                                            padding="normal"
                                                        >
                                                            <Grid item xs={12}>
                                                                <Link href="#" onClick={() => handleClickLoginAs(row.data)}>EDITOR</Link>
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
                                                        {/* <TableCell
                                                        component="th"
                                                        id={labelId}
                                                        scope="row"
                                                        padding="none"
                                                    >
                                                        <Grid item xs={12}>
                                                            <Typography variant="body1" component="span">{row.account}</Typography>
                                                        </Grid>
                                                    </TableCell> */}
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
                                    <TableRow style={{ height: 53 * emptyRows }}>
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