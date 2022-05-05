import React, { useEffect, useState } from 'react';
import { DateTime } from "luxon";
import { FormControl, FormControlLabel, Grid, Radio, RadioGroup,Snackbar } from '@material-ui/core';
import { Button, DataGrid, Modal } from '../../../shared/components';
import { service_UserAdmin } from "../../../../store/services";
import { useDispatch, useSelector } from "react-redux";
import { actions_Utils } from '../../../../store/actions';
import MuiAlert from '@material-ui/lab/Alert';

import {
  Select,
  MenuItem,
}
  from '@material-ui/core';


const vertical = 'top'
const horizontal = 'right'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}



export default function DataTable() {
  const [accounts, setAccounts] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [accountId, setAccountId] = useState(null)
  const [option, setOption] = useState(null)
  const dispatch = useDispatch();
  const { utils: { plans } } = useSelector(state => state);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    dispatch(actions_Utils.getListPlans())
  }, [])

  const columns = [
    {
      field: 'role', headerName: 'Tipo', width: 120, valueGetter: (params) => {
        const { role } = params.row;
        return role === "muni" ? "Municipalidad" : "Empresa"
      }
    },
    { field: 'razon_social', headerName: 'Razón social', width: 280 },
    {
      field: 'document_number', headerName: 'RUC', sortable: false, width: 130, valueGetter: (params) => {
        const { document_number } = params.row.user;
        return document_number
      }
    },
    {
      field: 'phone', headerName: 'Teléfono', width: 110, sortable: false, valueGetter: (params) => {
        const { phone } = params.row.user;
        return phone
      }
    },
    {
      field: 'person', headerName: 'Persona responsable', width: 150, valueGetter: (params) => {
        const { fullname } = params.row.user;
        return fullname
      }
    },
    { field: 'email', headerName: 'Correo', sortable: false, width: 160 },
    { field: 'updatedAt', headerName: 'Fecha', width: 120, valueGetter: (params) => DateTime.fromISO(params.value).toFormat("yyyy-LL-dd") },
    {
      field: 'plan', headerName: 'Solicitud', width: 160, renderCell: (params) => {
        const { plan_id } = params.row.user;
        const { role } = params.row;
        if (role === 'business' && plan_id) {
          return <>
            <Select
              labelId="slect-plan_id"
              id="id-select-plan_id"
              name="plan_id"
              value={plan_id}
              // defaultValue= {row?.data?.user?.plan_i}
              onChange={(e) => handlePlanInputChange(e, params.row.id)}
              label="Plan"
            >

              {plans && plans.map(element =>
                <MenuItem key={element.id} value={element.id}>{element.name}</MenuItem>
              )}

            </Select>
          </>
        }
        return <></>
      }
    },
    {
      field: 'action', headerName: 'Accion', width: 100, sortable: false, renderCell: (params) => {
        const { id } = params.row
        return <Button color="primary" onClick={() => handleOpenModal(id)}>Revisar</Button>
      }
    },
  ];

  const handlePlanInputChange = async (e, id) => {
    let value = e.target.value;
    let indexAccount = accounts.findIndex((obj) => obj.id === id)
    let tmpAccount = [...accounts]
    let edit = tmpAccount[indexAccount]

    try {
      const response = await service_UserAdmin.editPlan(edit.user.id, { plan_id: value })
      if (response.status == 200) {
        edit.user.plan_id = value;
        tmpAccount[indexAccount] = edit;
        setAccounts(tmpAccount)
      } else {
        setOpen(true);
        setError("Ocurrion un error")
      }
    } catch (error) {
      setOpen(true);
      let tmperr = error?.response?.data?.message ? error?.response?.data?.message : 'Ocurrio un error';
      setError(tmperr);

    }
}


    useEffect(() => {
      getAccount()
    }, [])

    const getAccount = async () => {
      let response = await service_UserAdmin.getAccounts();
      setAccounts(response?.data?.data)
    }

    const handleChangeOption = (e) => {
      setOption(e.target.value)
    }

    const handleCloseModal = () => {
      setOption(null)
      setOpenModal(false)
    }

    const handleOpenModal = (account_id) => {
      setAccountId(account_id);
      setOpenModal(true)
    }

    const handleSaveOption = async () => {
      if (option == "accept") {
        await service_UserAdmin.acceptAccount({ account_id: accountId })
      } else if (option == "deny") {
        await service_UserAdmin.denyAccount({ account_id: accountId })
      }
      setOpenModal(false)
      getAccount()
    }

    const handleCloseAlert = () => {
      setOpen(false)
    }

    const bodyModal = (
      <>
        <h3 id="simple-modal-title">¿Qué acción deseas realizar?</h3>
        <FormControl component="fieldset" >
          <RadioGroup aria-label="option" name="option" value={option} onChange={handleChangeOption}>
            <FormControlLabel value="accept" control={<Radio />} label="Aprobar" />
            <FormControlLabel value="deny" control={<Radio />} label="Rechazar" />
          </RadioGroup>
        </FormControl>
        <Grid container spacing={3} direction="row" justify="center" style={{ marginTop: 5 }}>
          <Grid item >
            <Button variant="outlined" onClick={handleCloseModal}>CANCELAR</Button>
          </Grid>
          <Grid item >
            <Button variant="contained" onClick={handleSaveOption} disabled={!option}>ACEPTAR</Button>
          </Grid>
        </Grid>
      </>
    );

    return (
      <>
        <DataGrid
          rows={accounts}
          columns={columns}
          pageSize={5}
          hideFooterSelectedRowCount
          rowsPerPageOptions={[5, 10, 20]}
          autoHeight
        // rowHeight={100}
        />
        <Modal open={openModal} handleCloseModal={() => setOpenModal(false)} >
          {bodyModal}
        </Modal>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open} autoHideDuration={6000} onClose={handleCloseAlert}>
          <Alert onClose={handleCloseAlert} severity="error">
            {error}
          </Alert>
        </Snackbar>
      </>
    );
  }
