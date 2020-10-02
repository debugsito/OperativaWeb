import React, { Fragment } from "react";
import NavBar from "../../Components/MenuUser/index"
import { Link, withRouter } from 'react-router-dom'
import DatePicker,{registerLocale}from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css'
import es from 'date-fns/locale/es';
import { useForm, Controller } from "react-hook-form";
import Stepper from "./Stepper";
import './index.css';

registerLocale("es", es);

const ProfileAcademic = (props) => { 
    const { handleSubmit, register, errors, control} = useForm();

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
                    <label htmlFor="registerStudies" className="label-form-2 mt-1">         
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
                        <div className="form-check">
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
                    <label htmlFor="educationalInstitution" className="label-form">
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
                    <div className="row row-no-magin ">
                        <div className="col-12 col-md-6 pr-md-4 pl-md-0 px-sm-0 px-xs-0">
                        <label htmlFor="startDate" className=" label-form mt-3" >
                                Fecha de inicio
                                <section className="customDatePickerWidth">
                                    <Controller
                                        control={control}
                                        name="startDate"
                                        defaultValue=""
                                        render={(props) => (
                                            <DatePicker
                                                className="form-control label-form-calen icon-calendar"
                                                placeholderText="DD/MM/AAAA"
                                                onChange={(e) => props.onChange(e)}
                                                selected={props.value}
                                                dateFormat="dd/MM/yyyy"
                                                locale={es}
                                                showYearDropdown
                                                defaultValue=""
                                                name ="startDate"
                                                autoComplete="off"     
                                            />
                                        )}
                                                rules={{
                                                    required: 'Coloque una fecha válida'
                                                }}
                                    /> 
                                </section>
                                <span className="span-error mt-2">{ errors.startDate && errors.startDate.message}</span>
                            </label>
                        </div>
                        <div className="col-12 col-md-6 pl-md-4 pr-md-0 px-sm-0 px-xs-0">
                        <label htmlFor="endDate" className=" label-form mt-3" >
                                Fecha de fin
                                <section className="customDatePickerWidth">
                                    <Controller
                                        control={control}
                                        name="endDate"
                                        defaultValue=""
                                        render={(props) => (
                                            <DatePicker
                                                className="form-control label-form-calen icon-calendar"
                                                placeholderText="DD/MM/AAAA"
                                                onChange={(e) => props.onChange(e)}
                                                selected={props.value}
                                                dateFormat="dd/MM/yyyy"
                                                locale={es}
                                                showYearDropdown
                                                defaultValue=""
                                                name ="endDate"
                                                autoComplete="off"     
                                            />
                                        )}
                                                rules={{
                                                    required: 'Coloque una fecha válida'
                                                }}
                                    /> 
                                </section>
                                <span className="span-error mt-2">{ errors.endDate && errors.endDate.message}</span>
                            </label>
                        </div>
                    </div>
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

