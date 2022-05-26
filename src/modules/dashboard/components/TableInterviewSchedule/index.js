import React, { useState, useEffect, useMemo } from 'react';
import { DateTime } from "luxon";
import { useSelector } from "react-redux";
import { FormControlLabel, Grid, Table, TableBody, TableCell, TableContainer, TableRow, RadioGroup, makeStyles, Paper } from "@material-ui/core";
import { stableSort, getComparator } from "../../../shared/utils/table.utils";
import { Radio, TablePagination, TextInput, Typography } from "../../../shared/components";
import { DialogSendMessages } from "../";
import { DialogImbox } from "../";
import EnhancedTableHead from "./CustomEnhancedTableHead";

//services
import { service_Applicant } from "../../../../store/services";
//constans
import { MEET_TYPE } from "../../constants/Dashboard";

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

export default function Index({interviews, setInterviews}) {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("");

    const [openModal, setOpenModal] = useState(false)
    const [openImbox, setOpenImbox] = useState(false)
    const [data, setData] = useState([])
    const { postulantsSelected } = useSelector(state => state?.dashboard)
    console.log(postulantsSelected)

    const dateMin = DateTime.utc().toFormat("yyyy-LL-dd HH:mm")

    useEffect(async () => {

        let ids = postulantsSelected.ids.join(',');
        let data = await  service_Applicant.getPublicationAccountInterviews(ids).then((obj)=> {
            console.log(obj.data.data);

        }, error=> {
            console.log(error);
        })

        const rows = postulantsSelected.data.map(item => ({
            publication_account_id:item.id,
            virtual:"",
            interviewer:item.user.fullname,
            url_interview:"",
            interview_date:"",
            data:{id:item.id},
        }))
        setInterviews(rows)


    }, [postulantsSelected])

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
        const {name, checked} = e.target
        const virtual= checked? MEET_TYPE[name]: ""
        
        const interviewsTemp = [...interviews]
        let newArray = []
        for (let index = 0; index < interviewsTemp.length; index++) {
            const newInterview = { ...interviewsTemp[index], ["virtual"]: virtual }
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
                                                    <RadioGroup aria-label="tipo de reunión" classes={{ root: classes.rootRadioGroup }} name="virtual" value={interviews[index].virtual} onChange={(e) => handleOnChange(e, index)}>
                                                        <FormControlLabel value="1" control={<Radio />} label="Virtual" />
                                                        <FormControlLabel value="2" control={<Radio />} label="Presencial" />
                                                    </RadioGroup>
                                                </TableCell>
                                                <TableCell id={labelId} scope="row" padding="none" width="20%">
                                                    <Typography variant="body2">{row.interviewer}</Typography>
                                                </TableCell>
                                                <TableCell id={labelId} scope="row" padding="normal" width="30%">
                                                    <TextInput name="url_interview" size="small" fullWidth onChange={(e) => handleOnChange(e, index)} value={interviews[index].url} />
                                                </TableCell>
                                                <TableCell id={labelId} scope="row" padding="normal" width="25%">
                                                    <TextInput
                                                        fullWidth
                                                        type="datetime-local"
                                                        name="interview_date"
                                                        size="small"
                                                        onChange={(e) => handleOnChange(e, index)}
                                                        value={interviews[index].interview_date}
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
    { id: "type_meet", numeric: false, disablePadding: false, label: "Tipo de reunion", checkbox:true },
    { id: "postulante", numeric: false, disablePadding: true, label: "Postulante" },
    { id: "url", numeric: false, disablePadding: false, label: "URL", },
    { id: "date", numeric: false, disablePadding: false, label: "Fecha y hora", },
];
