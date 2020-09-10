import React, { Fragment } from "react";
import Header from "../../Components/Header/index"
import { Link } from 'react-router-dom'
import DatePicker,{registerLocale}from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css'
import es from 'date-fns/locale/es';
import './index.css';

registerLocale("es", es);

const ProfileInfo = () => { 
    const [startDate, setStartDate] = React.useState('');
    
    return (
        <Fragment>
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                <div>
                    <h1 className='h1-title-form'>COMPLETA TU REGISTRO</h1>
                </div>
                <h1 className='h1-form'>Datos Personales</h1>
                <form className='form-container-info'>
                    <label className="label-form">
                        Nombres
                        <input
                            placeholder ="Maria" 
                            className="form-control placeholder"                               
                            id='firstName'
                            name='firstName'
                            type="text"
                            autoComplete="off"
                        />
                    </label>
                    <label className="label-form mt-1">
                        Apellidos
                        <input
                            placeholder="Pérez"
                            className="form-control placeholder mb-2"
                            id='lastName'
                            name='lastName'
                            type="text"
                        />
                    </label>
                    <label className="label-form mt-1">
                        Tipo de Documento
                        <div class="form-check my-2">
                            <input class="form-check-input"
                             type="radio" 
                             name="doc" 
                             id="dni" 
                             value="option1" 
                             checked/>
                            <label class="form-check-label label-form-text mb-2" for="exampleRadios1">
                                Dni
                            </label>
                        </div>
                        <div class="form-check mb-3">
                            <input class="form-check-input"
                             type="radio" 
                             name="doc" 
                             id="carnet" 
                             value="option2" 
                             checked/>
                            <label class="form-check-label label-form-text" for="exampleRadios1">
                                Carnet de Extranjería
                            </label>
                        </div>
                        <div class="form-check mb-3">
                            <input class="form-check-input"
                             type="radio" 
                             name="doc" 
                             id="pasaporte" 
                             value="option3" 
                             checked/>
                            <label class="form-check-label label-form-text" for="exampleRadios1">
                                Pasaporte
                            </label>
                        </div>
                        <div class="form-check mb-3">
                            <input class="form-check-input"
                             type="radio" 
                             name="doc" 
                             id="ruc" 
                             value="option4" 
                             checked/>
                            <label class="form-check-label label-form-text" for="exampleRadios1">
                                RUC
                            </label>
                        </div>
                    </label>
                    <label className="label-form mt-3">
                        Numero de documento
                        <input
                            placeholder="90627452"
                            className="form-control placeholder mb-2"
                            id='document'
                            name='document'
                            type="text"
                        />
                    </label>
                    <label 
                    for= "nombre"
                    className=" label-form mt-3">
                        Fecha de nacimiento
                        {/* <input
                            placeholder="22/06/1980"
                            className="form-control placeholder mb-2 icon-calendar"
                            id='dateOfBirth'
                            name='dateOfBirth'
                            type="text"
                        /> */}
                        <div className="contenedor">
                            <DatePicker 
                            name='dateOfBirth'
                            type="text"
                            selected={startDate} 
                            onChange={date => setStartDate(date)}
                            placeholderText="DD/MM/AAAA"
                            locale="es"
                            className="form-control label-form-calen icon-calendar" 
                        />
                        </div>
                    </label>
                    <section  className="container-buttons">
                        <Link
                            className="button-continue btn" 
                            type= 'submit' 
                            to="/"
                            >
                            CONTINUAR {">"}
                        </Link> 
                    </section>                      
                    </form>
                </div>
            </div>
            <Header/>
        </Fragment>
    )
}

export default ProfileInfo
