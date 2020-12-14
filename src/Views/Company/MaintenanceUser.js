import React, {useState, useEffect} from 'react';
import { Modal, ModalBody } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { onlyLetters } from '../../utils/validation';
import NavBar from '../../Components/MenuUser/index';
import DataTable from 'react-data-table-component';
import AdminService from '../../services/admin.service';
import * as FaIcons from 'react-icons/fa';
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';
import moment from 'moment';
import { MensajeError } from './../../utils/toast'
import { MensajeExito } from './../../utils/toast'

import './index.css';

const MaintenanceUser = (props) => {

    const { handleSubmit, register, errors, formState } = useForm();
    const { isSubmitted } = formState;
    const [ account, setAccount ] = useState([]);
    const [ modalNewUser, setModalNewUser] = useState(false);
    const [ modalDeleteUser, setModalDeleteUser] = useState(false);
    const [ accountid, setAccountid ] = useState(null);
    const [see, setSee] = useState(false);

    const {register: registerDelete,errors: errorsDelete, handleSubmit: handleSubmitDelete} = useForm();

    const seePass = () => {
        setSee(!see);
    };

    // Crear
    const onSubmit = (values) => {
        const datafield = {
        email: values.mail,
        user: {
            first_name: values.first_name,
            last_name: values.last_name,
            area_input: values.area,
            cargo_input: values.cargo
            }
        }
        createUser(datafield);
    };

    // Eliminar
    const onSubmitDelete = (values,e) => {
       const id = accountid;
       const eliminar = values.delete;

        const datafield = {
            password: values.password
        }
        deleteUser(datafield,id,eliminar);
    };

    async function deleteUser(datafield,id,eliminar){
        if( eliminar === "1"){
            try{
            const responseDeleteUser = await AdminService.deleteSubUser(datafield, id);
            if(responseDeleteUser.status === 200){
                MensajeExito(responseDeleteUser.data.message);
                }
            }catch(error){
                MensajeError("No autorizado");
            } 
            setModalDeleteUser(!modalDeleteUser)
        }  else {
            setModalDeleteUser(!modalDeleteUser)
        }
    }

    async function createUser(datafield){
        try{
        const responseCreateUser = await AdminService.createUser(datafield);
        if(responseCreateUser.status === 200){
            MensajeExito( responseCreateUser.data.message);
            }
        }catch(error){
            MensajeError("Ocurrio un error interno");
        } 
        setModalNewUser(!modalNewUser)
    }

    const columns = [
        {
            name:'Persona Responsable',
            cell: row => row.user.first_name + " " +  row.user.last_name
        },
        {
            name:'Cargo',
            cell: row => row.user.cargo_input
        },
        {
            name:'Área',
            cell: row => row.user.area_input
            
        },
        {
            name:'Correo',
            cell: row => row.email
        },
        {
            name:'Fecha',
            cell: row => moment(row.createdAt).format('YYYY-MM-DD'),
            sortable: true
        },
        {
            name: 'Acción',
            cell: (row) => 
            <div>
                <button type="button" className="btn-revisar" ><FaIcons.FaPen size={24}/></button>
                <button type="button" className="btn-revisar" data-accountid={row.id}  onClick={(e)=>{setModalDeleteUser(!modalDeleteUser); setAccountid(row.id);}}><FaIcons.FaTrashAlt size={24} color="red"/></button>
            </div>       
        },
    ];

    const paginationOption={
        rowsPerPageText: 'Filas por Pagina',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos'
    } 

    useEffect( () => {
    async function listSubUser(){
        const responseAccounts = await AdminService.listSubUser();
        setAccount(responseAccounts.data.accounts);
    }
    listSubUser();
    }, [account]);

    const tablaSubUser = account;

    return (
    <>
        <NavBar />
        <div className="row row-no-magin padding-container">
        <div className="col-12 col-md-12 offset-md-3 container-no-padding m-nav-form"></div>
        <div className="col-12 col-md-12 container-no-padding mt-2">
            <div className="row justify-content-right mr-2">
                <button className="btn btn-nuevo-user" onClick={(e) => setModalNewUser(!modalNewUser)}>NUEVO USUARIO</button> 
            </div>
            <DataTable
                columns={columns}
                data={tablaSubUser}
                title="Usuario"
                pagination
                paginationComponentOptions={paginationOption}
                fixedHeader
                fixedHeaderScrollHeight="500"
            >
            </DataTable>
            </div>
        </div>

        <Modal className="modal-solicitud" isOpen={modalNewUser}>
            <ModalBody>
                <div className="row justify-content-center mt-1 mb-2">
                    <label className="title-modal">Nuevo Usuario</label>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="form-container">
                    <label htmlFor="first_name" className="label-form mt-1">
                        Nombre
                        <input
                            placeholder="Ejemplo: Pedro Luis"
                            className={`form-control input-text
                                            ${
                                            isSubmitted
                                                ? !errors.first_name
                                                ? 'input-icono'
                                                : 'border-error red-input input-icoerror'
                                                : ''
                                            }
                                        `}
                            name="first_name"
                            type="text"
                            maxLength="25"
                            onKeyPress={e =>{onlyLetters(e)}} 
                            autoComplete="off"
                            ref={register({
                            required: { value: true, message: 'Este campo es requerido' }
                            })}
                        />
                        <span className="span-error mt-1">
                            {errors.first_name && errors.first_name.message}
                        </span>
                    </label>
                    <label htmlFor="last_name" className="label-form mt-1">
                        Apellidos
                        <input
                            placeholder="Ejemplo: Chavez Flores"
                            className={`form-control input-text
                                            ${
                                            isSubmitted
                                                ? !errors.last_name
                                                ? 'input-icono'
                                                : 'border-error red-input input-icoerror'
                                                : ''
                                            }
                                        `}
                            name="last_name"
                            type="text"
                            maxLength="25"
                            onKeyPress={e =>{onlyLetters(e)}} 
                            autoComplete="off"
                            ref={register({
                            required: { value: true, message: 'Este campo es requerido' }
                            })}
                        />
                        <span className="span-error mt-1">
                            {errors.last_name && errors.last_name.message}
                        </span>
                    </label>
                    <label htmlFor="cargo" className="label-form mt-1">
                        Cargo
                        <input
                            placeholder="Ejemplo: Asistente RRHH"
                            className={`form-control input-text
                                            ${
                                            isSubmitted
                                                ? !errors.cargo
                                                ? 'input-icono'
                                                : 'border-error red-input input-icoerror'
                                                : ''
                                            }
                                        `}
                            name="cargo"
                            type="text"
                            maxLength="20"
                            onKeyPress={e =>{onlyLetters(e)}} 
                            autoComplete="off"
                            ref={register({
                            required: { value: true, message: 'Este campo es requerido' }
                            })}
                        />
                        <span className="span-error mt-1">
                            {errors.cargo && errors.cargo.message}
                        </span>
                    </label>
                    <label htmlFor="area" className="label-form mt-1">
                        Área
                        <input
                            placeholder="Ejemplo: Recursos Humanos"
                            className={`form-control input-text
                                            ${
                                            isSubmitted
                                                ? !errors.area
                                                ? 'input-icono'
                                                : 'border-error red-input input-icoerror'
                                                : ''
                                            }
                                        `}
                            name="area"
                            type="text"
                            maxLength="25"
                            onKeyPress={e =>{onlyLetters(e)}} 
                            autoComplete="off"
                            ref={register({
                            required: { value: true, message: 'Este campo es requerido' }
                            })}
                        />
                        <span className="span-error mt-1">
                            {errors.area && errors.area.message}
                        </span>
                    </label>
                    <label htmlFor="mail" className="label-form">
                        Correo Electrónico
                        <input
                            placeholder="mail@ejemplo.com"
                            className={`form-control input-text
                                                ${
                                                isSubmitted
                                                    ? !errors.mail
                                                    ? 'input-icono'
                                                    : 'border-error red-input input-icoerror'
                                                    : ''
                                                }
                                            `}
                            name="mail"
                            type="text"
                            autoComplete="off"
                            ref={register({
                            required: 'Este campo es requerido',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Coloque un email valido'
                            }
                            })}
                        />
                        <span className="span-error mt-1">
                            { errors.mail && errors.mail.message}
                        </span> 
                    </label>
                    <div className="row justify-content-center">
                        <button className="btn btn-cancelar-modal" onClick={(e) => setModalNewUser(!modalNewUser)}>Cancelar</button>
                        <button className="btn btn-aceptar-modal" type="submit">Aceptar</button>
                    </div>
                </form>
                
            </ModalBody>
        </Modal>
        

        <Modal className="modal-solicitud" isOpen={modalDeleteUser}>
            <ModalBody>
                <form onSubmit={handleSubmitDelete(onSubmitDelete)} className="form-container">
                    <div className="row justify-content-center mt-1">
                        <label className="title-modal">¿Deseas eliminar a ?</label>
                    </div>
                    <label htmlFor="delete" className="label-form-modal">
                        <div className="input-container-radio justify-content-center">
                            <div className="form-check margin-right">
                                <input 
                                    className="form-check-input"
                                    type="radio" 
                                    name="delete"
                                    value='1'
                                    ref={registerDelete({ required: "Seleccione una opción" })}
                                />
                                <label className="form-text-check">
                                    Si
                                </label>
                            </div>
                            <div className="form-check margin-right">
                                <input 
                                    className="form-check-input"
                                    type="radio" 
                                    name="delete" 
                                    value="2"
                                    ref={registerDelete({ required: "Seleccione una opción" })}
                                />
                                <label className="form-text-check">
                                    No
                                </label>
                            </div>
                        </div>
                        <span className="span-error justify-content-center">
                            { errorsDelete.delete && errorsDelete.delete.message}
                        </span>
                    </label>
                    <div className="row text-align-center">
                        <label className="title-modal">Por tu seguridad, ingresa tu contraseña para continuar.</label>
                    </div>
                    
                    <label className="label-form">
                        Contraseña
                        <div className="icon-see-container">
                            {see ? (
                            <IoIosEye className="space-icon-see" onClick={seePass} />
                            ) : (
                            <IoIosEyeOff className="space-icon-see" onClick={seePass} />
                            )}
                        </div>
                        <input
                            placeholder=".........."
                            className={`form-control placeholder
                                                ${
                                                isSubmitted
                                                    ? !errors.password
                                                    ? ''
                                                    : 'border-error red-input'
                                                    : ''
                                                }
                                            `}
                            name="password"
                            autoComplete="off"
                            type={!see ? 'password' : 'text'}
                            ref={registerDelete({
                            required: 'Este campo es requerido',
                            minLength: { value: 6, message: 'Debe contener mínimo 6 caracteres' },
                            maxLength: { value: 12, message: 'Debe contener máximo 12 caracteres' }
                            })}
                        />
                    </label>
                    <span className="span-error">
                        {errorsDelete.password && errorsDelete.password.message}
                    </span>
                    <div className="row justify-content-center mt-3">
                        <button className="btn btn-cancelar-modal" onClick={(e) => setModalDeleteUser(!modalDeleteUser)}>Cancelar</button>
                        <button className="btn btn-aceptar-modal" data-accountid={accountid} type="submit">Aceptar</button>
                    </div>
                </form>
                
                
            </ModalBody>
        </Modal>
    </>
    )
}

export default MaintenanceUser;