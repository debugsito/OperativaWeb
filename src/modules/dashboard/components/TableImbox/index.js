import React, { useState, useEffect } from 'react';
import { Grid, Table, TableBody, TableCell, TableContainer, TableRow, makeStyles, Paper } from "@material-ui/core";
import { stableSort, getComparator } from "../../../shared/utils/table.utils";
import { Checkbox, EnhancedTableHead, TablePagination, Typography } from "../../../shared/components";
import { DialogSeeMessage, DialogImbox, DialogSendMessages } from "../";

const DATA_MESSAGES = [
    { id: 123, subject: "Agradecimiento", message: "Gracias por la respuesta, espero poder participar en procesos de selección a futuro.", createdAt: "8:17pm" },
    { id: 323, subject: "Disponibilidad", message: "Muchas gracias por el mensaje, tengo disponibilidad inmediata para el puesto de motorizado", createdAt: "15 agosto" },
    { id: 146, subject: "Disponibilidad", message: "Muchas gracias por el mensaje, tengo disponibilidad inmediata para el puesto de motorizado", createdAt: "15 agosto" },
    { id: 156, subject: "Disponibilidad", message: "Muchas gracias por el mensaje, tengo disponibilidad inmediata para el puesto de motorizado", createdAt: "15 agosto" },
    { id: 176, subject: "Disponibilidad", message: "Muchas gracias por el mensaje, tengo disponibilidad inmediata para el puesto de motorizado", createdAt: "15 agosto" },
]

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
    row:{
        cursor:"pointer",
    }
}));

export default function Index() {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("");
    const [selected, setSelected] = useState([]);
    const [messages, setMessages] = useState([createData("", "", "", "", "")]);

    const [openModal, setOpenModal] = useState(false)
    const [openImbox, setOpenImbox] = useState(false)
    const [message, setMessage] = useState({state:false,subject:"", text:""})

    useEffect(() => {
        const rows = DATA_MESSAGES.map(item => {
            return createData(
                item?.subject,
                item?.message,
                item?.createdAt,
                item?.id,
            )
        })
        setMessages(rows)
    }, [])

    const handleClickCheckbox = (event, id) => {
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

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = messages.map((n) => n.data.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, messages?.length - page * rowsPerPage);

    const handleShowMessage = (row) => {
        setMessage({state:true, subject: row.subject, message:row.message})
    }

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                {/* {selected?.length > 0 && (
                    <EnhancedTableToolbar numSelected={selected?.length} />
                )} */}
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableMessages"
                        aria-label="table messages"
                    >
                        <EnhancedTableHead
                            classes={classes}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            headCells={headCells}
                            columnCheckbox
                            onSelectAllClick={handleSelectAllClick}
                            numSelected={selected?.length}
                            rowCount={messages?.length}
                        />
                        <TableBody>
                            {
                                stableSort(messages, getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        const isItemSelected = isSelected(row.id);
                                        const labelId = `enhanced-table-checkbox-${index}`;
                                        return (
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row.id}
                                                selected={isItemSelected}
                                                onClick={() => handleShowMessage(row)}
                                                className={classes.row}
                                            >
                                                <TableCell padding="checkbox" align="center">
                                                    <Checkbox
                                                        onClick={(event) => handleClickCheckbox(event, row.id)}
                                                        checked={isItemSelected}
                                                        inputProps={{ "aria-labelledby": labelId }}
                                                    />
                                                </TableCell>
                                                <TableCell id={labelId} scope="row" padding="none" width="20%">
                                                    <Grid item xs={12}>
                                                        <Typography variant="body2">Fwd:{row.subject}</Typography>
                                                    </Grid>
                                                </TableCell>
                                                <TableCell id={labelId} scope="row" padding="none" width="70%">
                                                    <div className="text-message">
                                                        <Typography variant="body2">{row.message}</Typography>
                                                    </div>
                                                </TableCell>
                                                <TableCell id={labelId} scope="row" padding="none" width="10%">
                                                    <Grid item xs={12} >
                                                        <Typography variant="body2">{row.date}</Typography>
                                                    </Grid>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })
                            }
                            {/* {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )} */}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    count={messages.length}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={[5, 10]}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <DialogSendMessages open={openModal} onClose={() => setOpenModal(false)} />
            <DialogImbox open={openImbox} onClose={() => setOpenImbox(false)} />
            <DialogSeeMessage open={message.state} data={message} onClose={() => setMessage({state:false})} />
        </div>
    )
}

const headCells = [
    { id: "subject", numeric: false, disablePadding: true, label: "Asunto", width: "20%" },
    { id: "messaje", numeric: false, disablePadding: true, label: "Mensaje", width: "60%" },
    { id: "createdAt", numeric: false, disablePadding: true, label: "Recibido", width: "20%" },
];

function createData(
    subject,
    message,
    date,
    id
) {
    return { subject, message, date, id };
}