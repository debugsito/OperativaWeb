import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { DateTime } from "luxon";
import clsx from "clsx";

import "./index.css";
import {
  calendarIcon,
  registeredIcon,
  editIcon,
  fileIcon,
  folderIcon,
  deleteIcon,
  showIcon,
} from "../../images";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Toolbar,
  Paper,
  Tooltip,
  IconButton,
  MenuItem,
  Menu,
} from "@material-ui/core";
import {
  Button,
  Checkbox,
  Chip,
  MenuList,
  TablePagination,
  Typography,
} from "../../../shared/components";
import { useDispatch, useSelector } from "react-redux";
import {
  archivePublication,
  deletePublication,
  getPublicationsInfo,
  setPublicationSelected,
} from "../../../../store/actions/dashboard/dashboard.action";
import { SessionRoutes } from "../../../shared/libs/sessionRoutes";
import { useHistory } from "react-router-dom";

import MoreVertIcon from "@material-ui/icons/MoreVert";

const OPTIONS = [
  {
    id: "edit",
    name: "Editar",
  },
  {
    id: "archive",
    name: "Archivar",
  },
  {
    id: "show",
    name: "Mostrar ",
  },
];

function createData(
  title,
  publicationFinishDate,
  createBy,
  createdAt,
  applicants,
  state,
  actions,
  data
) {
  return {
    title,
    publicationFinishDate,
    createBy,
    createdAt,
    applicants,
    state,
    actions,
    data,
  };
}

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

const headCells = [
  {
    id: "title",
    numeric: false,
    disablePadding: true,
    label: "Título de la publicación",
  },
  {
    id: "createdAt",
    numeric: false,
    disablePadding: false,
    label: "Creación",
  },
  {
    id: "publicationFinishDate",
    numeric: false,
    disablePadding: false,
    label: "Caducidad",
  },
  {
    id: "applicants",
    numeric: false,
    disablePadding: false,
    label: "Postulantes",
  },
  { id: "cv", numeric: false, disablePadding: false, label: "Curriculum" },
  { id: "state", numeric: false, disablePadding: false, label: "Estado" },
  { id: "action", numeric: false, disablePadding: false, label: "Acciones" },
];

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
        <TableCell padding="checkbox" size="small" align="center">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
            // style={{ width: 150 }}
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

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: "#FFFFFF !important",
          backgroundColor: "var(--secondaryButtonColor)",
        }
      : {
          color: "#FFFFFF !important",
          backgroundColor: "var(--secondaryButtonColor)",
        },
  title: {
    flex: "1 1 100%",
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected, selected } = props;
  const dispatch = useDispatch();

  const deletePublicationFn = () => {
    selected.map((id) => dispatch(deletePublication({ id })));
  };

  const archivePublicationFn = () => {
    selected.map((id) => dispatch(archivePublication({ id })));
  };

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <Tooltip title="Delete">
        <IconButton aria-label="delete" onClick={deletePublicationFn}>
          <img src={deleteIcon} alt="Eliminar" />
          <Typography
            className={classes.title}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            Eliminar
          </Typography>
        </IconButton>
      </Tooltip>
      <Tooltip title="Archive">
        <IconButton aria-label="archive" onClick={archivePublicationFn}>
          <img src={folderIcon} alt="Archivar" />
          <Typography
            className={classes.title}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            Archivar
          </Typography>
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
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
  link: {
    textDecoration: "underline",
    cursor: "pointer",
  },
}));

export default function OpenPositionsTable() {
  // console.log("Actualizando tabla")
  const classes = useStyles();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [publications, setPublications] = useState([
    createData("", "", "", DateTime.local().toFormat("DDD"), 0, false, [], {
      id: "",
    }),
  ]);
  const [menuEl, setMenuEl] = useState(null);

  const { publicationsInfo } = useSelector((state) => state?.dashboard);
  const dispatch = useDispatch();
  const history = useHistory();
  const initRoute = SessionRoutes().initRoute;

  useEffect(() => {
    dispatch(getPublicationsInfo());
  }, []);

  useEffect(() => {
    const rows = publicationsInfo?.publications?.map((publication) =>
      createData(
        publication.job_title,
        DateTime.fromISO(
          publication.expiration_date
            ? publication.expiration_date
            : publication.from_date
        )
          .toUTC()
          .toFormat("dd LLL yyyy"),
        publication.account?.user?.fullname,
        DateTime.fromISO(publication.createdAt).toFormat("dd LLL yyyy"),
        publication.count_postulantes,
        DateTime.fromISO(
          publication.expiration_date
            ? publication.expiration_date
            : publication.from_date
        ).toMillis() > DateTime.local().toMillis(), //como se si esta activo
        [
          {
            id: "edit",
            name: "Editar",
          },
          {
            id: "archive",
            name: "Archivar",
          },
          {
            id: "show",
            name: "Mostrar ",
          },
        ],
        publication
      )
    );
    setPublications(rows);
  }, [publicationsInfo]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = publications.map((n) => n.data.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
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

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, publications?.length - page * rowsPerPage);

  const executeAction = (event, action, publication) => {
    console.log("publication", publication);
    console.log("event", event);
    event.preventDefault();
    dispatch(setPublicationSelected(publication));
    if (action === "edit") history.push(`${initRoute}/editar-empleo`);
    if (action === "show") history.push(`${initRoute}/ver-posicion`);
    if (action === "archive")
      dispatch(archivePublication({ id: publication.id }));
  };

  const goToPostulants = (publication) => {
    dispatch(setPublicationSelected(publication));
    // history.push({ pathname: `${initRoute}/postulantes` })
    history.push({
      pathname: `${initRoute}/publicacion/${publication.data.id}/lista-de-postulantes`,
    });
  };

  return (
    <div className="open-positions-table">
      <div className={classes.root}>
        <Paper className={classes.paper}>
          {selected?.length > 0 && (
            <EnhancedTableToolbar
              numSelected={selected?.length}
              selected={selected}
            />
          )}
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
                    console.log("row", row);
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
                          padding="checkbox"
                          size="small"
                          align="center"
                        >
                          <Checkbox
                            onClick={(event) => handleClick(event, row.data.id)}
                            checked={isItemSelected}
                            inputProps={{ "aria-labelledby": labelId }}
                          />
                        </TableCell>
                        <TableCell
                          // component="td"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          <Grid container spacing={0}>
                            <Grid item xs={12}>
                              <Typography variant="subtitle1">
                                <b>{row.title}</b>
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography variant="body2" component="span">
                                Creado por: <b>{row.createBy}</b>
                              </Typography>
                            </Grid>
                          </Grid>
                        </TableCell>
                        <TableCell align="left" scope="row">
                          <div className="text-with-icon-container">
                            <img src={calendarIcon} alt="Calendario" />{" "}
                            <Typography variant="body2" component="span">
                              {row.createdAt}
                            </Typography>
                          </div>
                        </TableCell>
                        <TableCell align="left">
                          <div className="text-with-icon-container">
                            <img src={calendarIcon} alt="Calendario" />{" "}
                            <Typography variant="body2" component="span">
                              {row.publicationFinishDate}
                            </Typography>
                          </div>
                        </TableCell>
                        <TableCell align="left">
                          <div
                            className={classes.link}
                            onClick={(e) => goToPostulants(row)}
                          >
                            <Typography variant="body1">
                              <b>
                                {`${row.applicants} postulante${
                                  row.applicants > 1 ? "s" : ""
                                }`}
                              </b>
                            </Typography>
                          </div>
                        </TableCell>
                        <TableCell align="left">
                          <Typography variant="body1">10 Leídos</Typography>
                          <Typography variant="body1">
                            <u>
                              <b>30 por leer</b>
                            </u>
                          </Typography>
                        </TableCell>
                        <TableCell align="left">
                          <Chip
                            label={row.state ? "Activo" : "Inactivo"}
                            color={row.state ? "primary" : ""}
                          />
                        </TableCell>
                        <TableCell align="left">
                          <Grid container direction="column" spacing={0}>
                            {OPTIONS.map((action, index) => (
                              <Grid item>
                                <Button
                                  onClick={(event) =>
                                    executeAction(event, action.id, row.data)
                                  }
                                  key={index}
                                  color="black"
                                  startIcon={
                                    <img
                                      src={
                                        action.id === "edit"
                                          ? editIcon
                                          : action.id === "archive"
                                          ? fileIcon
                                          : showIcon
                                      }
                                      alt={action.name}
                                    />
                                  }
                                >
                                  {action.name}
                                </Button>
                              </Grid>
                            ))}
                          </Grid>

                          {/* <IconButton
                            aria-label="acciones"
                            onClick={(e) => { setMenuEl(e.currentTarget) }}
                          >
                            <MoreVertIcon />
                          </IconButton>
                          <MenuList
                            anchorEl={menuEl}
                            handleClose={() => setMenuEl(null)}
                          >
                            {
                              OPTIONS.map((action, index2) => {
                                return (
                                  <MenuItem
                                    onClick={(event) => executeAction(event, action.id, row.data)}
                                    key={index2}
                                  >
                                    {action.name + " " + row.data.id}
                                  </MenuItem>
                                )
                              })
                            }
                          </MenuList> */}
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
            rowsPerPageOptions={[5, 10, 25]}
            count={publications?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </div>
  );
}
