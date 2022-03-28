import React, { useState, useEffect, useContext } from "react";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  makeStyles,
  Paper,
} from "@material-ui/core";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { stableSort, getComparator } from "../../../shared/utils/table.utils";
import {
  Checkbox,
  CircularProgressWithLabel,
  EnhancedTableHead,
  LinkRouter,
  Typography,
  SnackbarsAlert
} from "../../../shared/components";
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import { DateTime } from "luxon";

import { getPostulantsByPublicationId } from "../../../../store/actions/dashboard/dashboard.action";
import { actions_Utils } from "../../../../store/actions";
import { service_Dashboard } from "../../../../store/services"

//context || const
import { Context } from "../../context/AdvanceFilterContext";
import { ContextNotification } from "../../context/NotificationAlertContext";
import { POSTULANTS } from "../../constants/Dashboard";
import { messageSuccessful, messageError } from "../../utils/notification";

//Images,icon
import TodayIcon from "@material-ui/icons/Today";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: "1rem",
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
  chip: {
    textAlign: "center",
    padding: "0.2rem 1.5rem",
    background: "#ebebeb",
    borderRadius: "100px",
  },
  chipActive: {
    textAlign: "center",
    padding: "0.2rem 1.5rem",
    background: "#B8EA71",
    borderRadius: "100px",
  },
}));

export default function TableListPostulants() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { publicationSelected, postulantsByPublicationId } = useSelector((state) => state?.dashboard);
  const { departments, provinces, districts } = useSelector(state => state?.utils)

  const { values, queryParams } = useContext(Context);
  const { notification, setNotification } = useContext(ContextNotification);
  
  // const publication_id = publicationSelected.data.id;
  const { publication_id } = useParams();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [selected, setSelected] = useState([]);
  const [postulants, setPostulants] = useState([]);

  useEffect(() => {
    dispatch(actions_Utils.getDepartments());
    dispatch(actions_Utils.getProvinces());
    dispatch(actions_Utils.getDistricts());
    dispatch(getPostulantsByPublicationId({ publication_id, params: { estado: POSTULANTS.current, page, size: rowsPerPage} }));
  }, [])
  
  useEffect(() => {
    dispatch(getPostulantsByPublicationId({ publication_id, params: { estado: POSTULANTS.current, page, size: rowsPerPage, ...queryParams} }));
  },[queryParams])

  useEffect(() => {
    if (postulantsByPublicationId.rows) {
      const rows = postulantsByPublicationId?.rows?.map((item) => {
        return {
          similarity: item?.similarity,
          fullname: item.user.fullname,
          experience: item.user.experience ? "Si" : "No",
          createdAt: DateTime.fromISO(item.createdAt).toFormat("dd LLL yyyy"),
          education: item.user.level_name ? item.user.level_name : "-",
          resident: `${getDepartmentById(item?.user?.department_id)}, ${getProvinceById(item?.user?.province_id)}, ${getDistrictById(item?.user?.district_id)}`,
          source: "Multiposting",
          stateCv: item.user.experience,
          data: item,
        };
      });
      setPostulants(rows);
    }
  }, [postulantsByPublicationId.rows]);

  const getDistrictById = (district_id) => {
    const distric_temp = districts.find(item => item.id == district_id);
    return distric_temp?.name
  }

  const getProvinceById = (province_id) => {
    const province_temp = provinces.find(item => item.id == province_id);
    return province_temp?.name
  }

  const getDepartmentById = (department_id) => {
    const department_temp = departments.find(item => item.id == department_id)
    return department_temp?.name
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    dispatch(getPostulantsByPublicationId({ publication_id, params: { estado: POSTULANTS.current, page: newPage, size: rowsPerPage } }));
  };

  const handleChangeRowsPerPage = (event) => {
    const rowsPerPageTemp = parseInt(event.target.value, 10)
    setRowsPerPage(rowsPerPageTemp);
    setPage(0);
    dispatch(getPostulantsByPublicationId({ publication_id, params: { estado: POSTULANTS.current, page: 0, size: rowsPerPageTemp } }));
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

  const sendPostulantAProcess = () => {
    const body = selected.map(item => (
      {
        publication_account_id: item
      }
    ))
    service_Dashboard.selectApplicant(body, publication_id)
      .then(() => {
        setSelected([]);
        dispatch(getPostulantsByPublicationId({ publication_id, params: { estado: POSTULANTS.current, page, size: rowsPerPage} }));
        setNotification({ ...notification, ...messageSuccessful("Dirigase a la pestaña: EN PROCESO") })
      })
      .catch(error => {
        setNotification({ ...notification, ...messageError() })
      })

  }

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // const emptyRows =
  //   rowsPerPage -
  //   Math.min(rowsPerPage, postulants?.length - page * rowsPerPage);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, postulants.length);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {selected?.length > 0 && (
          <EnhancedTableToolbar handleClick={sendPostulantAProcess} numSelected={selected?.length} />
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
              {stableSort(postulants, getComparator(order, orderBy))
                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                          onClick={(event) =>
                            handleClickCheckbox(event, row.data.id)
                          }
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      <TableCell id={labelId} scope="row" padding="none">
                        <Grid item xs={12}>
                          <CircularProgressWithLabel
                            value={row.similarity * 1}
                          />
                        </Grid>
                      </TableCell>
                      <TableCell
                        id={labelId}
                        scope="row"
                        padding="normal"
                        align="left"
                      >
                        <Grid item xs={12}>
                          <LinkRouter
                            to={`/lista-de-postulantes/${row.data.user.account_id}/perfil`}
                          >
                            <b>{row.fullname}</b>
                          </LinkRouter>
                        </Grid>
                      </TableCell>
                      <TableCell id={labelId} scope="row" padding="none">
                        <Grid item xs={12}>
                          <Typography variant="body2" component="span">
                            {row.experience}
                          </Typography>
                        </Grid>
                      </TableCell>
                      <TableCell id={labelId} scope="row" padding="none">
                        <Grid item xs={12} className="align-items-center">
                          <TodayIcon />
                          <Typography variant="body2" component="span">
                            {row.createdAt}
                          </Typography>
                        </Grid>
                      </TableCell>
                      <TableCell id={labelId} scope="row" padding="none">
                        <Grid item xs={12}>
                          <Typography variant="body2" component="span">
                            {row.education}
                          </Typography>
                        </Grid>
                      </TableCell>
                      <TableCell id={labelId} scope="row" padding="none">
                        <Grid item xs={12}>
                          <Typography variant="body2" component="span">
                            {row.resident}
                          </Typography>
                        </Grid>
                      </TableCell>
                      <TableCell id={labelId} scope="row" padding="none">
                        <Grid item xs={12}>
                          <Typography variant="body2" component="span">
                            {row.source}
                          </Typography>
                        </Grid>
                      </TableCell>
                      <TableCell id={labelId} scope="row" padding="none">
                        <Grid item xs={12}>
                          {row.stateCv ? (
                            <span className={classes.chipActive}>VISTO</span>
                          ) : (
                            <span className={classes.chip}>SIN VER</span>
                          )}
                        </Grid>
                      </TableCell>
                    </TableRow>
                  );
                })}
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
          count={postulantsByPublicationId?.totalItems}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Filas por página"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} de ${count !== -1 ? count : to}`
          }
          hideNextButton
        />
      </Paper>
    </div>
  );
}

const headCells = [
  {
    id: "match",
    numeric: false,
    disablePadding: true,
    label: "Match",
    width: 75,
  },
  {
    id: "postulant",
    numeric: false,
    disablePadding: false,
    label: "Postulante",
    width: 150,
  },
  {
    id: "experience",
    numeric: false,
    disablePadding: true,
    label: "Experiencia",
    width: 80,
  },
  {
    id: "createdAt",
    numeric: false,
    disablePadding: true,
    label: "Fecha de postulación",
    width: 120,
  },
  {
    id: "education",
    numeric: false,
    disablePadding: true,
    label: "Estudios",
    width: 80,
  },
  {
    id: "resident",
    numeric: false,
    disablePadding: true,
    label: "Residencia",
    width: 160,
  },
  {
    id: "source",
    numeric: false,
    disablePadding: true,
    label: "Origen",
    width: 110,
  },
  {
    id: "stateCv",
    numeric: false,
    disablePadding: true,
    label: "Estado CV",
    width: 100,
  },
];

function createData(
  similarity,
  fullname,
  experience,
  createdAt,
  education,
  resident,
  source,
  stateCv,
  data
) {
  return { similarity, fullname, experience, createdAt, education, resident, source, stateCv, data };
}
