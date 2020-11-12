import React, { useState} from 'react';
import { Link, withRouter } from 'react-router-dom'
import { useForm, Controller } from "react-hook-form";
import DatePicker,{ registerLocale }from "react-datepicker" 
import es from 'date-fns/locale/es';
import moment from 'moment';
import ReactStars from 'react-rating-stars-component';

import UserService from '../../services/user.service';
registerLocale("es", es);

const WithExperience = (props) => { 

    const { handleSubmit, register, errors, control , formState} = useForm();
    const { isSubmitted } = formState;
    const [ demo, setDemo] = useState();

    const onSubmit = (values) => {
        
        const datafield = {
            id_account: 1,
            name_inst: values.name_inst,
            department: parseInt(values.department),
            job_level: parseInt(values.job_level),
            from_year: moment(values.from_year).format('DD/MM/YYYY'),
            to_year: moment(values.to_year).format('DD/MM/YYYY'),
            buss_travel: parseInt(values.buss_travel),
            distan_home: 0, // EN DURO
            hour_rate: parseInt(values.hour_rate),
            job_role: 0, // EN DURO
            job_sati: parseInt(values.job_sati),
            monthly_income: parseInt(values.monthly_income),
            over_time: parseInt(values.over_time),
            work_bal_life: 0, // EN DURO
            job_invol: 0, // EN DURO
            attrition: parseInt(values.attrition),
            demo: demo
        };

        console.log(datafield);
        registerJob(datafield);
    } 

    async function registerJob(datafield){
        const responseInfo = await UserService.registerUserJob(datafield);
        if(responseInfo.status === 201){
            props.history.push('/informacion-completada-con-exito')
        } else {  
            //Mensaje de error
        }
    }

    const ratingChanged = (newRating) => {
        setDemo(newRating);
        console.log(newRating);
    };

    /*
    useEffect( () => {
    async function listRubro(){
        const responseRubro = await UtilService.listRubro();
        setRubro(responseRubro.data);
    }
    listRubro();
    }, []);
    
    useEffect( () => {
    async function listJobLevel(){
        const responseJobLevel = await UtilService.listJobLevel();
        setJobLevel(responseJobLevel.data);
    }
    listJobLevel();
    }, []);

    useEffect( () => {
    async function listMotivoRetiro(){
        const responseMotivoRetiro = await UtilService.listMotivoRetiro();
        setMotivoRertiro(responseMotivoRetiro.data);
    }
    listRubro();
    }, []);
    */
    
    const onlyNumbers= (e)=> {
        let key = window.event ? e.which : e.keyCode;
            if (key < 48 || key > 57) {
            e.preventDefault();
    }}

    return (
    <>
        <form name="myForm" onSubmit={handleSubmit(onSubmit)} className=''>
            <label htmlFor="department" className="label-form mt-1">
                Cargo
                <input
                    placeholder="Ejemplo: Operador"
                    className={`form-control placeholder
                                    ${
                                    isSubmitted
                                        ? !errors.department
                                        ? 'input-icono'
                                        : 'border-error red-input input-icoerror'
                                        : ''
                                    }
                                `}
                    id="department"
                    name="department"
                    type="text"
                    autoComplete="off"
                    ref={register({
                        required: { value: true, message: 'Este campo es requerido' }
                    })}
                />
                <span className="span-error mt-1">
                    { errors.department && errors.department.message}
                </span>
            </label>
            <label htmlFor="name_inst"  className="label-form mt-1">
                Empresa
                <input
                    placeholder ="Ejemplo: Compañia SAC" 
                    className={`form-control placeholder
                        ${
                            isSubmitted ? 
                            !errors.name_inst ?
                            "input-icono"
                            : 
                            "border-error red-input input-icoerror"       
                            : ''
                        }
                    `}                                              
                    id='name_inst'
                    name='name_inst'
                    type="text"
                    autoComplete="off"
                    ref={register({
                        required: {value: true, message:"Este campo es requerido"},
                    })}
                />
                <span className="span-error mt-1">
                    { errors.name_inst && errors.name_inst.message}
                </span>
            </label>
            <label htmlFor="rubro" className="label-form mt-1" >
                Rubro
                <select 
                    className={`form-control form-text-check-adress
                        ${
                            isSubmitted ? 
                            !errors.rubro 
                            ? 'input-icono'
                            : 'border-error red-input input-icoerror'       
                            : ''
                        }
                    `} 
                    ref={register({ required: {value: true, message: "Seleccione una opción"} })}
                    id="rubro"
                    name='rubro'
                >
                <option value="">Seleccione</option>
                <option value="1">1</option>   
                </select>
                <span className="span-error mt-1">
                    { errors.rubro && errors.rubro.message}
                </span>
            </label> 
            <label htmlFor="job_level" className="label-form mt-1">
                Nivel en el trabajo
                <select 
                    className={`form-control form-text-check-adress
                        ${
                            isSubmitted ? 
                            !errors.job_level 
                            ? 'input-icono'
                            : 'border-error red-input input-icoerror'       
                            : ''
                        }
                    `}
                    name='job_level'
                    id="job_level"
                    ref={register({ required: {value: true, message: "Seleccione una opción"} })}
                >
                <option value="">Seleccione</option>    
                <option value="1">1</option>      
                </select>
                <span className="span-error mt-1">
                    { errors.job_level && errors.job_level.message}
                </span>
            </label> 
            <div className="row row-no-magin">
                <div className="col-12 col-md-6 pr-md-4 pl-md-0 px-sm-0 px-xs-0 mb-2">
                    <label htmlFor="from_year" className=" label-form">
                    Fecha de inicio
                    <section className="customDatePickerWidth">
                        <Controller
                            control={control}
                            name="from_year"
                            defaultValue=""
                                render={(props) => (
                                    <DatePicker
                                        className={`form-control label-form-calen icon-calendar
                                            ${
                                                isSubmitted ? 
                                                !errors.from_year ?
                                                ""
                                                : 
                                                "border-error red-input"       
                                                : ''
                                            }
                                        `}  
                                        placeholderText="Mes/Año"
                                        selected={props.value}
                                        onChange={(e) => props.onChange(e)}
                                        dateFormat="MM/yyyy"
                                        locale={es}
                                        maxDate={new Date()}
                                        showMonthYearPicker
                                        name ="from_year" 
                                    />
                                )}
                            rules={{
                                required: 'Coloque una fecha válida'
                            }}
                        />   
                    </section>
                        <span className="span-error mt-1">
                            { errors.from_year && errors.from_year.message}
                        </span>
                    </label>
                </div>
                <div className="col-12 col-md-6 pl-md-4 pr-md-0 px-sm-0 px-xs-0 mb-2">
                    <label htmlFor="to_year" className=" label-form" >
                    Fecha de fin
                    <section className="customDatePickerWidth">
                        <Controller
                            control={control}
                            name="to_year"
                            defaultValue=""
                                render={(props) => (
                                    <DatePicker
                                        className={`form-control label-form-calen icon-calendar
                                            ${
                                                isSubmitted ? 
                                                !errors.to_year ?
                                                ""
                                                : 
                                                "border-error red-input"       
                                                : ''
                                            }
                                        `}  
                                        placeholderText="Mes/Año"
                                        selected={props.value}
                                        onChange={(e) => props.onChange(e)}
                                        dateFormat="MM/yyyy"
                                        locale={es}
                                        maxDate={new Date()}
                                        showMonthYearPicker
                                        name ="to_year" 
                                    />
                                )}
                            rules={{
                                required: 'Coloque una fecha válida'
                            }}
                        />   
                    </section>
                    <span className="span-error mt-1">
                        { errors.to_year && errors.to_year.message}
                    </span>
                </label>
                </div>
            </div>
            <label htmlFor="hour_rate" className="label-form mt-1">
                Promedio de horas a la semana
                <input
                    placeholder ="Ejemplo: 40" 
                    className={`form-control placeholder
                        ${
                            isSubmitted ? 
                            !errors.hour_rate ?
                            "input-icono"
                            : 
                            "border-error red-input input-icoerror"       
                            : ''
                        }
                    `}                                         
                    id='hour_rate'
                    name='hour_rate'
                    maxLength='2'
                    onKeyPress={e =>{onlyNumbers(e)}}
                    type="text"
                    autoComplete="off"
                    ref={register({
                        required: {value: true, message:"Este campo es requerido"},
                    })}
                />
                <span className="span-error mt-1">
                    { errors.hour_rate && errors.hour_rate.message}
                </span>
            </label>
            <label htmlFor="monthly_income" className="label-form mt-1">
                Ingresos mensual
                <input
                    placeholder ="Ejemplo: 1000" 
                    className={`form-control placeholder
                        ${
                            isSubmitted ? 
                            !errors.monthly_income ?
                            "input-icono"
                            : 
                            "border-error red-input input-icoerror"       
                            : ''
                        }
                    `}                                         
                    id='monthly_income'
                    name='monthly_income'
                    type="text"
                    maxLength='4'
                    onKeyPress={e =>{onlyNumbers(e)}} 
                    ref={register({
                        required: {value: true, message:"Este campo es requerido"},
                    })}
                />
                <span className="span-error mt-1">
                    { errors.monthly_income && errors.monthly_income.message}
                </span>
            </label>
            <label htmlFor="job_sati" className="label-form mt-1">
                Nivel de satisfacción en el trabajo
                <div className= "input-container-radio mt-2">
                    <div className="form-check margin-right">
                        <input 
                            className="form-check-input"
                            type="radio" 
                            name="job_sati" 
                            value="1"
                            ref={register({ required: "Seleccione una opción" })}
                        />
                        <label className="form-text-check">
                            1
                        </label>
                    </div>
                    <div className="form-check margin-right">
                        <input 
                            className="form-check-input"
                            type="radio" 
                            name="job_sati" 
                            value="2"
                            ref={register({ required: "Seleccione una opción" })}
                        />
                        <label className="form-text-check">
                            2
                        </label>
                    </div>
                    <div className="form-check margin-right">
                        <input 
                            className="form-check-input"
                            type="radio" 
                            name="job_sati" 
                            value="3"
                            ref={register({ required: "Seleccione una opción" })}
                        />
                        <label className="form-text-check">
                            3
                        </label>
                    </div>
                    <div className="form-check margin-right">
                        <input 
                            className="form-check-input"
                            type="radio" 
                            name="job_sati" 
                            value="4"
                            ref={register({ required: "Seleccione una opción" })}
                        />
                        <label className="form-text-check">
                            4
                        </label>
                    </div>
                    <div className="form-check margin-right">
                        <input 
                            className="form-check-input"
                            type="radio" 
                            name="job_sati" 
                            value="5"
                            ref={register({ required: "Seleccione una opción" })}
                        />
                        <label className="form-text-check">
                            5
                        </label>
                    </div>
                </div>
                <span className="span-error mt-1">
                    { errors.job_sati && errors.job_sati.message}
                </span>
            </label>
            <label htmlFor="over_time" className="label-form mt-1">
                ¿Realizaste sobre tiempo?
                <div className= "input-container-radio mt-2">
                    <div className="form-check margin-right">
                        <input 
                            className="form-check-input"
                            type="radio" 
                            name="over_time"
                            value="1"
                            ref={register({ required: "Seleccione una opción" })}
                        />
                        <label className="form-text-check">
                            Si
                        </label>
                    </div>
                    <div className="form-check margin-right">
                        <input 
                            className="form-check-input"
                            type="radio" 
                            name="over_time" 
                            value="0"
                            ref={register({ required: "Seleccione una opción" })}
                        />
                        <label className="form-text-check">
                            No
                        </label>
                    </div>
                </div>
                <span className="span-error">
                    { errors.over_time && errors.over_time.message}
                </span>
            </label>
            <label htmlFor="attrition" className="label-form mt-1">
                Motivo de retiro
                <select 
                    className={`form-control form-text-check-adress mt-2
                                    ${
                                        isSubmitted ? 
                                        !errors.attrition ?
                                        ""
                                        : 
                                        "border-error red-input "       
                                        : ''
                                    }
                                `}
                    name='attrition'
                    id="attrition"
                    ref={register({ required: {value: true, message: "Seleccione una opción"} })}
                >
                <option value="">Seleccione</option>
                <option value="1">1</option>      
                </select>
                <span className="span-error mt-1">
                    { errors.attrition && errors.attrition.message}
                </span>
            </label>
            <label htmlFor="nivel" className="label-form mt-1">
                Nivel de participación en el trabajo
                <section className="mt-2">
                <Controller
                    control={control}
                    name='nivel'
                    defaultValue=""
                    id='nivel'
                    render={(props) => (
                        <ReactStars
                            className={`mt-2`}
                            count={5}
                            onChange={ratingChanged}
                            size={25}
                            activeColor="#ffd700"
                        />
                    )}
                />
                </section>

            </label>
            <Link className="text-experience" to="/">
                AGREGAR OTRA EXPERIENCIA
            </Link>
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
    </>
)

}

export default withRouter(WithExperience);