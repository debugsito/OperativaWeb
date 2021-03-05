import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import clsx from 'clsx'
import moment from 'moment'
import 'moment/locale/es';
import { lighten, makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import './index.css'
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Toolbar, Paper, Tooltip, IconButton } from "@material-ui/core";
import { Button, Checkbox, Chip, Typography } from "../../../shared/components";
import { useDispatch, useSelector } from "react-redux";
import { SessionRoutes } from "../../../shared/libs/sessionRoutes";
import { useHistory } from "react-router-dom";
// import { service_ApplicantPublication } from "../../../store/services";
// import { service_ApplicantPublication } from "../../../../store/services";
import { setPublicationSelected, getPublicationAccount } from '../../../../store/actions/applicant/applicant.action'


import {
    calendarIcon,
    registeredIcon,
    editIcon,
    fileIcon,
    folderIcon,
    deleteIcon,
} from "../../../dashboard/images";




function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array = [], comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}


function createData(
    title,
    date,
    createBy,
    publicationDate,
    salary,
    actions,
    data
) {
    return { title, date, createBy, publicationDate, salary, actions, data };
}


const headCells = [
    {
        id: "title",
        numeric: false,
        disablePadding: false,
        label: "Título de la publicación",
    },
    {
        id: "publicationDate",
        numeric: false,
        disablePadding: false,
        label: "Fecha de publicación",
    },
    {
        id: "salary",
        numeric: false,
        disablePadding: false,
        label: "Salario",
    },
    { numeric: false, disablePadding: true },
]

function EnhancedTableHead(props) {
    const {
        classes,
        onSelectAllClick,
        order,
        orderBy,
        numSelected,
        rowCount,
        onRequestSort,
    } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? "right" : "left"}
                        padding={headCell.disablePadding ? "none" : "default"}
                        sortDirection={orderBy === headCell.id ? order : false}
                        style={{ width: 100 }}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : "asc"}
                            onClick={createSortHandler(headCell.id)}
                        >
                            <span className={classes.headCellLabel}>{headCell.label}</span>
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};


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

export default function ApplicantDataTable() {
    const classes = useStyles();
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("");
    // const [selected,setSelected]=useState([]);
    const [page, setPage] = useState(0)
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [publications, setPublications] = useState([createData("", "", "", moment().format('LL'), 0, [], { id: "" })])


    const { publicationsAccount } = useSelector(state => state?.applicant);
    const dispatch = useDispatch();
    const history = useHistory();
    const initRoute = SessionRoutes().initRoute;

    useEffect(() => {
        dispatch(getPublicationAccount());
    }, [])


    useEffect(() => {
        const rows = publicationsAccount?.data?.map(({ publication }) => (
            createData(
                publication.job_title,
                moment(publication.to_date).format('LL'),
                publication?.account?.user?.fullname,
                moment(publication.createdAt).format('LL'),
                publication.salary,
                [
                    {
                        id: "show",
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

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };


    const executeAction = (event, id, publication) => {
        event.preventDefault();
        dispatch(setPublicationSelected(publication));
        // console.log(initRoute)
        if (id === "show") history.push(`/postulante/postulaciones/ver-publicacion`);
        // if (id === "archive") dispatch(archivePublication({ id: publication.id }));
    }

    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, publications?.length - page * rowsPerPage);



    return (<div className="open-positions-table">
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
                            // numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            // onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={publications?.length}
                        />
                        <TableBody>
                            {stableSort(publications, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    {/* const isItemSelected = isSelected(row.data.id); */ }
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            // role="checkbox"
                                            // aria-checked={isItemSelected}
                                            // tabIndex={-1}
                                            key={row.data.id}
                                        // selected={isItemSelected}
                                        >

                                            <TableCell align="left">
                                                <Grid container spacing={0}>
                                                    <Grid item xs={12}>
                                                        <Typography variant="h6" component="span">
                                                            {row.title}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} className="text-with-icon-container">
                                                        <img src={calendarIcon} alt="Calendario" />{" "}
                                                        <Typography variant="body2" component="span">Caduca {row.date}</Typography>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Typography variant="body2" component="span">
                                                            Creado por {row.createBy}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </TableCell>
                                            <TableCell align="left">
                                                <Grid item xs={12} className="text-with-icon-container">
                                                    <img src={calendarIcon} alt="Calendario" />{" "}
                                                    <Typography variant="body2" component="span">{row.publicationDate}</Typography>
                                                </Grid>
                                            </TableCell>
                                            <TableCell align="left">
                                                <Grid item xs={12} className="text-with-icon-container">
                                                    {/* <img src={calendarIcon} alt="Calendario" />{" "} */}
                                                    <Typography variant="body2" component="span">{row.salary}</Typography>
                                                </Grid>

                                                {/* <Chip label={row.state ? "Activo" : "Inactivo"} color={row.state ? "primary" : ""} /> */}
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.actions.map((action, index) => (
                                                    <Chip key={index} onClick={(event) => executeAction(event, action.id, row.data)} label={action.name} color={"primary"} />
                                                ))}
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
    </div>

    );


}






