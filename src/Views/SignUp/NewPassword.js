import React, { Fragment } from "react";
import { Link, withRouter } from 'react-router-dom'
import './index.css';
import { useForm } from "react-hook-form";
import NavBar from "../../Components/MenuUser/index";
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';
import axios from 'axios';

const NewPassword= (props) => { 
    const { handleSubmit, register, errors, formState} = useForm();
    const { isSubmitted } = formState;
    const [error, setError] = React.useState(null)

    const baseUrl="https://reqres.in/api/";

    const onSubmit = (values) => { 
        console.log(values);
        props.history.push('/inicio-sesion')
        // let datafield = {
        //     "password": values.password,
        //     "token": props.match.params.token
        //   }
        //     axios.post(baseUrl+'resetpassword', datafield)
        //     .then((response) => {
        //         if(response.status === 200) {
        //             console.log(response.data)
        //             console.log(response.data.token)            
        //         } else if(response.status === 401) {
        //                 alert(response.message);
        //         } else {
        //             alert("Ha ocurrido un error interno.");
        //             console.log(response.data);
        //         }
        //         props.history.push('/iniciar-sesion')
        //     })
        //     .catch(function(error) {
        //         console.log(error.status)
        //         setError('Usuario y contraseña Incorrecta')
        //         return
        //     })
        }          
    const [see, setSee] = React.useState(false)
    const seePass = () =>
    {
        setSee(!see)        
    }
    return (
        <Fragment>
            <NavBar/>
            <div className="row justify-content-center container-padding row-no-magin">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <h1 className='h1-custom-restore'>CREA UNA NUEVA CONTRASEÑA</h1>
                <form onSubmit= { handleSubmit(onSubmit) } className='form-container'>
                    <label className="label-form">
                        Contraseña
                        <div className="icon-see-container">
                            {see 
                                ? 
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
                    <section  className="container-buttons">
                        <Link
                            className="btn-cancel-register btn" 
                            type= 'submit' 
                            to="/registro"
                            >
                            CANCELAR  
                        </Link> 
                        <button 
                            className="btn-login btn" 
                            type= 'submit'
                            >
                            SOLICITAR
                        </button>
                    </section>
                </form>
            </div>
        </div>           
        </Fragment>
    )
}
export default withRouter(NewPassword)