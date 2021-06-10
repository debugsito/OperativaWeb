import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Paper } from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import EnhancedTableHead from "./EnhancedTableHead"
import { Chip, Checkbox, Typography } from "../../../shared/components";

import { setPublicationSelected, getPublicationAccount } from '../../../../store/actions/applicant/applicant.action'
import { stableSort, getComparator } from "../../../shared/utils/table.utils";
import { calendarIconSVG } from "../../../shared/images";

function createData(
    job_title,
    nameBusiness,
    publicationDate,
    salary,
    a_tratar,
    actions,
    data
) {
    return { job_title, nameBusiness, publicationDate, salary, a_tratar, actions, data };
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
    const [publications, setPublications] = useState([createData("", "", DateTime.utc().toFormat("DDD"), "", "", [], { id: "" })]);

    const { publicationsAccount } = useSelector(state => state?.applicant);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getPublicationAccount())
    }, [])

    useEffect(() => {
        const rows = publicationsAccount?.data?.map(({ publication }) => (
            createData(
                publication.job_title,
                publication.company,
                DateTime.fromISO(publication.createdAt).toFormat("DDD"),
                publication.salary,
                publication.a_tratar,
                [
                    {
                        id: "see_more",
                        name: "Ver Más",
                    }
                ],
                publication
            )
        ))
        setPublications(rows)

    }, [publicationsAccount])

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

    const isSelected = (id) => selected.indexOf(id) !== -1;

    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, publications?.length - page * rowsPerPage);

    const executeAction = (event, id, publication) => {
        event.preventDefault();
        dispatch(setPublicationSelected(publication));
        if (id === "see_more") history.push(`/postulante/postulaciones/ver-publicacion`);
    }

    return (
        <div className="open-positions-table">
            <div className={classes.root}>
                <Paper className={classes.paper}>
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
                                                // padding="none"
                                                >
                                                    <Grid item xs={12}>
                                                        <Typography variant="h6" component="h6">{row.job_title}</Typography>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Typography variant="body2" component="span">{row.nameBusiness}</Typography>
                                                    </Grid>
                                                </TableCell>
                                                <TableCell
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                    padding="none"
                                                >
                                                    <Grid item xs={12} className="text-with-icon-container">
                                                        <img src={calendarIconSVG} alt="calendario" />
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
                                                        <Typography variant="body1" component="span">{row.a_tratar ? "A tratar" : `S/ ${row.salary}`}</Typography>
                                                    </Grid>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Grid container>
                                                        {row.actions.map((action, index) => (
                                                            <Grid item xs={12} key={index}>
                                                                <Chip key={index} onClick={(event) => executeAction(event, action.id, row.data)} label={action.name} color={"primary"} />
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
