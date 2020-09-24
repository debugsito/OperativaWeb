import React, { Fragment, useEffect } from "react";
import { Link, withRouter} from 'react-router-dom'
import DatePicker from "react-datepicker"
import { useForm } from "react-hook-form";
import 'react-datepicker/dist/react-datepicker.css'
import './index.css';


const ProfileProfesional = (props) => { 
    const [startDate, setStartDate] = React.useState('');
    const [terminationDate, setTerminationDate] = React.useState('');

    const { handleSubmit} = useForm();

    const onSubmit = (values) => { 
        console.log(values);
        props.history.push('/informacion-completada-con-exito')
    } 

    const useHeadings = () => {
        const [listHeadings , setListHeadings] = React.useState([])

        useEffect(() => {
            fetch('json/rubros.json')
                .then(response => response.json())
                    .then(datos => {
                        setListHeadings(datos)
                    })
                }, [])
                return listHeadings
            }  
            
            const listHeadings= useHeadings();
            return (
                <Fragment>
                    <form name="myForm" onSubmit= { handleSubmit(onSubmit)} className='form-container-components'>
                        <label className="label-form">
                            Cargo
                            <input
                                placeholder ="Operario" 
                                className="form-control placeholder"                               
                                id='register-position'
                                name='register-position'
                                type="text"
                                autoComplete="off"
                            />
                        </label>
                        <label className="label-form">
                            Empresa
                            <input
                                placeholder ="Compañia SAC" 
                                className="form-control placeholder"                               
                                id='register-business'
                                name='register-business'
                                type="text"
                                autoComplete="off"
                            />
                        </label>
                        <label className="label-form" >
                            Rubro de interés
                            <select 
                                className="form-control form-text-check-adress mt-2"
                                id=""
                                >
                                    <option value={-1}>Logística</option>
                                    {
                                        listHeadings.map(item =>(
                                            <option >{item.name}</option>
                                        ))
                                    }
                            </select>
                        </label> 
                        <label 
                        for= "nombre"
                        className=" label-form mt-3">
                            Fecha de inicio
                            <div className="customDatePickerWidth">
                                <DatePicker 
                                name='dateOfBirth'
                                type="text"
                                pattern="[0-9]+"
                                requerid=""
                                selected={startDate}
                                autoComplete="off" 
                                onChange={date => setStartDate(date)}
                                placeholderText="DD/MM/AAAA"
                                locale="es"
                                className="form-control label-form-calen icon-calendar" 
                            />
                            </div>
                        </label>    
                        <label 
                        for= "nombre"
                        className=" label-form mt-3">
                            Fecha de cese
                            <div className="customDatePickerWidth">
                                <DatePicker 
                                name='dateOfBirth'
                                type="text"
                                pattern="[0-9]+"
                                requerid=""
                                selected={terminationDate}
                                autoComplete="off" 
                                onChange={date => setTerminationDate(date)}
                                placeholderText="DD/MM/AAAA"
                                locale="es"
                                className="form-control label-form-calen icon-calendar " 
                            />
                            </div>
                        </label>
                        <label className="label-form mt-3"
                        >
                            Motivo de retiro
                            <input
                                className="form-control box-style"                               
                                id='retirement'
                                name='retirement'
                                type="text"
                                autoComplete="off"
                            />
                        </label>
                            <Link
                                className="text-experience"
                                style={{
                                    marginTop:'50px',
                                }}
                                type= 'submit' 
                                to="/"
                                >
                                AGREGAR OTRA EXPERIENCIA
                            </Link> 
                    <section  className="container-buttons-form">
                        <Link
                            className="btn-cancel-form btn" 
                            type= 'submit' 
                            to='/inicio'
                            >
                            CANCELAR
                        </Link> 
                        <button
                            className="button-continue btn icon-next" 
                            type= 'submit' 
                            >
                            CONTINUAR 
                        </button> 
                    </section>                           
                    </form>
                </Fragment>
    )
}
export default withRouter(ProfileProfesional) 
