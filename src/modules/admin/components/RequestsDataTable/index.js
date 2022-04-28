import React, { useEffect, useState } from 'react';
import { DateTime } from "luxon";
import { FormControl, FormControlLabel, Grid, Radio, RadioGroup } from '@material-ui/core';
import { Button, DataGrid, Modal } from '../../../shared/components';

import { service_UserAdmin } from "../../../../store/services";


export default function DataTable() {
  const [accounts, setAccounts] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [accountId, setAccountId] = useState(null)
  const [option, setOption] = useState(null)

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
      field: 'plan', headerName: 'Solicitud', width: 120, valueGetter: (params) => {
        const { plan } = params.row.user;
        if(plan) return plan.name 
        return ''
      }
    },
    {
      field: 'action', headerName: 'Accion', width: 100, sortable: false, renderCell: (params) => {
        const { id } = params.row
        return <Button color="primary" onClick={() => handleOpenModal(id)}>Revisar</Button>
      }
    },
  ];

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
    </>
  );
}
