import React, { useState, useEffect, useMemo } from 'react';
import { DateTime } from "luxon";
import { FormControlLabel, Grid, Table, TableBody, TableCell, TableContainer, TableRow, RadioGroup, makeStyles, Paper } from "@material-ui/core";
import { stableSort, getComparator } from "../../../shared/utils/table.utils";
import { Radio, TablePagination, TextInput, Typography } from "../../../shared/components";
import { DialogSendMessages } from "../";
import { DialogImbox } from "../";
import EnhancedTableHead from "./CustomEnhancedTableHead";

import { produce } from "immer";

function createData(
    type_meet,
    fullName,
    url,
    date,
    data
) {
    return { type_meet, fullName, url, date, data };
}

const DATA_INTERVIEWS = [
    { id: 123, type_meet: "", fullName: "Jose Luis Merino Salazar", url: "" },
    { id: 125, type_meet: "", fullName: "Jose Luis Merino Salazar", url: "" },
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
    rootRadioGroup: {
        flexDirection: "row"
    }
}));

export default function Index() {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("");
    const [interviews, setInterviews] = useState([createData("", "", "", "", { id: "" })]);
   const [meeting, setMeeting] = useState("")

    const [openModal, setOpenModal] = useState(false)
    const [openImbox, setOpenImbox] = useState(false)

    const dateMin = DateTime.utc().toFormat("yyyy-LL-dd HH:mm")

    useEffect(() => {
        const rows = DATA_INTERVIEWS.map(item => {
            return (createData(
                item?.type_meet,
                item?.fullName,
                "",//URL
                "",//DATE
                { id: item.id }
            )
            )
        })
        setInterviews(rows)
    }, [])

    

    const isSelectAll = useMemo(() => {
        console.log("ejecuntado isSelectAll")
        
        return true
    }, [interviews])

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
        const interviewsTemp = [...interviews]
        let newArray = []
        for (let index = 0; index < interviewsTemp.length; index++) {
            const newInterview = { ...interviewsTemp[index], ["type_meet"]: e.target.value }
            newArray = [...newArray, newInterview]
        }
        setInterviews(newArray)
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
                        aria-label="tabla de postulantes"
                    >
                        <EnhancedTableHead
                            classes={classes}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            headCells={headCells}
                            onSelectAllClick={handleSelectAllClick}
                            meeting={meeting}
                        />
                        <TableBody>
                            {
                                stableSort(interviews, getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        const labelId = `enhanced-table-checkbox-${index}`;
                                        return (
                                            <TableRow
                                                hover
                                                // role="checkbox"
                                                tabIndex={-1}
                                                key={row.data.id}
                                            >
                                                <TableCell padding="normal" align="left" width="25%">
                                                    <RadioGroup aria-label="tipo de reunión" classes={{ root: classes.rootRadioGroup }} name="type_meet" value={interviews[index].type_meet} onChange={(e) => handleOnChange(e, index)}>
                                                        <FormControlLabel value="virtual" control={<Radio />} label="Virtual" />
                                                        <FormControlLabel value="presencial" control={<Radio />} label="Presencial" />
                                                    </RadioGroup>
                                                </TableCell>
                                                <TableCell id={labelId} scope="row" padding="none" width="20%">
                                                    <Typography variant="body2">{row.fullName}</Typography>
                                                </TableCell>
                                                <TableCell id={labelId} scope="row" padding="normal" width="30%">
                                                    <TextInput name="url" size="small" fullWidth onChange={(e) => handleOnChange(e, index)} value={interviews[index].url} />
                                                </TableCell>
                                                <TableCell id={labelId} scope="row" padding="normal" width="25%">
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
    { id: "type_meet", numeric: false, disablePadding: false, label: "Tipo de reunion", radioGroup:true },
    { id: "postulante", numeric: false, disablePadding: true, label: "Postulante" },
    { id: "url", numeric: false, disablePadding: false, label: "URL", },
    { id: "date", numeric: false, disablePadding: false, label: "Fecha y hora", },
];
