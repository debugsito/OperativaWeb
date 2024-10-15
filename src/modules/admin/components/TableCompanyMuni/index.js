import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import { stableSort, getComparator } from "../../../shared/utils/table.utils";
import { Typography, EnhancedTableHead, Link } from "../../../shared/components";
import { Grid, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Paper, Snackbar } from "@material-ui/core";

import { getUsers } from "../../../../store/actions/admin/admin.midleware";
import { setPage as setPageAction, setRowsPerPage as setRowsPerPageAction } from "../../../../store/actions/admin/admin.action";
import { Button, Modal } from '../../../shared/components';
import { actions_Utils } from '../../../../store/actions';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import { service_UserAdmin } from "../../../../store/services";
import MuiAlert from '@material-ui/lab/Alert';

import {
    Select,
    MenuItem,
}
    from '@material-ui/core';

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
    { id: "document", numeric: false, disablePadding: false, label: "RUC" },
    { id: "plan", numeric: false, disablePadding: false, label: "Plan" },
    { id: "renew", numeric: false, disablePadding: false, label: "Renovar" },
];


function createData(
    action,
    role,
    account,
    area,
    lastName,
    firstName,
    document,
    data,
    plan,
    renew,
    plan_id
) {
    return { action, role, account, area, lastName, firstName, document, data, plan, renew, plan_id };
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

const vertical = 'top'
const horizontal = 'right'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function TableCompanyMuni({ setOpenModal, setAccountId }) {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("");
    const [selected, setSelected] = useState([]);
    const [users, setUsers] = useState([createData({ id: "" }, "", "", "", "", "", "", { id: "" }, "Free", 0, 1)]);
    const [option, setOption] = useState(null)
    const [openModal2, setOpenModal2] = useState(false)
    const { listUsers, usersTable } = useSelector(state => state?.admin);
    const { utils: { plans } } = useSelector(state => state);
    const [index, setIndex] = useState(null);
    const dispatch = useDispatch();
    const [error, setError] = useState();
    const [open, setOpen] = useState(false);
    const rolequery = `&role=empresa`;


    useEffect(() => {
        dispatch(actions_Utils.getListPlans())
    }, [])

    useEffect(() => {
        const query = `page=${page}&size=${rowsPerPage}${rolequery}`
        dispatch(getUsers(query))
    }, [])


    useEffect(() => {
        let query = `page=${page}&size=${rowsPerPage}${rolequery}`
        query += usersTable.query ? `&${usersTable.query}` : '';
        dispatch(getUsers(query))
    }, [usersTable])

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
                    user,
                    user?.user?.plan?.name,
                    user?.user?.renew,
                    parseInt(user?.user?.plan?.id),
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

    const handleOpenModal = (index) => {
        setIndex(index);
        // setAccountId(account_id);
        setOpenModal2(true)
    }

    const handleChangeOption = (e) => {
        setOption(e.target.value)
    }

    const handleCloseModal = () => {
        setOption(null)
        setOpenModal2(false)
    }

    const handlePlanInputChange = (e, index) => {
        // let tmp = [...users];
        // let edit = tmp[index];
        // edit.plan_id = e.target.value;
        // tmp[index] = edit;
        editField('plan_id',e.target.value,index)
        // setUsers(tmp)
    }

    const editField = (field,value,index)=> {
        let tmp = [...users];
        let edit = tmp[index];
        edit[field] = value;
        tmp[index] = edit;
        setUsers(tmp)
    }

    const handleSaveOption = async () => {
        if (index != null) {
            let body = {
                plan_id: users[index]?.plan_id,
                status: option == "accept" ? 1 : 0
            }
            let user_id = users[index]?.data?.user?.id;
            try {
                const response = await service_UserAdmin.renewPlan(user_id, body)
                if (response.status != 200) {
                    setOpen(true);
                    setError("Ocurrion un error")
                }else{
                    editField('renew',0,index)
                }
            } catch (error) {
                setOpen(true);
                let tmperr = error?.response?.data?.message ? error?.response?.data?.message : 'Ocurrio un error';
                setError(tmperr);
            }
            setIndex(null);
            setOpenModal2(false)
        }
        setOpenModal2(false)
    }

    const isSelected = (id) => selected.indexOf(id) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, users?.length);


    const handleCloseAlert = () => {
        setOpen(false)
    }


    const bodyModal = (
        <>
            <h3 id="simple-modal-title">¿Qué acción deseas realizar?</h3>
            <FormControl component="fieldset" >
                <RadioGroup aria-label="option" name="option" value={option} onChange={handleChangeOption}>
                    <FormControlLabel value="accept" control={<Radio />} label="Aprobar" />
                    <FormControlLabel value="deny" control={<Radio />} label="Rechazar" />
                </RadioGroup>
            </FormControl>
            <Grid container spacing={3} direction="row" justify="center" style={{ marginTop: 5 }}>
                <Grid item >
                    <Button variant="outlined" onClick={handleCloseModal}>CANCELAR</Button>
                </Grid>
                <Grid item >
                    <Button variant="contained" onClick={handleSaveOption} disabled={!option}>ACEPTAR</Button>
                </Grid>
            </Grid>
        </>
    );

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
                                                        <TableCell
                                                            component="th"
                                                            id={labelId}
                                                            scope="row"
                                                            padding="none"
                                                        >
                                                            <Grid item xs={12}>
                                                                <Select
                                                                    labelId="slect-plan_id"
                                                                    id="id-select-plan_id"
                                                                    name="plan_id"
                                                                    value={row.plan_id}
                                                                    // defaultValue= {row?.data?.user?.plan_i}
                                                                    onChange={(e) => handlePlanInputChange(e, index)}
                                                                    label="Plan"
                                                                >

                                                                    {plans && plans.map(element =>
                                                                        <MenuItem key={element.id} value={element.id}>{element.name}</MenuItem>
                                                                    )}

                                                                </Select>
                                                                {/* <Typography variant="body1" component="span">{row?.data?.user?.plan_id}</Typography> */}
                                                            </Grid>
                                                        </TableCell>
                                                        <TableCell
                                                            component="th"
                                                            id={labelId}
                                                            scope="row"
                                                            padding="none"
                                                        >
                                                            <Grid item xs={12}>
                                                                <Button
                                                                    disabled={row.renew == 0}
                                                                    color="primary" onClick={() => handleOpenModal(index)}>Renovar</Button>
                                                                {/* <Typography variant="body1" component="span">{row.renew}</Typography> */}
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
            <Modal open={openModal2} handleCloseModal={() => setOpenModal2(false)} >
                {bodyModal}
            </Modal>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="error">
                    {error}
                </Alert>
            </Snackbar>

        </div >

    );

}