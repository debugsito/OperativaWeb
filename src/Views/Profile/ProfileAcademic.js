import React, { Fragment } from "react";
import NavBar from "../../Components/MenuUser/index"
import { Link, withRouter } from 'react-router-dom'
import DatePicker,{registerLocale}from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css'
import es from 'date-fns/locale/es';
import { useForm } from "react-hook-form";
import Stepper from "./Stepper";
import './index.css';

registerLocale("es", es);

const ProfileAcademic = (props) => { 
    const [startDate, setStartDate] = React.useState('');
    const { handleSubmit, register, errors} = useForm();

    const onSubmit = (values, e) => { 
        console.log(values);
        props.history.push('/info-experiencia')
    } 
    return (
        <Fragment>
            <NavBar/>
            <div className="row row-no-magin padding-container">
                <div className="col-12 col-md-6 offset-md-3 container-no-padding m-nav-form">
                    <h1 className='h1-title-form'>COMPLETA TU REGISTRO</h1>
                </div>
                <div className="col-12 col-md-6 offset-md-3 container-no-padding mt-stepper">
                    <Stepper current = {2} />
                </div>
                <div className="col-12 col-md-6 offset-md-3 container-no-padding">
                    <h1 className='h1-form'>Estudios</h1>
                </div>
                <div className="col-12  col-md-6 offset-md-3 container-no-padding">
                <form name="myForm" onSubmit={handleSubmit(onSubmit)} className=''>
                    <p className="text-form-academic">Ingresa los datos del último nivel de estudios que alcanzaste.</p>
                    <label htmlFor="registerStudies" className="label-form mt-1">         
                        Nivel máximo alcanzado
                        <div className="form-check my-2">
                            <input className="form-check-input"
                             type="radio" 
                             name="registerStudies" 
                             id="registerStudiesPrimary" 
                             value="option1"
                             autoComplete="off"
                             ref={register}
                             />
                            <label className="form-text-check mb-2">
                                Primaria completa
                            </label>
                        </div>
                        <div className="form-check mb-3">
                            <input className="form-check-input"
                             type="radio" 
                             name="registerStudies" 
                             id="registerStudiesSecundary" 
                             value="option2"
                             autoComplete="off"
                             ref={register}
                             />
                            <label className="form-text-check">
                                Secundaria completa
                            </label>
                        </div>
                        <div className="form-check mb-3">
                            <input className="form-check-input"
                             type="radio" 
                             name="registerStudies" 
                             id="registerStudiesTechnical" 
                             value="option3"
                             autoComplete="off"
                             ref={register}
                             />
                            <label className="form-text-check">
                                Estudios técnicos
                            </label>
                        </div>
                        <div className="form-check mb-3">
                            <input className="form-check-input"
                             type="radio" 
                             name="registerStudies" 
                             id="registerStudiesUniversity" 
                             value="option3"
                             autoComplete="off"
                             ref={
                                register({
                                    required: "Seleccione una opción",
                                })}
                             />
                            <label className="form-text-check">
                                Estudios universitarios
                            </label>
                        </div>
                        <span className="span-error">
                            { errors.registerStudies && errors.registerStudies.message}
                        </span>
                    </label>
                    <label htmlFor="educationalInstitution" className="label-form mt-4">
                        Institución educativa
                        <input
                            placeholder ="Colegio Fé y Alegría" 
                            className="form-control placeholder"                               
                            id='educationalInstitution'
                            name='educationalInstitution'
                            type="text"
                            autoComplete="off"
                            ref={register({
                                required: {value: true, message: "Este campo es requerido"}
                            })}
                        />
                    </label>
                    <span className="span-error">
                        { errors.educationalInstitution && errors.educationalInstitution.message}
                    </span>
                    <label htmlFor="specialty" className="label-form mt-1">
                        Especialidad
                        <input
                            placeholder="Derecho Tributario"
                            className="form-control placeholder mb-2"
                            id='specialty'
                            name='specialty'
                            type="text"
                            autoComplete="off"
                            ref={register({
                                required: "Este campo es requerido",
                                pattern: {
                                    value:  /[A-Za-z]{3}/,
                                    message: "Coloque un Nombre valido",
                                  },
                              })}
                        />
                    </label>
                    <span className="span-error">
                        { errors.specialty && errors.specialty.message}
                    </span>
                    <label 
                        htmlFor="startDate"
                        className=" label-form mt-1">
                        Fecha de inicio
                        <div className="customDatePickerWidth">
                            <DatePicker 
                            name='startDate'
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
                         htmlFor="endDate"
                        className=" label-form mt-3">
                        Fecha de fin
                        <div className="customDatePickerWidth">
                            <DatePicker 
                            name='endDate'
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

export default withRouter(ProfileAcademic)

