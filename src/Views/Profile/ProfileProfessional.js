// import React, { Fragment, useEffect } from "react";
// import { Link, withRouter} from 'react-router-dom'
// import DatePicker from "react-datepicker"
// import { useForm } from "react-hook-form";
// import 'react-datepicker/dist/react-datepicker.css'
// import './index.css';


// const ProfileProfesional = (props) => { 
//     const [startDate, setStartDate] = React.useState('');
//     const [terminationDate, setTerminationDate] = React.useState('');

//     // const { handleSubmit} = useForm();
//     const { handleSubmit, register, errors} = useForm();
//     const onSubmit = (values) => { 
//         console.log(values);
//         props.history.push('/informacion-completada-con-exito')
//     } 

//     const useHeadings = () => {
//         const [listHeadings , setListHeadings] = React.useState([])
//         useEffect(() => {
//             fetch('json/rubros.json')
//                 .then(response => response.json())
//                     .then(datos => {
//                         setListHeadings(datos)
//                     })
//                 }, [])
//                 return listHeadings
//             }  
//         const listHeadings= useHeadings();
//             return (
//                 <Fragment>
//                     <div className="col-12  col-md-6 offset-md-3 container-no-padding">
//                         <form name="myForm" onSubmit={handleSubmit(onSubmit)}  className='form-container-components'>
//                             <label htmlFor="workPosition" className="label-form">
//                                 Cargo
//                                 <input
//                                     placeholder ="Operario" 
//                                     className="form-control placeholder"                               
//                                     id=''
//                                     name='workPosition'
//                                     type="text"
//                                     autoComplete="off"
//                                     ref={register({
//                                         required: {value: true, message:"Este campo es requerido"},
//                                     })}
//                                 />
//                             </label>
//                             <span className="span-error">
//                                 { errors.workPosition && errors.workPosition.message}
//                             </span>
//                             <label htmlFor="registerBusiness"  className="label-form">
//                                 Empresa
//                                 <input
//                                     placeholder ="Compañia SAC" 
//                                     className="form-control placeholder"                               
//                                     id=''
//                                     name='registerBusiness'
//                                     type="text"
//                                     autoComplete="off"
//                                     ref={register({
//                                         required: {value: true, message:"Este campo es requerido"},
//                                     })}
//                                 />
//                             </label>
//                             <span className="span-error">
//                                 { errors.registerBusiness && errors.registerBusiness.message}
//                             </span>
//                             <label htmlFor="registerRubros" className="label-form" >
//                                 Rubro de interés
//                                 <select 
//                                     name='registerRubros'
//                                     className="form-control form-text-check-adress mt-2"
//                                     ref={register({ required: {value: true, message: "Seleccione una opción"} })}
//                                     id=""
//                                     >
//                                         <option value={-1}>Logística</option>
//                                         {
//                                             listHeadings.map(item =>(
//                                                 <option >{item.name}</option>
//                                             ))
//                                         }
//                                 </select>
//                             </label> 
//                             <span className="span-error">
//                                 { errors.registerRubros && errors.registerRubros.message}
//                             </span>
//                             <label htmlFor="startDate" className=" label-form mt-3">
//                                 Fecha de inicio
//                                 <div className="customDatePickerWidth">
//                                     <DatePicker 
//                                     name='startDate'
//                                     type="text"
//                                     pattern="[0-9]+"
//                                     requerid=""
//                                     selected={startDate}
//                                     autoComplete="off" 
//                                     onChange={date => setStartDate(date)}
//                                     placeholderText="DD/MM/AAAA"
//                                     locale="es"
//                                     className="form-control label-form-calen icon-calendar" 
//                                 />
//                                 </div>
//                             </label>    
//                             <label htmlFor="endDate" className=" label-form mt-3">
//                                 Fecha de cese
//                                 <div className="customDatePickerWidth">
//                                     <DatePicker 
//                                     name='endDate'
//                                     type="text"
//                                     pattern="[0-9]+"
//                                     requerid=""
//                                     selected={terminationDate}
//                                     autoComplete="off" 
//                                     onChange={date => setTerminationDate(date)}
//                                     placeholderText="DD/MM/AAAA"
//                                     locale="es"
//                                     className="form-control label-form-calen icon-calendar " 
//                                 />
//                                 </div>
//                             </label>
//                             <label htmlFor="retirement" className="label-form mt-3">
//                                 Motivo de retiro
//                                 <input
//                                     className="form-control box-style"                               
//                                     id=''
//                                     name='retirement'
//                                     type="text"
//                                     autoComplete="off"
//                                     ref={register({
//                                         required: {value: true, message:"Este campo es requerido"},
//                                     })}
//                                 />
//                             </label>
//                             <span className="span-error">
//                                 { errors.retirement && errors.retirement.message}
//                             </span>
//                             <Link
//                                 className="text-experience"
//                                 style={{
//                                     marginTop:'50px',
//                                 }}
//                                 to="/"
//                                 >
//                                 AGREGAR OTRA EXPERIENCIA
//                             </Link> 
//                             <section  className="container-buttons-form">
//                                 <Link
//                                     className="btn-cancel-form btn" 
//                                     to='/inicio'
//                                     >
//                                     CANCELAR
//                                 </Link> 
//                                 <button
//                                     className="button-continue btn icon-next" 
//                                     type= 'submit' 
//                                     >
//                                     CONTINUAR 
//                                 </button> 
//                             </section>                           
//                         </form>
//                     </div>
//                 </Fragment>

//     )
// }
// export default withRouter(ProfileProfesional) 
