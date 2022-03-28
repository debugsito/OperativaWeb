import React, { useState, useEffect, useContext } from "react";
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
import { SessionRoutes } from "../../../shared/libs/sessionRoutes";
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import { DialogSendMessages } from "../";
import { DialogImbox } from "../";
import { useParams } from "react-router-dom";
import { getPostulantsByPublicationId } from "../../../../store/actions/dashboard/dashboard.action";

//Images,icon
import IconButton from "@material-ui/core/IconButton";
import EmailIcon from "@material-ui/icons/Email";
import { DoneIcon, AlertIcon } from "../../images";
import { service_Dashboard } from "../../../../store/services";

//Context || conts
import { ContextNotification } from "../../context/NotificationAlertContext";
import { POSTULANTS, MESSAGE_STATUS } from "../../constants/Dashboard";
import { messageSuccessful, messageError } from "../../utils/notification";

//actions
import { setPostulantSelected } from "../../../../store/actions/dashboard/dashboard.action";

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

export default function TableListPostulants({ selected, setSelected, handleClickCheckbox, handleSelectAllClick }) {
  const classes = useStyles();
  const dispatch = useDispatch()
  const { postulantsByPublicationId, sent_message } = useSelector(state => state?.dashboard)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const initRoute = SessionRoutes().initRoute;
  // const [selected, setSelected] = useState([]);
  const [postulants, setPostulants] = useState([]);
  const [openModal, setOpenModal] = useState(false)
  const [openImbox, setOpenImbox] = useState(false)

  // const publication_id = publicationSelected.data.id;
  const { publication_id } = useParams();

  const { notification, setNotification} = useContext(ContextNotification)

  useEffect(() => {
    dispatch(getPostulantsByPublicationId({ publication_id, params: { estado: POSTULANTS.inProgress, page, size: rowsPerPage } }))
  }, [])

  useEffect(() => {
    if(sent_message.status === MESSAGE_STATUS.success.status)
      dispatch(getPostulantsByPublicationId({ publication_id, params: { estado: POSTULANTS.inProgress, page, size: rowsPerPage } }))
  }, [sent_message])

  useEffect(() => {
    if (postulantsByPublicationId.rows) {
      const rows = postulantsByPublicationId?.rows?.map(item => ({
        similarity: item.similarity,
        fullname: item.user.first_name + " " + item.user.last_name,
        messages: item.all_messages,
        stateOfEvaluations : [
          { text: "Preguntas", status: item.technical_test },
          { text: "Verificativa", status: item.verificativa },
          { text: "Médico", status: item.medical_test },
          { text: "Evaluativa", status: item.evaluativa },
          { text: "Entrevista", status: item.interviewed },
        ],
        data: item
      }))
      setPostulants(rows)
    }
  }, [postulantsByPublicationId.rows])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    dispatch(getPostulantsByPublicationId({ publication_id, params: { estado: POSTULANTS.inProgress, page: newPage, size: rowsPerPage } }));
  };

  const handleChangeRowsPerPage = (event) => {
    const rowsPerPageTemp = parseInt(event.target.value, 10)
    setRowsPerPage(rowsPerPageTemp);
    setPage(0);
    dispatch(getPostulantsByPublicationId({ publication_id, params: { estado: POSTULANTS.inProgress, page, size: rowsPerPageTemp } }));
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectPostulant = () => {
    const body = selected.map(item => ({publication_account_id: item}))
    service_Dashboard.hireApplicant(body,publication_id)
    .then(() => {
      setSelected([]);
      dispatch(getPostulantsByPublicationId({ publication_id, params: { estado: POSTULANTS.inProgress, page, size: rowsPerPage } }))
      setNotification({ ...notification, ...messageSuccessful("Dirigase a la pestaña FINALISTA") })
    })
    .catch(error => {
      setNotification({ ...notification, ...messageError() })
    })
  }

  const handleDismissPostulant = () => {
    const body = selected.map(item => ({publication_account_id: item}))
    service_Dashboard.denyApplicant(body,publication_id)
    .then(() => {
      setSelected([]);
      dispatch(getPostulantsByPublicationId({ publication_id, params: { estado: POSTULANTS.inProgress, page, size: rowsPerPage } }))
      setNotification({ ...notification, ...messageSuccessful("Dirigase a la pestaña DESCARTADO") })
    })
    .catch(error => {
      setNotification({ ...notification, ...messageError() })
    })
  }

  const handleGetMessage = (id, totalMessages) => {
    if(totalMessages > 0){
      dispatch(setPostulantSelected([id]))
      setOpenImbox(true)
    }
  }

  // const emptyRows = rowsPerPage - Math.min(rowsPerPage, postulants?.length - page * rowsPerPage);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, postulants?.length);
  const isSelected = (id) => selected.indexOf(id) !== -1;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {selected?.length > 0 && (
          <EnhancedTableToolbar 
            numSelected={selected?.length} 
            handleSelectPostulant={handleSelectPostulant}
            handleDismissPostulant={handleDismissPostulant}
          />
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
              onSelectAllClick={(e) => handleSelectAllClick(e, postulants)}
              numSelected={selected?.length}
              rowCount={postulants?.length}
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
                        padding="none"
                        align="left"
                      >
                        <Grid item xs={12}>
                          {/* <LinkRouter 
                          to={`/lista-de-postulantes/${row.data.user_id}/perfil`}
                          to={{
                            pathname: `${initRoute}/lista-de-postulantes/${row.data.user.account_id}/perfil`,
                            state: {publication_id}
                          }}
                          >
                            <b>{row.fullname}</b>
                          </LinkRouter> */}
                            <b>{row.fullname}</b>
                        </Grid>
                      </TableCell>
                      <TableCell id={labelId} scope="row" padding="none">
                        <Grid item xs={12}>
                          <div className="align-items-center">
                            <ToolTip
                              title={
                                row.messages === 0
                                  ? "Enviar mensaje"
                                  : "Ver mensajes"
                              }
                            >
                              <IconButton
                                aria-label="mensajes"
                                color={
                                  row.messages === 0 ? "default" : "inherit"
                                }
                                onClick={() => handleGetMessage(row.data.id, row.messages)}
                              >
                                <EmailIcon />
                              </IconButton>
                            </ToolTip>
                            <Typography variant="body2">
                              {row.messages}
                            </Typography>
                          </div>
                        </Grid>
                      </TableCell>

                      <TableCell id={labelId} scope="row" padding="normal">
                        <Grid item xs={12}>
                          <div className={classes.chips}>
                            {row.stateOfEvaluations.map((item, index) => (
                              <div className={classes.chip} key={index}>
                                <img
                                  src={item.status ? DoneIcon : AlertIcon}
                                  alt="icon"
                                />
                                <Typography variant="body2">
                                  {item.text}
                                </Typography>
                              </div>
                            ))}
                          </div>
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
    disablePadding: true,
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
    id: "messages",
    numeric: false,
    disablePadding: true,
    label: "Mensajes",
    width: 80,
  },
  {
    id: "stateOfEvaluations",
    numeric: false,
    disablePadding: false,
    label: "Estado de las evaluaciones",
  },
];
