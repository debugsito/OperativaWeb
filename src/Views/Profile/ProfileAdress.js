import React, { Fragment, useEffect, useState } from "react";
import NavBar from "../../Components/MenuUser/index"
import { Link, withRouter } from 'react-router-dom'
import { useForm } from "react-hook-form";
import Stepper from "./Stepper";
import './index.css';

const onlyNumbers= (e)=> {
    let key = window.event ? e.which : e.keyCode;
        if (key < 48 || key > 57) {
        e.preventDefault();
}}

const ProfileAdress = (props) => { 
    const { handleSubmit, register, errors, formState} = useForm();
    const { isSubmitted } = formState;
    const onSubmit = (values) => { 
        console.log(values);
        props.history.push('/informacion-academica')
    } 
    
    const [listDepartament, setListDepartament]= useState([])
    const [listProvince, setListProvince]= useState([])
    const [listDistrict, setListDistrict]= useState([])
        
        useEffect(() => {
            fetch('json/departamentos.json')
                .then(response => response.json())
                    .then(datos => {
                        setListDepartament(datos)
                    })
                    // return listDepartament
                    // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])

        const [listprovinciaBase, setListprovinciaBase]= useState([])
        useEffect(() => {
            fetch('json/provincias.json')
                .then(response => response.json())
                    .then(datos => {    
                        setListprovinciaBase(datos)
                    })
                    // return listProvince
                    // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])

        const [listdistritoBase, setListdistritoBase]= useState([])
        useEffect(() => {
            fetch('json/distritos.json')
                .then(response => response.json())
                    .then(datos => {
                        setListdistritoBase(datos)
                    })
                    // return listDistrict
                    // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])

    //Button:
    const handlerdepartamento = (e) =>{
        let id = e.target.value;
            setListProvince([])
            setListDistrict([])
            let filterProvinceData = listprovinciaBase.filter(item => item.department_id === id) 
            setListProvince(filterProvinceData)
        }
        
        //Button:
        const handlerProvincia = function(e){
            let id = e.target.value;
            setListDistrict([])
            let filterDistritoData = listdistritoBase.filter(item => item.province_id === id) 
            setListDistrict(filterDistritoData)
        }
        
        return (
            <Fragment>
            <NavBar/>
                <div className="row row-no-magin padding-container">
                    <div className="col-12 col-md-6 offset-md-3 container-no-padding m-nav-form">
                        <h1 className='h1-title-form'>COMPLETA TU REGISTRO</h1>
                    </div>
                    <div className="col-12 col-md-6 offset-md-3 container-no-padding mt-stepper">
                        <Stepper current = {1} />
                    </div>
                    <div className="col-12 col-md-6 offset-md-3 container-no-padding">
                        <h1 className='h1-form'>Completa tu registro</h1>
                    </div>
                    <div className="col-12  col-md-6 offset-md-3 container-no-padding">
                        <form name="myForm" onSubmit={handleSubmit(onSubmit)} className='form-container-info'>
                            <label htmlFor="adress" className="label-form">
                                Dirección
                                <input
                                    placeholder ="Av. Grau" 
                                    className={`form-control placeholder
                                        ${
                                            isSubmitted ? 
                                            !errors.adress ?
                                            "input-icono"
                                            : 
                                            "border-error red-input input-icoerror"       
                                            : ''
                                        }
                                    `} 
                                    id=''
                                    name='adress'
                                    type="text"
                                    autoComplete="off"
                                    ref={register({
                                        required: {value: true, message: "Agregue una dirección" }
                                    })}
                                />
                            </label>
                            <span className="span-error">
                                { errors.adress && errors.adress.message}
                            </span>
                            <div className="row row-no-magin ">
                                <div className="col-12 col-md-4 pr-md-4 pl-md-0 px-sm-0 px-xs-0">
                                    <label  htmlFor="departamentAdress" className="label-form" >
                                        Departamento
                                        <select 
                                            className={`form-control form-text-check-adress
                                                ${
                                                    isSubmitted ? 
                                                    !errors.departamentAdress ?
                                                    ""
                                                    : 
                                                    "border-error red-input"       
                                                    : ''
                                                }
                                            `}
                                            id=""
                                            name="departamentAdress"
                                            onChange= {handlerdepartamento}
                                            ref={register({ required: {value: true, message: "Seleccione una opción"} })}
                                            > 
                                            <option value="">Option</option>
                                            {
                                                listDepartament.map((item) => (
                                                <option key= {item.id}
                                                value= {item.id}
                                                >
                                                    {item.name}
                                                </option>
                                            ))
                                            }
                                        </select>
                                    </label>
                                    <span className="span-error">
                                        { errors.departamentAdress && errors.departamentAdress.message}
                                    </span>
                                </div>
                                <div className="col-12 col-md-4 pr-md-3 pl-md-0 px-sm-0 px-xs-0">
                                    <label htmlFor="provinceAdress" className="label-form" >
                                        Provincia
                                        <select
                                            name="provinceAdress"
                                            className={`form-control form-text-check-adress
                                                ${
                                                    isSubmitted ? 
                                                    !errors.provinceAdress?
                                                    ""
                                                    : 
                                                    "border-error red-input"       
                                                    : ''
                                                }
                                            `}
                                            onChange={handlerProvincia}
                                            ref={register({ required: {value: true, message: "Seleccione una opción"} })}
                                            >
                                                <option value="">Option</option>
                                            {
                                                listProvince.map((item) => (
                                                <option key= {item.id} value= {item.id}>
                                                    {item.name}
                                                </option>
                                            ))
                                            }
                                        </select>
                                    </label>
                                    <span className="span-error">
                                        { errors.provinceAdress && errors.provinceAdress.message}
                                    </span>
                                </div>
                                <div className="col-12 col-md-4 pl-md-2 pr-md-0 px-sm-0 px-xs-0">
                                    <label htmlFor="districtAdress" className="label-form" >
                                        Distrito
                                        <select
                                            name="districtAdress"
                                            className={`form-control form-text-check-adress
                                                ${
                                                    isSubmitted ? 
                                                    !errors.districtAdress ?
                                                    ""
                                                    : 
                                                    "border-error red-input"       
                                                    : ''
                                                }
                                            `}
                                            ref={register({ required: {value: true, message: "Seleccione una opción"} })}
                                            >
                                                <option value="">Option</option>
                                                {
                                                    listDistrict.map((item) => (
                                                    <option key= {item.id} 
                                                    value= {item.id}
                                                    >
                                                        {item.name}
                                                    </option>
                                                    ))
                                                }
                                        </select>
                                    </label>
                                    <span className="span-error">
                                        { errors.districtAdress && errors.districtAdress.message}
                                    </span>
                                </div>
                            </div> 
                            <label htmlFor="phoneDate" className="label-form mt-2">
                                Teléfono
                                <input
                                    maxLength="9"
                                    placeholder="123 123 123"
                                    className={`form-control placeholder mb-2
                                        ${
                                            isSubmitted ? 
                                            !errors.phoneDate ?
                                            "input-icono"
                                            : 
                                            "border-error red-input input-icoerror"       
                                            : ''
                                        }
                                    `}
                                    id='phoneDate'
                                    name='phoneDate'
                                    type="text"
                                    autoComplete="off"
                                    onKeyPress={e =>{onlyNumbers(e)}} 
                                    ref={register({
                                        required: "Este campo es requerido",
                                            maxLength : {
                                                value: 9,
                                                message: 'Coloque un número telefónico válido' 
                                            },
                                            minLength: {
                                                value: 9,
                                                message: 'Coloque un número telefónico válido' 
                                            }
                                    })} 
                                />
                            </label>
                            <span className="span-error">
                                    { errors.phoneDate && errors.phoneDate.message}
                            </span> 
                            <label htmlFor="family" className="label-form-2 mt-2">         
                                Situación familiar
                                <div className="container-radios">
                                    <div className="form-check my-2">
                                        <input className="form-check-input"
                                        type="radio" 
                                        name="family" 
                                        id="single" 
                                        value="option1"
                                        ref={register}
                                        />
                                        <label className="form-text-check mb-2">
                                            Soltero
                                        </label>
                                    </div>
                                    <div className="form-check mb-3">
                                        <input className="form-check-input"
                                        type="radio" 
                                        name="family" 
                                        id="married" 
                                        value="option2"
                                        ref={register}
                                        />
                                        <label className="form-text-check" >
                                            Casado
                                        </label>
                                    </div>
                                    <div className="form-check mb-3">
                                        <input className="form-check-input"
                                        type="radio" 
                                        name="family" 
                                        id="divorced" 
                                        value="option3"
                                        ref={register}
                                        />
                                        <label className="form-text-check">
                                            Divorciado
                                        </label>
                                    </div>
                                    <div className="form-check mb-3">
                                        <input className="form-check-input"
                                        type="radio" 
                                        name="family" 
                                        id="cohabiting" 
                                        value="option2"
                                        ref={
                                            register({
                                                required: "Seleccione una opción",
                                            })}
                                        />
                                        <label className="form-text-check" >
                                            Conviviente
                                        </label>
                                    </div>
                                </div>
                                <span className="span-error">
                                { errors.family && errors.family.message}
                            </span>
                            </label>
                            <section  className="container-buttons-form">
                                <Link
                                    className="btn-cancel-form btn" 
                                    to='/inicio'
                                    >
                                    CANCELAR
                                </Link> 
                                <button
                                    className="button-continue-restore btn"
                                    type="submit"
                                >
                                    <span className= "text-button-continue-restore">CONTINUAR</span>
                                    <span className="icon-next"></span>
                                </button>
                            </section>                             
                        </form>
                    </div>
                </div>
        </Fragment>
    )
}

export default withRouter(ProfileAdress)
