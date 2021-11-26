import React, { useState, useEffect } from 'react';
import { DateTime } from "luxon";
import { Grid, Table, TableBody, TableCell, TableContainer, TableRow, makeStyles, Paper } from "@material-ui/core";
import { stableSort, getComparator } from "../../../shared/utils/table.utils";
import { Checkbox, TablePagination, TextInput, Typography } from "../../../shared/components";
import { DialogSendMessages } from "../";
import { DialogImbox } from "../";
import EnhancedTableHead from "./CustomEnhancedTableHead";

import { produce } from "immer";

function createData(
    virtual,
    presencial,
    fullName,
    url,
    date,
    data
) {
    return { virtual, presencial, fullName, url, date, data };
}

const DATA_INTERVIEWS = [
    { id: 123, virtual: false, presencial: false, fullName: "Jose Luis Merino Salazar", url: "" },
    { id: 125, virtual: false, presencial: false, fullName: "Jose Luis Merino Salazar", url: "" },
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
}));

export default function Index() {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("");
    const [selected, setSelected] = useState([]);
    const [interviews, setInterviews] = useState([createData("", "", "", "", "", { id: "" })]);

    const [openModal, setOpenModal] = useState(false)
    const [openImbox, setOpenImbox] = useState(false)

    const dateMin = DateTime.utc().toFormat("yyyy-LL-dd HH:mm")

    useEffect(() => {
        const rows = DATA_INTERVIEWS.map(item => {
            return (createData(
                item?.virtual,
                item?.presencial,
                item?.fullName,
                "",//URL
                "",//DATE
                { id: item.id }
            )
            )
        })
        setInterviews(rows)
    }, [])

    const handleOnChange = (e, index) => {
        setInterviews(currentValue => produce(currentValue, (v) => {
            v[index][e.target.name] = e.target.value
        }))
    }

    const handleOnChecked = (e, index) => {
        setInterviews(currentValue => produce(currentValue, (v) => {
            v[index][e.target.name] = e.target.checked
        }))
    }

    const handleSelectAllClick = (e) => {
        const newInterviews = [...interviews]
        for (let index = 0; index < newInterviews.length; index++) {
            newInterviews[index][e.target.name]= e.target.checked;
        }
        setInterviews(newInterviews)
    }


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
        rowsPerPage - Math.min(rowsPerPage, interviews?.length - page * rowsPerPage);


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
                            onSelectAllClick={handleSelectAllClick}
                        // numSelected={selected?.length}
                        // rowCount={interviews?.length}
                        />
                        <TableBody>
                            {
                                stableSort(interviews, getComparator(order, orderBy))
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
                                                <TableCell padding="normal" align="left" width="10%">
                                                    <Checkbox
                                                        name="virtual"
                                                        onClick={(event) => handleOnChecked(event, index)}
                                                        checked={interviews[index].virtual}
                                                        inputProps={{ "aria-labelledby": labelId }}
                                                    />
                                                </TableCell>
                                                <TableCell padding="normal" align="left" width="10%">
                                                    <Checkbox
                                                        name="presencial"
                                                        onClick={(event) => handleOnChecked(event, index)}
                                                        checked={interviews[index].presencial}
                                                        inputProps={{ "aria-labelledby": labelId }}
                                                    />
                                                </TableCell>
                                                <TableCell id={labelId} scope="row" padding="none" width="25%">
                                                    <Grid item xs={12}>
                                                        <Typography variant="body2">{row.fullName}</Typography>
                                                    </Grid>
                                                </TableCell>
                                                <TableCell id={labelId} scope="row" padding="normal" width="30%">
                                                    <Grid item xs={12}>
                                                        <TextInput name="url" size="small" fullWidth onChange={(e) => handleOnChange(e, index)} value={interviews[index].url} />
                                                    </Grid>
                                                </TableCell>
                                                <TableCell id={labelId} scope="row" padding="normal" width="25%">
                                                    <Grid item xs={12} >
                                                        <TextInput
                                                            fullWidth
                                                            type="datetime-local"
                                                            name="date"
                                                            size="small"
                                                            onChange={(e) => handleOnChange(e, index)}
                                                            value={interviews[index].date}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                            inputProps={{
                                                                min: dateMin,
                                                            }}
                                                        />
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
                    count={interviews.length}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={[5, 10]}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <DialogSendMessages open={openModal} onClose={() => setOpenModal(false)} />
            <DialogImbox open={openImbox} onClose={() => setOpenImbox(false)} />
        </div>
    )
}

const headCells = [
    { id: "virtual", numeric: false, disablePadding: true, label: "Virtual", checkbox: true },
    { id: "presencial", numeric: false, disablePadding: true, label: "Presencial", checkbox: true },
    { id: "postulante", numeric: false, disablePadding: true, label: "Postulante" },
    { id: "url", numeric: false, disablePadding: false, label: "URL", },
    { id: "date", numeric: false, disablePadding: false, label: "Fecha y hora", },
];
