import React, { useState } from "react";
import { Link } from "react-router-dom";
import { InputAdornment, Grid, MenuItem, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import ProviderFilter, { Context } from "../context/AdvanceFilterContext";
import AdvanceFilter from "../components/AdvanceFilter";
import {
  ApplicantsTabs,
  DialogSendMessages,
  DrawerFilter,
} from "../components";
import {
  Button,
  Breadcrumbs,
  Container,
  MenuList,
  TextInput,
  TitlePage,
  Typography,
  ToolTip,
} from "../../shared/components";
import { SessionRoutes } from "../../shared/libs/sessionRoutes";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
//Images, icons
import TuneIcon from "@material-ui/icons/Tune";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SearchIcon from "@material-ui/icons/Search";

const TAB = {
  POSTULANT: 0,
  POSTULANT_IN_PROCESS: 1,
  POSTULANT_FINALISTS: 2,
  POSTULNAT_DISCARDED: 3,
};
const useStyles = makeStyles((theme) => ({
  searchField: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    paddingLeft: 5,
    paddingRight: 10,
  },
}));
export default function JobPositionCreatedPage() {
  const classes = useStyles();
  const [value, setValue] = useState(TAB.POSTULANT);
  const [selected, setSelected] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openModalFill, setOpenModalFill] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const history = useHistory();
  const initRoute = SessionRoutes().initRoute;
  const routes = [
    { name: "Inicio", to: `${initRoute}` },
    { name: "Postulantes", to: `${initRoute}/lista-de-postulantes` },
  ];

  const handleChange = (newValue) => {
    setValue(newValue);
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

  const handleSelectAllClick = (event, postulants) => {
    if (event.target.checked) {
      const newSelecteds = postulants.map((n) => n.data.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleToggle = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = (type) => {
    if (type === "dialog_empty") {
      setOpenModal(true);
    } else if (type === "dialog_fill") {
      setOpenModalFill(true);
    }
    setAnchorEl(null);
  };

  const handleOpenDrawer = () => {
    console.log("hice click");
    setOpenDrawer(true);
  };

  return (
    <ProviderFilter>
      <Container>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12}>
            <Breadcrumbs routes={routes} />
          </Grid>
          <Grid item xs={12}>
            <TitlePage
              description={
                <>
                  <b>Creado por: </b> Marco Antonio Pérez Diaz
                </>
              }
              handleClick={() => history.push(initRoute)}
            >
              Motorizados
            </TitlePage>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              <b>
                Filtrar los postulantes que hagan match con tu requerimiento.
              </b>
            </Typography>
            <ul>
              <li>
                <Typography variant="body1">
                  Filtrar los postulantes que hagan match con tu requerimiento.
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  Puedes contactar a tu postulantes o postulantes
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  Asigna las evaluaciones a los postulantes que cumplan con tu
                  requerimiento
                </Typography>
              </li>
            </ul>
          </Grid>
          {value === TAB.POSTULANT && (
            <>
              <Grid item xs={4}>
                <Paper className={classes.searchField}>
                  <IconButton type="submit" aria-label="search">
                    <SearchIcon />
                  </IconButton>
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Buscar por nombre, experiencia o palabra clave"
                    fullWidth
                  />
                </Paper>

                {/* <TextInput
                                fullWidth
                                size="small"
                                label="Buscar por nombre, experiencia o palabra clave"
                                type="search"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            /> */}
              </Grid>
              <Grid item xs={8} className="justify-end">
                <Button
                  startIcon={<TuneIcon />}
                  size="large"
                  variant="contained"
                  color="secondary"
                  onClick={handleOpenDrawer}
                >
                  Filtro avanzado
                </Button>
              </Grid>
            </>
          )}

          {value === TAB.POSTULANT && (
            <Grid item xs={12}>
              
              <AdvanceFilter />
            </Grid>
          )}

          {value === TAB.POSTULANT_IN_PROCESS && (
            <Grid item xs={12}>
              <Grid container spacing={2} justify="flex-end">
                <Grid item>
                  {selected.length > 0 ? (
                    <div>
                      <Button
                        endIcon={<ExpandMoreIcon />}
                        size="large"
                        variant="outlined"
                        aria-controls="menu-send-message"
                        aria-haspopup="true"
                        onClick={handleToggle}
                      >
                        ENVIAR MENSAJE
                      </Button>
                      <MenuList anchorEl={anchorEl} handleClose={handleClose}>
                        <MenuItem
                          onClick={() => handleOpenModal("dialog_empty")}
                        >
                          Personalizado
                        </MenuItem>
                        <MenuItem
                          onClick={() => handleOpenModal("dialog_fill")}
                        >
                          De agradecimiento
                        </MenuItem>
                      </MenuList>
                    </div>
                  ) : (
                    <ToolTip title="Seleccione uno o mas usuarios">
                      <Button
                        endIcon={<ExpandMoreIcon />}
                        size="large"
                        variant="outlined"
                      >
                        CONTACTAR
                      </Button>
                    </ToolTip>
                  )}
                </Grid>
                <Grid item>
                  <Button
                    size="large"
                    variant="contained"
                    component={Link}
                    to={`${initRoute}/asignar-evaluaciones`}
                  >
                    ASIGNAR EVALUACIONES
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          )}
          <Grid item xs={12}>
            <ApplicantsTabs
              onChangeTab={handleChange}
              tabValue={value}
              selected={selected}
              handleClickCheckbox={handleClickCheckbox}
              handleSelectAllClick={handleSelectAllClick}
            />
          </Grid>
        </Grid>
        <DialogSendMessages
          open={openModal}
          onClose={() => setOpenModal(false)}
        />
        <DialogSendMessages
          open={openModalFill}
          onClose={() => setOpenModalFill(false)}
          fill
        />
        <DrawerFilter
          openDrawer={openDrawer}
          handleClose={() => setOpenDrawer(false)}
        />
      </Container>
    </ProviderFilter>
  );
}
