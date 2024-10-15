import React, { useState, useEffect } from "react";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  makeStyles,
  Paper,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { stableSort, getComparator } from "../../../shared/utils/table.utils";
import {
  Checkbox,
  CircularProgressWithLabel,
  EnhancedTableHead,
  LinkRouter,
  ToolTip,
  Typography,
  TablePagination,
} from "../../../shared/components";
import { DialogSendMessages } from "../";
import { DialogImbox } from "../";
import { useParams } from "react-router-dom";
import { getPostulantsByPublicationId } from "../../../../store/actions/dashboard/dashboard.action";
import { POSTULANTS } from "../../constants/Dashboard";
import { DateTime } from "luxon";

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
  chips: {
    display: "grid",
    gridAutoFlow: "column",
    gridGap: "0.5rem",
  },
  chip: {
    display: "flex",
    background: "#EBEBEB",
    padding: "0.5em",
    borderRadius: "10px",
    justifyContent: "center",
    gridGap: "0.2rem",
    cursor: "pointer",
  },
}));

export default function TableListPostulants() {
  const classes = useStyles();
  const dispatch = useDispatch()
  const { postulantsByPublicationId, publicationSelected , name } = useSelector(state => state?.dashboard)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [selected, setSelected] = useState([]);
  const [postulants, setPostulants] = useState([]);
  const [openModal, setOpenModal] = useState(false)
  const [openImbox, setOpenImbox] = useState(false)

  // const publication_id = publicationSelected.data.id;
  const { publication_id } = useParams();

  useEffect(() => {
    dispatch(getPostulantsByPublicationId({ publication_id, params: { estado: POSTULANTS.hired, page, size: rowsPerPage } }))
  }, [])


  useEffect(() => {
    dispatch(getPostulantsByPublicationId({ publication_id, params: { estado: POSTULANTS.hired, page, size: rowsPerPage } }))
  }, [])

  useEffect(() => {
    if (name && name != '') {
      const query = {
        name: name
      }
      dispatch(getPostulantsByPublicationId({ publication_id, params: { estado: POSTULANTS.hired, page, size: rowsPerPage, ...query } }))
    } else {
      dispatch(getPostulantsByPublicationId({ publication_id, params: { estado: POSTULANTS.hired, page, size: rowsPerPage } }))
    }
  }, [name])

  useEffect(() => {
    if (postulantsByPublicationId.rows) {
      const rows = postulantsByPublicationId?.rows?.map(item => ({
        similarity: item?.similarity,
          fullname: item.user.fullname,
          createdAt: DateTime.fromISO(item.createdAt).toFormat("dd LLL yyyy"),
          status: item.estado == POSTULANTS.hired? "APROBADO": "--",
          data: item,
      }))
      setPostulants(rows)
    }
  }, [postulantsByPublicationId.rows])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    dispatch(getPostulantsByPublicationId({ publication_id, params: { estado: POSTULANTS.hired, page: newPage, size: rowsPerPage } }));
  };

  const handleChangeRowsPerPage = (event) => {
    const rowsPerPageTemp = parseInt(event.target.value, 10)
    setRowsPerPage(rowsPerPageTemp);
    setPage(0);
    dispatch(getPostulantsByPublicationId({ publication_id, params: { estado: POSTULANTS.hired, page, size: rowsPerPageTemp } }));
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // const emptyRows = rowsPerPage - Math.min(rowsPerPage, postulants?.length - page * rowsPerPage);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, postulants?.length);
  const isSelected = (id) => selected.indexOf(id) !== -1;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="postulantsInProgress"
            aria-label="Postulants in progress"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              headCells={headCells}
            />
            <TableBody>
              {stableSort(postulants, getComparator(order, orderBy))
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
                      <TableCell id={labelId} scope="row" padding="normal">
                        <Grid item xs={12}>
                          <CircularProgressWithLabel
                            value={row.similarity * 1}
                          />
                        </Grid>
                      </TableCell>
                      <TableCell
                        id={labelId}
                        scope="row"
                        padding="none"
                        align="left"
                      >
                        <Grid item xs={12}>
                          {row.fullname}
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
                        <Grid item xs={12} className="align-items-center">
                          {row.status}
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
          rowsPerPageOptions={[5, 10, 25]}
          count={postulants.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <DialogSendMessages
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
      <DialogImbox open={openImbox} onClose={() => setOpenImbox(false)} />
    </div>
  );
}

const headCells = [
  {
    id: "match",
    numeric: false,
    disablePadding: false,
    label: "Match",
    width: 75,
  },
  {
    id: "postulant",
    numeric: false,
    disablePadding: true,
    label: "Postulante",
    width: 200,
  },
  {
    id: "data_of_postulation",
    numeric: false,
    disablePadding: true,
    label: "Fecha de postulacion",
    width: 100,
  },
  {
    id: "status",
    numeric: false,
    disablePadding: true,
    label: "Estado",
    width: 100,
  }
];
