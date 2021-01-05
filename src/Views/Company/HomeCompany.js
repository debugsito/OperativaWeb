import React, {useState, useEffect}from 'react'
import NavBar from '../../Components/MenuUser/index';
import * as FaIcons from 'react-icons/fa'
import DataTable from 'react-data-table-component'
import { Link } from 'react-router-dom'
import AdminService from '../../services/admin.service';
import { MensajeError } from './../../utils/toast'
import DeletePublication from '../../Components/Modal/DeletePublication'
import Spinner from '../../Components/Spinner'
import moment from 'moment'
import 'moment/locale/es'

import './index.css'

const HomeCompany = (props) => {

    moment.locale('es')
    const [publication, setPublications ] = useState([]);
    const [business, setBusiness ] = useState({});
    
    const [modalDeleteUser, setModalDeleteUser] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [publi, setPubli] = useState({pbulications: {}})

    async function listPublications(){
        try{
            const responsePublications = await AdminService.listPublications();
            setPublications(responsePublications.data.publications);
            setBusiness(responsePublications.data.business_muni);
        }catch(error){
            MensajeError("Ocurrio un error inesperado");
        }

    }

    const paginationOption = {
     rowsPerPageText: 'Filas por Pagina',
     rangeSeparatorText: 'de',
     selectAllRowsItem: true,
     selectAllRowsItemText: 'Todos'
    }

    useEffect(() => {
        listPublications();
    }, [])

    useEffect(() => {
    if (refresh) {
      listPublications();
    }
  }, [refresh])
    
    const customStyles = {
        rows: {
            style: {
            minHeight: '72px', // override the row height
            }
        },
        headCells: {
            style: {
            paddingLeft: '8px', // override the cell padding for head cells
            paddingRight: '8px',
            },
        },
        cells: {
            style: {
            paddingLeft: '8px', // override the cell padding for data cells
            paddingRight: '8px',
            },
        },
        };

    const columns = [
        {
        name: 'Título de la publicación' ,
        cell: (row) => row.job_title
        },
        {
        name: 'Fecha de publicación',
        cell: (row) => moment(row.from_date).format('LL')
        },
        {
        name: 'Postulantes',
        cell: (row) => "-"
        },
        {
        name: 'Estado',
        cell: (row) =>  <label className="publication-status"> {row.status = 1 ? "Activo": "Inactivo"} </label> 
        },
        {
        name: 'Acción',
        cell: (row) => (
            <div>
                <button
                    type='button'
                    className='btn-revisar mb-2 mt-2'
                    onClick={() => {}}
                >
                <FaIcons.FaPen size={20} />
                <label> &nbsp;EDITAR</label>
                </button>
                <br></br>
                <button
                    type='button'
                    className='btn-revisar'
                    data-accountid={row.id}
                    onClick={(e) => {
                        setPubli(row)
                        setModalDeleteUser(true)
                    }}
                >
                <FaIcons.FaTrashAlt size={20} color='red' />
                <label> &nbsp;ARCHIVAR</label>
                </button>
            </div>
            )
        }
    ]
    
    return (
        <>
        <NavBar />
        <div className='container-central row row-no-magin padding-container'>
            <div className='col-12 col-md-12 container-no-padding m-nav-form'></div>
            <div className='col-12 col-md-12 container-no-padding mt-2'>
                <div className='row justify-content-center'>
                    <div className="col-12 mt-4">
                        <div className="card-job">
                            <div className="card-body">
                                <blockquote className="blockquote mb-0">
                                    <button type="button" className="edit-card mt-2">
                                        <span><FaIcons.FaPen size={14}/>  EDITAR</span>
                                    </button>
                                    <p className="name-company">{business.razon_social}</p>
                                    <footer className="">RUC:</footer>
                                </blockquote>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 container-no-padding mt-2 mb-2">
                        <button type="button" className="edit-card mt-2 mr-2">
                            <Link
                                className="btn btn-nuevo-user" 
                                to='/publications'
                                >
                                PUBLICAR EMPLEO
                            </Link> 
                            
                        </button>
                        <div className='row justify-content-left mt-2 mt-4 ml-2'>
                            <label className="name-company">Posiciones abiertas</label>
                        </div>

                        <DataTable
                        columns={columns}
                        data={publication}
                        pagination
                        paginationComponentOptions={paginationOption}
                        customStyles={customStyles}
                        noDataComponent= {<Spinner/>}
                        fixedHeader
                        />

                    </div>
                    
                     

                </div>
            </div>
        </div>


        <DeletePublication
            open={modalDeleteUser}
            setOpen={setModalDeleteUser}
            onModalClose={(response) => setRefresh(response)}
            publication={publi}
        />
        </>
    )
}

export default HomeCompany