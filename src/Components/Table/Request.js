import React, {useState, useEffect} from 'react';
import { Modal, ModalBody } from 'reactstrap';
import NavBar from '../../Components/MenuUser/index';
import DataTable from 'react-data-table-component';
import AdminService from '../../services/admin.service';
import moment from 'moment';
import { MensajeError } from './../../utils/toast'
import { MensajeExito } from './../../utils/toast'

const Request = (props) => {

    const [ account, setAccount ] = useState([]);
    const [modalTerms, setModalTerms] = useState(false);
    const [ accountid, setAccountid ] = useState(null);
    const [stateRequest, setStateRequest] = useState(1);


    const columns = [
        {
            name:'Tipo',
            selector: 'role',
            sortable: true
        },
        {
            name:'Razon Social',
            selector: 'razon_social',
            sortable: true
        },
        {
            name:'RUC',
            selector: 'role',
            sortable: true
        },
        {
            name:'Teléfono',
            selector: 'role',
            sortable: true
        },
        {
            name:'Persona Responsable',
            selector: 'role',
            sortable: true
        },
        {
            name:'Correo',
            selector: 'email',
            sortable: true
        },
        {
            name:'Fecha',
            cell: row => moment(row.createdAt).format('YYYY-MM-DD')
        },
        {
            name: 'Acción',
            cell: (row) => <button type="button" className="btn-revisar" data-accountid={row.id}  onClick={(e) => {setModalTerms(!modalTerms); setAccountid(row.id);}}>Revisar</button>,
                            
        },
    ];

    const paginationOption={
        rowsPerPageText: 'Filas por Pagina',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos'
    } 

    useEffect( () => {
    async function listAccounts(){
        const responseAccounts = await AdminService.listAccounts();
        setAccount(responseAccounts.accounts);
    }
    listAccounts();
    }, []);

    const tablaSol = account;

    const revisar = (e) => {
        const id = e.target.dataset.accountid;
        const state = e.target.dataset.staterequest;

        const datafield = {
            account_id: id
        };

        if(state == 1){
            activateAccount(datafield);
        } 
        if(state == 2){
            denyAccount(datafield);
        }
    };

    async function activateAccount(datafield){
        try{
        const responseAccount = await AdminService.activateAccount(datafield);
        if(responseAccount.status === 200){
            MensajeExito( responseAccount.data.message);
            }
        }catch(error){
            MensajeError("Ocurrio un error interno");
        }  
    }

    async function denyAccount(datafield){
        try{
        const responseAccount = await AdminService.denyAccount(datafield);
        if(responseAccount.status === 200){
            MensajeExito( responseAccount.data.message);
            }
        }catch(error){
            MensajeError("Ocurrio un error interno");
        }  
    }

    return (
    <>
        <NavBar />
        <div className="row row-no-magin padding-container">
        <div className="col-12 col-md-6 offset-md-3 container-no-padding m-nav-form"></div>
        <DataTable
            columns={columns}
            data={tablaSol}
            title="Solicitudes"
            pagination
            paginationComponentOptions={paginationOption}
            fixedHeader
            fixedHeaderScrollHeight="500"
        >
        </DataTable>
        </div>

        <Modal className="modal-solicitud" isOpen={modalTerms}>
            <ModalBody>
                <div className="row justify-content-center mt-1 mb-2">
                    <label className="title-modal">¿Qué acción deseas realizar?</label>
                </div>
                <div className="ml-4">
                    <div className="form-check margin-right">
                        <input 
                            className="form-check-input"
                            type="radio" 
                            name="gender"
                            onChange={(e) => setStateRequest(1)}
                            value='1'
                        />
                        <label className="form-text-check">
                            Aprobar
                        </label>
                    </div>
                    <div className="form-check margin-right">
                        <input 
                            className="form-check-input"
                            type="radio" 
                            name="gender"
                            onChange={(e) => setStateRequest(2)}
                            value='2'
                        />
                        <label className="form-text-check">
                            Rechazar
                        </label>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <button className="btn btn-cancelar-modal" onClick={(e) => setModalTerms(!modalTerms)}>Cancelar</button>
                    <button className="btn btn-aceptar-modal" data-accountid={accountid} data-staterequest={stateRequest} onClick={revisar}>Aceptar</button>
                </div>
            </ModalBody>
        </Modal>
    </>
    )
}

export default Request;