import React, { Fragment } from "react";
import { Link, withRouter } from 'react-router-dom'
import { useForm } from "react-hook-form";
import NavBarOperativa from "../../Components/MenuOperativa";
import axios from "axios";
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';
import './index.css';



const Login= (props) => {
    const { handleSubmit, register, errors, formState} = useForm();
    const { isSubmitted } = formState;
    const baseUrl="https://3.136.22.230:5000";
    
    const [error, setError] = React.useState(null)
    const [see, setSee] = React.useState(false)
    
    const seePass = () => {
        setSee(!see)        
    }
    
    // const baseUrl="https://reqres.in/api/";
    // const onSubmit = (values) => { 
    //     console.log(values);
    //     let datafield = {
    //         "email": values.usuario, 
    //         "password": values.password 
    //     }
    //     axios.post(baseUrl+'login', datafield)
    //     .then((response) => {
    //         if(response.status === 200) {
    //             console.log(response.data)
    //             console.log(response.data.token)
    //             localStorage.setItem('token', response.data.token);
    //             axios.get(baseUrl+'users/2')
    //             .then((response) => {   
    //                 console.log(response.data.data) 
    //                 //Guardar Email
    //                 localStorage.setItem('email', response.data.data.email);
    //                 props.history.push('/inicio');

    //             })
    //             .catch(function(error) {
    //                 console.log()
    //             })             
    //         } else if(response.status === 401) {
    //                 alert(response.message);
    //         } else {
    //             alert("Ha ocurrido un error interno.");
    //             console.log(response.data);
    //         }
    //     })
    //     .catch(function(error) {
    //         console.log(error.status)
    //         setError('Usuario y contraseña Incorrecta')
    //         return
    //     })
    // }
    const onSubmit = (values) => { 
        console.log(values);
        let datafield = {
            "email": values.usuario, 
            "password": values.password 
        }
        axios.post(baseUrl+'/auth/login', datafield)
        .then((response) => {
            if(response.status === 200) {
                console.log(response)
                console.log(response.token)
                localStorage.setItem('token', response.token);
                axios.get(baseUrl+'/user/')
                .then((response) => {   
                    console.log(response) 
                    //Guardar Email
                    localStorage.setItem('email', response.email);
                    props.history.push('/inicio');

                })
                .catch(function(error) {
                    console.log()
                })             
            } else if(response.status === 401) {
                    alert(response.message);
            } else {
                alert("Ha ocurrido un error interno.");
                console.log(response);
            }
        })
        .catch(function(error) {
            console.log(error.status)
            setError('Usuario y contraseña Incorrecta')
            return
        })
    }
    return (
        <Fragment>
        <NavBarOperativa/>
            <div className="row justify-content-center container-padding row-no-magin">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <h1 className='h1-custom'>INICIA SESIÓN EN OPERATIVA</h1>
                    <form  className='form-container' onSubmit= { handleSubmit(onSubmit) } >
                       {
                            error ? (
                            <div className="alert alert-danger">
                                {error}
                            </div>
                            ) : null
                        }
                        <label className="label-form">
                            Correo Electrónico
                            <input
                                placeholder ="mail@ejemplo.com"                    
                                className={`form-control placeholder
                                    ${
                                        isSubmitted ? 
                                        !errors.usuario ?
                                        "input-icono"
                                        : 
                                        "border-error red-input input-icoerror"       
                                        : ''
                                    }
                                `} 
                                name="usuario"
                                type="text"
                                autoComplete="off"
                                ref={register({
                                    required: "Este campo es requerido",
                                    pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Coloque un email valido"
                                    }
                                  })}
                            />
                        </label>
                        <span className="span-error">
                            {errors.usuario && errors.usuario.message}
                        </span>
                        <label className="label-form">
                            Contraseña
                            <div className="icon-see-container">
                                {see ? 
                                    <IoIosEye className="space-icon-see" onClick={seePass}/> 
                                    :
                                    <IoIosEyeOff className="space-icon-see" onClick={seePass}/>
                                }
                            </div>
                            <input
                                placeholder=".........."
                                className={`form-control placeholder
                                    ${
                                        isSubmitted ? 
                                            !errors.password ?
                                            ""
                                            : 
                                            "border-error red-input"                                            
                                        : ''
                                    }
                                `} 
                                id='password'
                                name='password'
                                type={!see ? 'password' : 'text'}
                                ref={register({
                                        required: "Este campo es requerido",
                                        minLength: { value: 6, message: "Debe contener mínimo 6 caracteres" },
                                        maxLength: { value: 12, message: "Debe contener máximo 12 caracteres" }
                                    }
                                )}
                            />
                        </label>
                            <span className="span-error">
                                {errors.password && errors.password.message}
                            </span>                       
                            <div>
                                <span className="info-form"><a href="/restablecer-contraseña">Restablecer contraseña</a></span>
                            </div>
                        <section  className="container-buttons">
                            <Link
                                className="btn-cancel-register btn" 
                                type= 'submit' 
                                to="/"
                                >
                                CANCELAR  
                            </Link> 
                            <button 
                                className="btn-login btn" 
                                type= 'submit'
                                >
                                INICIAR SESIÓN
                            </button>
                        </section>
                        <div>
                            <span className="info-form">Si aún no tienes una cuenta <a href="/registro">registrate aquí</a></span>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}
export default withRouter(Login)