import React, { Fragment } from "react";
import Header from "../../Components/Header/index"
import { Link } from 'react-router-dom'
import DatePicker,{registerLocale}from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css'
import es from 'date-fns/locale/es';
import './index.css';

registerLocale("es", es);

const onlyNumbers= (e)=> {
    let key = window.event ? e.which : e.keyCode;
        if (key < 48 || key > 57) {
        e.preventDefault();
}
}
const ProfileAdress = () => { 
    const [startDate, setStartDate] = React.useState('');
    
    return (
        <Fragment>
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                <div>
                    <h1 className='h1-title-form'>COMPLETA TU REGISTRO</h1>
                </div>
                <h1 className='h1-form'>Completa tu registro</h1>
                <form className='form-container-info'>
                    <label className="label-form">
                        Dirección
                        <input
                            placeholder ="Av. Grau 123" 
                            className="form-control placeholder"                               
                            id='register-adress'
                            name='register-adress'
                            type="text"
                            autoComplete="off"
                        />
                    </label>
                    <label className="label-form" >
                        Departamento
                        <select 
                            class="form-control form-text-check-adress"
                            id="department"
                            >
                            <option>option</option>
                            <option>option</option>
                            <option>option</option>
                            <option>option</option>
                            <option>option</option>
                        </select>
                    </label>                   
                     <label className="label-form" >
                        Provincia
                        <select 
                            class="form-control form-text-check-adress"
                            id="province"
                            >
                            <option>option</option>
                            <option>option</option>
                            <option>option</option>
                            <option>option</option>
                            <option>option</option>
                        </select>
                    </label>
                    <label className="label-form" >
                        Distrito
                        <select 
                            class="form-control form-text-check-adress"
                            id="district"
                            >
                            <option>option</option>
                            <option>option</option>
                            <option>option</option>
                            <option>option</option>
                            <option>option</option>
                        </select>
                    </label>
                    <label className="label-form mt-2">
                        Teléfono
                        <input
                            placeholder="123 123 123"
                            className="form-control placeholder mb-2"
                            id='lastName'
                            name='lastName'
                            type="text"
                            onKeyPress={e =>{onlyNumbers(e)}} 
                        />
                    </label>
                    <label className="label-form mt-2">         
                        Situación familiar
                        <div class="form-check my-2">
                            <input class="form-check-input"
                             type="radio" 
                             name="family" 
                             id="single" 
                             value="option1"
                             checked/>
                            <label class="form-text-check mb-2" for="exampleRadios1">
                                Soltero
                            </label>
                        </div>
                        <div class="form-check mb-3">
                            <input class="form-check-input"
                             type="radio" 
                             name="family" 
                             id="married" 
                             value="option2"
                             required=""
                             checked/>
                            <label class="form-text-check" for="exampleRadios1">
                                Casado
                            </label>
                        </div>
                        <div class="form-check mb-3">
                            <input class="form-check-input"
                             type="radio" 
                             name="family" 
                             id="divorced" 
                             value="option3"
                             required=""
                             checked/>
                            <label class="form-text-check" for="exampleRadios1">
                                Divorciado
                            </label>
                        </div>
                        <div class="form-check mb-3">
                            <input class="form-check-input"
                             type="radio" 
                             name="family" 
                             id="cohabiting" 
                             value="option2"
                             required=""
                             checked/>
                            <label class="form-text-check" for="exampleRadios1">
                                Conviviente
                            </label>
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

export default ProfileAdress
