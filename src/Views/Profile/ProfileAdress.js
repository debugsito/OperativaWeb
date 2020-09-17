import React, { Fragment, useEffect, useState } from "react";
import NavBar from "../../Components/MenuUser/index"
import { Link, withRouter } from 'react-router-dom'
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
        props.history.push('/info-experiencia')
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
                    return listDepartament
        }, [])

        const [listprovinciaBase, setListprovinciaBase]= useState([])
        useEffect(() => {
            fetch('json/provincias.json')
                .then(response => response.json())
                    .then(datos => {
                        
                        setListprovinciaBase(datos)
                    })
                    return listProvince
        }, [])
        const [listdistritoBase, setListdistritoBase]= useState([])
        useEffect(() => {
            fetch('json/distritos.json')
                .then(response => response.json())
                    .then(datos => {
                       
                        setListdistritoBase(datos)
                    })
                    return listDistrict
        }, [])

    //BOTTON:
    const handlerdepartamento = (e) =>{
        let id = e.target.value;
            setListProvince([])
            setListDistrict([])
            let filterProvinceData = listprovinciaBase.filter(item => item.department_id === id) 
            setListProvince(filterProvinceData)
        }
        
        //BOTTON:
        const handlerProvincia = function(e){
            let id = e.target.value;
            setListDistrict([])
            let filterDistritoData = listdistritoBase.filter(item => item.province_id === id) 
            setListDistrict(filterDistritoData)
        }
        
        return (
            <Fragment>
            <NavBar/>
            <div className="row justify-content-center row-no-magin">
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
                            className="form-control form-text-check-adress"
                            id=""
                            onChange={handlerdepartamento}>
                            
                            <option value={-1}>Option</option>
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
                     <label className="label-form" >
                        Provincia
                        <select 
                            className="form-control form-text-check-adress"
                            onChange={handlerProvincia}
                            >
                                <option value={-1}>Option</option>
                            {
                                listProvince.map((item) => (
                                <option key= {item.id} value= {item.id}>
                                    {item.name}
                                </option>
                            ))
                            }
                        </select>
                    </label>
                    <label className="label-form" >
                        Distrito
                        <select 
                            className="form-control form-text-check-adress"
                            
                            >
                                <option value={-1}>Option</option>
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
                        <div className="form-check my-2">
                            <input className="form-check-input"
                             type="radio" 
                             name="family" 
                             id="single" 
                             value="option1"
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
                             required=""
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
                             required=""
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
                             required=""
                             />
                            <label className="form-text-check" >
                                Conviviente
                            </label>
                        </div>
                    </label>
                    <section  className="container-buttons">
                        <Link
                            className="button-continue btn icon-next" 
                            type= 'submit' 
                            to="/info-experiencia"
                            >
                            CONTINUAR 
                        </Link> 
                    </section>                      
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default withRouter(ProfileAdress)
