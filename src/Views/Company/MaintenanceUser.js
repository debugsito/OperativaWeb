import React, { useState, useEffect } from 'react'
import NavBar from '../../Components/MenuUser/index'
import DataTable from 'react-data-table-component'
import AdminService from '../../services/admin.service'
import SubUser from '../../Components/Modal/SubUser'
import DeleteSubUser from '../../Components/Modal/DeleteSubUser'
import * as FaIcons from 'react-icons/fa'
import moment from 'moment'

import './index.css'

const MaintenanceUser = (props) => {
  const [account, setAccount] = useState([])
  const [modalNewUser, setModalNewUser] = useState(false)
  const [modalDeleteUser, setModalDeleteUser] = useState(false)

  const [refresh, setRefresh] = useState(false)
  const [user, setUser] = useState({user: {}})
  const [edit, setEdit] = useState();
  const [titulo, setTitulo] = useState("");

  const columns = [
    {
      name: 'Persona Responsable',
      cell: (row) => row.user.first_name + ' ' + row.user.last_name
    },
    {
      name: 'Cargo',
      cell: (row) => row.user.cargo_input
    },
    {
      name: 'Área',
      cell: (row) => row.user.area_input
    },
    {
      name: 'Correo',
      cell: (row) => row.email
    },
    {
      name: 'Fecha',
      cell: (row) => moment(row.createdAt).format('YYYY-MM-DD'),
      sortable: true
    },
    {
      name: 'Acción',
      cell: (row) => (
        <div>
          <button
            type='button'
            className='btn-revisar'
            onClick={() => {
              setUser(row)
              setModalNewUser(true)
              setEdit(1);
              setTitulo("Editar Usuario");
            }}
          >
            <FaIcons.FaPen size={24} />
          </button>
          <button
            type='button'
            className='btn-revisar'
            data-accountid={row.id}
            onClick={(e) => {
              setUser(row)
              setModalDeleteUser(true)
            }}
          >
            <FaIcons.FaTrashAlt size={24} color='red' />
          </button>
        </div>
      )
    }
  ]

  const handleUser = (e) => {
    setModalNewUser(e)
    setEdit(0);
    setUser({user: {}});
    setTitulo("Nuevo Usuario");
  }

  const paginationOption = {
    rowsPerPageText: 'Filas por Pagina',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos'
  }

  async function listSubUser() {
    const responseAccounts = await AdminService.listSubUser()
    setAccount(responseAccounts.data.accounts)
  }

  useEffect(() => {
    listSubUser()
  }, [])

  useEffect(() => {
    if (refresh) {
      listSubUser()
    }
  }, [refresh])

  const tablaSubUser = account;
  console.log(tablaSubUser);

  return (
    <>
      <NavBar />
      <div className='container-central row row-no-magin padding-container'>
        <div className='col-12 col-md-12 offset-md-3 container-no-padding m-nav-form'></div>
        <div className='col-12 col-md-12 container-no-padding mt-2'>
          <div className='row justify-content-right mr-2'>
            <button
              className='btn btn-nuevo-user'
              onClick={(e) => handleUser(!modalNewUser)}
            >
              NUEVO USUARIO
            </button>
          </div>
          <DataTable
            columns={columns}
            data={tablaSubUser}
            title='Usuario'
            pagination
            paginationComponentOptions={paginationOption}
            fixedHeader
            fixedHeaderScrollHeight='500'
          ></DataTable>
        </div>
      </div>

      <SubUser
        open={modalNewUser}
        setOpen={setModalNewUser}
        onModalClose={(response) => setRefresh(response)}
        user={user}
        edit={edit}
        titulo={titulo}
      />

      <DeleteSubUser
        open={modalDeleteUser}
        setOpen={setModalDeleteUser}
        onModalClose={(response) => setRefresh(response)}
        user={user}
      />
    </>
  )
}

export default MaintenanceUser