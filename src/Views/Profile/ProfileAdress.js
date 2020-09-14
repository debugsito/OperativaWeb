import React, { Fragment, useEffect, useState } from "react";
import NavBar from "../../Components/MenuUser/index"
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form";
import './index.css';

const onlyNumbers= (e)=> {
    let key = window.event ? e.which : e.keyCode;
        if (key < 48 || key > 57) {
        e.preventDefault();
}}
const ProfileAdress = (props) => { 
    
    const { handleSubmit} = useForm();
    
    const onSubmit = (values) => { 
        console.log(values);
    } 
    const useDepartment= () => {
        const [listDepartament, setListDepartament]= useState([])
        useEffect(() => {
            fetch('json/departamentos.json')
                .then(response => response.json())
                    .then(datos => {
                        setListDepartament(datos)
                    })
        }, [])
        return listDepartament
    }
    
    const useProvince= () => {
        const [listProvince, setListProvince]= useState([])
        
        useEffect(() => {
            fetch('json/provincias.json')
                .then(response => response.json())
                    .then(datos => {
                        setListProvince(datos)
                    })
        }, [])
        return listProvince
    }
    
    const useDistrict= () => {
        const [listDistrict, setListDistrict]= useState([])
        
        useEffect(() => {
            fetch('json/distritos.json')
                .then(response => response.json())
                    .then(datos => {
                        setListDistrict(datos)
                    })
        }, [])
        return listDistrict
    }

    const listDepartament= useDepartment();
    const listProvince= useProvince()
    const listDistrict= useDistrict()

    return (
        <Fragment>
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                <div>
                    <h1 className='h1-title-form'>COMPLETA TU REGISTRO</h1>
                </div>
                <h1 className='h1-form'>Completa tu registro</h1>
                <form name="myForm" onSubmit= { handleSubmit(onSubmit)} className='form-container-info'>
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
                            id=""
                            >
                                <option value={-1}>Option</option>
                            {
                                listDepartament.map(item =>(
                                    <option >{item.name}</option>
                                ))
                            }
                        </select>
                    </label>                   
                     <label className="label-form" >
                        Provincia
                        <select 
                            class="form-control form-text-check-adress"
                            id=""
                            >
                                <option value={-1}>Option</option>
                            {
                                listProvince.map(item =>(
                                    <option >{item.name}</option>
                                ))
                            }
                            
                        </select>
                    </label>
                    <label className="label-form" >
                        Distrito
                        <select 
                            class="form-control form-text-check-adress"
                            id=""
                            >
                                <option value={-1}>Option</option>
                            {
                                listDistrict.map((item, ) =>(
                                    <option>{item.name}</option>
                                ))
                            }
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
                            autoComplete="off"
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
                            to="/info-experiencia"
                            >
                            CONTINUAR {">"}
                        </Link> 
                    </section>                      
                    </form>
                </div>
            </div>
            <NavBar/>
        </Fragment>
    )
}

export default ProfileAdress
