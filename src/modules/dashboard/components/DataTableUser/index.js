import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Toolbar, Tooltip, IconButton } from '@material-ui/core';

import SubUserModal from "../SubUserModal";
import DeleteSubUserModal from "../DeleteSubUserModal"
import { Button, DataGrid } from '../../../shared/components';

import { service_Subuser_Business } from "../../../../store/services";


const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: "white",
        backgroundColor: "#46A9D4",
      }
      : {
        color: "white",
        backgroundColor: "#46A9D4",
      },
  especial: {
    color: "white",
    fontSize: "1.1rem"
  },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = ({ returnFromToolbar, ...props }) => {
  const classes = useToolbarStyles();
  const { numSelected, rowIds } = props;
  const [openModalDeleteSubUserModal, setOpenDeleteSubUserModal] = useState(false)

  const DeleteSubUser = () => {
    setOpenDeleteSubUserModal(true)

  }
  const executeAction = async (password) => {
    try {
      let response = await service_Subuser_Business.deleteSubUser({ users: rowIds, password: password });
      if (response) {
        returnFromToolbar(true)
      }
    } catch (error) {
      returnFromToolbar(false)
      if (error.response.status === 401) {
      } else {
        console.log("Ha ocurrido un error interno.");
      };
    }
    setOpenDeleteSubUserModal(false);
  }

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete" className={classes.especial} onClick={() => DeleteSubUser()}>
            <DeleteIcon /> ELIMINAR
          </IconButton>
        </Tooltip>
      ) : (
        ""
      )}
      <DeleteSubUserModal open={openModalDeleteSubUserModal} handleCloseModal={() => setOpenDeleteSubUserModal(false)} executeAction={executeAction} />
    </Toolbar>

  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  selected: PropTypes.number.isRequired
};

export default function DataTable() {
  const [accounts, setAccounts] = useState([])
  const [openSubUserModal, setOpenSubUserModal] = useState(false)
  const [selected, setSelected] = useState([]);

  const columns = [
    {
      field: 'role', headerName: 'Usuario', width: 120, valueGetter: (params) => {
        const { role } = params.row;
        return role === "muni" ? "Muncipalidad" : "Empresa"
      }
    },
    {
      field: 'person', headerName: 'Persona responsable', width: 150, valueGetter: (params) => {
        const { fullname } = params.row.user;
        return fullname
      }
    },
    {
      field: 'cargo', headerName: 'Cargo', width: 130, valueGetter: (params) => {
        const { cargo_input } = params.row.user;
        return cargo_input
      }
    },
    {
      field: 'area', headerName: 'Area', width: 160, valueGetter: (params) => {
        const { area_input } = params.row.user;
        return area_input
      }
    },
    { field: 'email', headerName: 'Correo', width: 160 },
    { field: 'createdAt', headerName: 'Fecha', width: 160 },
  ];

  useEffect(() => {
    getAccount()
  }, [])

  const getAccount = async () => {
    let response = await service_Subuser_Business.getSubUsers();
    setAccounts(response?.data?.data)
  }

  const newSubUser = () => {
    setOpenSubUserModal(true)
  }

  const returnFromToolbar = async (res) => {
    if (res) {
      getAccount();
      setSelected([])
    }
  }

  const executeAction = async (value) => {
    try {
      let response = await service_Subuser_Business.createSubUser(value);
      if (response) {
        getAccount();
      }
    } catch (error) {
      if (error.response.status === 401) {
      } else {
        console.log("Ha ocurrido un error interno.");
      };
    }
    setOpenSubUserModal(false);
  }

  return (
    <>
      <Grid container justify="flex-end" spacing={3} style={{ padding: 10 }}>
        <Grid item >
          <Button variant="contained" size="large" onClick={newSubUser}>Nuevo Usuario</Button>
        </Grid>
      </Grid>
      <div style={{ height: 400, width: '100%', background: "white" }}>
        <EnhancedTableToolbar numSelected={selected.length} rowIds={selected} returnFromToolbar={returnFromToolbar} />
        <DataGrid rows={accounts} columns={columns} pageSize={10} checkboxSelection={true} rowsPerPageOptions={[5, 10, 20]} onSelectionChange={(newSelection) => {
          setSelected(newSelection.rowIds);
        }} />
        <SubUserModal open={openSubUserModal} handleCloseModal={() => setOpenSubUserModal(false)} executeAction={executeAction} />
      </div>
    </>

  );
}
