import React, { useState, useEffect } from 'react';
import { Grid, IconButton, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, makeStyles, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { stableSort, getComparator } from "../../../shared/utils/table.utils";
import { Checkbox, CircularProgressWithLabel, EnhancedTableHead, Typography } from "../../../shared/components";
import EnhancedTableToolbar from "./EnhancedTableToolbar";

import { getPostulantsByPublicationId } from "../../../../store/actions/dashboard/dashboard.action";

//Images,icon
import EmailIcon from '@material-ui/icons/Email';
import DraftsIcon from '@material-ui/icons/Drafts';

function createData(
    similarity,
    fullname,
    messages,
    stateOfEvaluations,
    data
) {
    return { similarity, fullname, messages, stateOfEvaluations, data };
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

const STATE_OF_EVALUATIONS = [
    { text: "Preguntas", status: true },
    { text: "Verificativa", status: false },
    { text: "Médico", status: false },
    { text: "Evaluativa", status: false },
    { text: "Entrevista", status: false },
]

export default function TableListPostulants(props) {
    const classes = useStyles();
    const dispatch = useDispatch()
    const { postulantsByPublicationId } = useSelector(state => state?.dashboard)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("");
    const [selected, setSelected] = useState([]);
    const [postulants, setPostulants] = useState([createData({ id: "" }, "", "", "", "", "", "", "", { id: "" })]);

    useEffect(() => {
        dispatch(getPostulantsByPublicationId({ publication_id: "154" })) //EN DURO
    }, [])

    useEffect(() => {
        if (postulantsByPublicationId.count > 1) {
            const rows = postulantsByPublicationId?.data?.map(item => {
                return (createData(
                    item?.similarity,
                    item?.user?.first_name + " " + item?.user?.last_name,
                    item?.user?.experience ? 0 : 2, //Messages
                    STATE_OF_EVALUATIONS,
                    item,
                )
                )
            })
            setPostulants(rows)
        }
    }, [postulantsByPublicationId])

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
            const newSelecteds = postulants.map((n) => n.data.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, postulants?.length - page * rowsPerPage);

    // const emptyRows = rowsPerPage - Math.min(rowsPerPage, postulants.length);

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                {selected?.length > 0 && (
                    <EnhancedTableToolbar numSelected={selected?.length} />
                )}
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="postulantsInProgress"
                        aria-label="Postulants in progress"
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
                            rowCount={postulants?.length}
                        />
                        <TableBody>
                            {
                                stableSort(postulants, getComparator(order, orderBy))
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
                                                <TableCell padding="checkbox" align="center">
                                                    <Checkbox
                                                        onClick={(event) => handleClickCheckbox(event, row.data.id)}
                                                        checked={isItemSelected}
                                                        inputProps={{ "aria-labelledby": labelId }}
                                                    />
                                                </TableCell>
                                                <TableCell
                                                    id={labelId}
                                                    scope="row"
                                                    padding="none"
                                                >
                                                    <Grid item xs={12}>
                                                        <CircularProgressWithLabel value={row.similarity} />
                                                    </Grid>
                                                </TableCell>
                                                <TableCell
                                                    id={labelId}
                                                    scope="row"
                                                    padding="normal"
                                                    align="left"
                                                >
                                                    <Grid item xs={12}>
                                                        <Typography variant="body2">{row.fullname}</Typography>
                                                    </Grid>
                                                </TableCell>
                                                <TableCell
                                                    id={labelId}
                                                    scope="row"
                                                    padding="none"
                                                >
                                                    <Grid item xs={12} >
                                                        {
                                                            row.messages === 0 ?
                                                                <IconButton aria-label="email" color="inherit">
                                                                    <EmailIcon />
                                                                </IconButton> :
                                                                <IconButton aria-label="email" disabled>
                                                                    <DraftsIcon />
                                                                </IconButton>
                                                        }
                                                    </Grid>
                                                </TableCell>

                                                <TableCell
                                                    id={labelId}
                                                    scope="row"
                                                    padding="none"
                                                >
                                                    <Grid item xs={12}>
                                                        hello2
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
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={postulants.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelRowsPerPage="Filas por página"
                    labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count !== -1 ? count : to}`}
                />
            </Paper>
        </div>
    )
}

const headCells = [
    { id: "match", numeric: false, disablePadding: true, label: "Match", width: 75 },
    { id: "postulant", numeric: false, disablePadding: true, label: "Postulante", width: 200 },
    { id: "messages", numeric: false, disablePadding: true, label: "Mensajes", width: 80 },
    { id: "stateOfEvaluations", numeric: false, disablePadding: true, label: "Estado de las evaluaciones" },
];
