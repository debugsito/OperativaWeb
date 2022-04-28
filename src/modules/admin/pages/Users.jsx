import React, {useState} from 'react';
import { useDispatch } from "react-redux";
import {  Grid } from "@material-ui/core";
import { Breadcrumbs, Button, Modal, Typography ,Container} from "../../shared/components";
import { UsersTable, SearchForm ,UsersTabs } from "../components";
import { loginAs } from "../../../store/actions/auth/auth.middleware";
import { AppBar, Tabs, Tab, makeStyles } from '@material-ui/core';

const routes = [{ name: "USUARIOS", to: "/admin" }];

export default function Users() {
  const dispatch = useDispatch()
  const [openModal, setOpenModal] = useState(false)
  const [accountId, setAccountId] = useState(null)
  const [value, setValue] = useState(0);

  const hanldleLoginAs = async () => {
    await dispatch(loginAs(accountId))
    window.location.reload();
  }

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <Container >
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Breadcrumbs routes={routes} />
        </Grid>
        <Grid item xs={12} style={{ margin: "1rem" }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="body1">Consolidado de las cuentas creadas por tipo de: Empresa, Socios estratégicos y postulantes.</Typography>
            </Grid>
            <Grid item xs={12}>
              <SearchForm />
            </Grid>
            <Grid item xs={12}>
              <UsersTabs
                onChangeTab={handleChange}
                tabValue={value}
                setOpenModal={setOpenModal} 
                setAccountId={setAccountId}
              />

              
              {/* <UsersTable setOpenModal={setOpenModal} setAccountId={setAccountId}/> */}
            </Grid>
            <Modal open={openModal} handleCloseModal={() => setOpenModal(false)}>
                  <h3 id="simple-modal-title">¿Está seguro de entrar como este usuario seleccionado?</h3>
                  <Grid item xs={12}>
                      <Grid container spacing={3} className="justify-center">
                          <Grid item>
                              <Button variant="outlined" size="large" onClick={() => setOpenModal(false)}>NO</Button>
                          </Grid>
                          <Grid item>
                              <Button variant="contained" size="large" onClick={hanldleLoginAs}>SI, ENTRAR</Button>
                          </Grid>
                      </Grid>
                  </Grid>
              </Modal>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
