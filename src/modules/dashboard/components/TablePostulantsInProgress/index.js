import React, { useState, useEffect } from 'react';
import { Grid, Table, TableBody, TableCell, TableContainer, TableRow, makeStyles, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { stableSort, getComparator } from "../../../shared/utils/table.utils";
import { Checkbox, CircularProgressWithLabel, EnhancedTableHead, ToolTip, Typography, TablePagination } from "../../../shared/components";
// import EnhancedTableToolbar from "./EnhancedTableToolbar";
import { DialogSendMessages } from "../";
import { DialogImbox } from "../";

import { getPostulantsByPublicationId } from "../../../../store/actions/dashboard/dashboard.action";

//Images,icon
import IconButton from '@material-ui/core/IconButton';
import EmailIcon from '@material-ui/icons/Email';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import { DoneIcon, AlertIcon } from "../../images";

function createData(
    similarity,
    fullname,
    messages,
    stateOfEvaluations,
    actions,
    data
) {
    return { similarity, fullname, messages, stateOfEvaluations, actions, data };
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        marginTop: "1rem"
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
    chips: {
        display: "grid",
        gridAutoFlow: "column",
        gridGap: "0.5rem"
    },
    chip: {
        display: "flex",
        background: "#EBEBEB",
        padding: "0.5em",
        borderRadius: "10px",
        justifyContent: "center",
        gridGap: "0.2rem",
        cursor: "pointer",
    }
}));

const STATE_OF_EVALUATIONS = [
    { text: "Preguntas", status: true },
    { text: "Verificativa", status: false },
    { text: "Médico", status: false },
    { text: "Evaluativa", status: false },
    { text: "Entrevista", status: false },
]

export default function TableListPostulants({ selected, handleClickCheckbox, handleSelectAllClick }) {
    const classes = useStyles();
    const dispatch = useDispatch()
    const { postulantsByPublicationId } = useSelector(state => state?.dashboard)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("");
    // const [selected, setSelected] = useState([]);
    const [postulants, setPostulants] = useState([createData("", "", "", [], [], { id: "" })]);
    const [openModal, setOpenModal] = useState(false)
    const [openImbox, setOpenImbox] = useState(false)

    useEffect(() => {
        dispatch(getPostulantsByPublicationId({ publication_id: "154" })) //EN DURO
    }, [])

    useEffect(() => {
        if (postulantsByPublicationId.count > 1) {
            const rows = postulantsByPublicationId?.data?.map(item => {
                return (createData(
                    item?.similarity,
                    item?.user?.first_name + " " + item?.user?.last_name,
                    item?.user?.experience ? 2 : 0, //Messages
                    STATE_OF_EVALUATIONS,
                    [{ id: "finalizar", label: "Pasar a Finalista" }, { id: "descartar", label: "Descartar postulante" }],
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

    const isSelected = (id) => selected.indexOf(id) !== -1;

    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, postulants?.length - page * rowsPerPage);


    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                {/* {selected?.length > 0 && (
                    <EnhancedTableToolbar numSelected={selected?.length} />
                )} */}
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
                            onSelectAllClick={(e) => handleSelectAllClick(e, postulants)}
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
                                                <TableCell id={labelId} scope="row" padding="none">
                                                    <Grid item xs={12}>
                                                        <CircularProgressWithLabel value={row.similarity * 1} />
                                                    </Grid>
                                                </TableCell>
                                                <TableCell id={labelId} scope="row" padding="none" align="left">
                                                    <Grid item xs={12}>
                                                        <Typography variant="body2">{row.fullname}</Typography>
                                                    </Grid>
                                                </TableCell>
                                                <TableCell id={labelId} scope="row" padding="none">
                                                    <Grid item xs={12} >
                                                        <div className="align-items-center">
                                                            <ToolTip title={row.messages === 0 ? 'Enviar mensaje' : 'Ver mensajes'}>
                                                                <IconButton aria-label="mensajes" color={row.messages === 0 ? 'default' : 'inherit'} onClick={() => setOpenImbox(true)}>
                                                                    <EmailIcon />
                                                                </IconButton>
                                                            </ToolTip>
                                                            <Typography variant="body2">{row.messages}</Typography>
                                                        </div>
                                                    </Grid>
                                                </TableCell>

                                                <TableCell
                                                    id={labelId}
                                                    scope="row"
                                                    padding="normal"
                                                >
                                                    <Grid item xs={12}>
                                                        <div className={classes.chips}>
                                                            {
                                                                row.stateOfEvaluations.map((item, index) => (
                                                                    <div className={classes.chip} key={index}>
                                                                        <img src={item.status ? DoneIcon : AlertIcon} alt="icon" />
                                                                        <Typography variant="body2">{item.text}</Typography>
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                    </Grid>
                                                </TableCell>
                                                <TableCell id={labelId} scope="row" padding="normal">
                                                    <Grid item xs={12}>
                                                        {
                                                            row.actions.map((item) => (
                                                                <ToolTip title={item.label}>
                                                                <IconButton aria-label="delete" key={item.id} color="inherit">
                                                                    {item.id === "finalizar"? <PlaylistAddCheckIcon/> : <RemoveCircleIcon/>}
                                                                </IconButton>
                                                                </ToolTip>
                                                            ))
                                                        }
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
                    rowsPerPageOptions={[5, 10, 25]}
                    count={postulants.length}
                    rowsPerPage={rowsPerPage}
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
    { id: "match", numeric: false, disablePadding: true, label: "Match", width: 75 },
    { id: "postulant", numeric: false, disablePadding: true, label: "Postulante", width: 200 },
    { id: "messages", numeric: false, disablePadding: true, label: "Mensajes", width: 80 },
    { id: "stateOfEvaluations", numeric: false, disablePadding: false, label: "Estado de las evaluaciones" },
    { id: "actions", numeric: false, disablePadding: false, label: "Acciones" },
];
