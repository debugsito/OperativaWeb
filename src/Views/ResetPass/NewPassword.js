import React, { Fragment } from "react";
import { Link, withRouter } from 'react-router-dom'
import { useForm } from "react-hook-form";
import NavBar from "../../Components/MenuUser/index";
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';
import {useLocation} from "react-router-dom";
import UserService from '../../services/user.service'
import { MensajeError, MensajeExito } from './../../utils/toast'
import './index.css';

const NewPassword= (props) => { 
    const { handleSubmit, register, errors, formState} = useForm();
    const { isSubmitted } = formState;
    const [see, setSee] = React.useState(false)
    const [see2, setSee2] = React.useState(false)
    const search = useLocation().search;
    const name = new URLSearchParams(search).get('token');
    
    const onSubmit = (values) => {

        const datafield = {
            token: name,
            password: values.password,
            password_confirmed: values.password_confirmed
        }
        changePassword(datafield);
    }
    
    async function changePassword(datafield) {
        try {
            const responseChangePass = await UserService.changePass(datafield)
            if (responseChangePass.status === 200) {
                props.history.push('/update-password')
            }
        } catch (error) {
            MensajeError(error.response.data.message);
        }
    }

    const seePass = () =>
    {
        setSee(!see)        
    }

    const seePass2 = () => 
    {
        setSee2(!see2)
    }
    
    return (
        <Fragment>
            <NavBar/>
            <div className="row justify-content-center container-padding row-no-magin">
                <div className="col-12 col-sm-8 col-md-6">
                    <h1 className='h1-custom-restore'>Restablece tu contraseña</h1>
                <form onSubmit= { handleSubmit(onSubmit) } className='form-container'>
                    <label className="label-form">
                        Confirmar Contraseña
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
                            className={`form-control input-text
                                ${
                                    isSubmitted ? 
                                        !errors.password ?
                                        ""
                                        : 
                                        "border-error red-input"                                            
                                    : ''
                                }
                            `}
                            name='password'
                            type={!see ? 'password' : 'text'}
                            ref={register({
                                required: "Este campo es requerido",
                                minLength: { value: 6, message: "Debe contener mínimo 6 caracteres" },
                                maxLength: { value: 12, message: "Debe contener máximo 12 caracteres" }
                                }
                            )}
                        />
                        <span className="span-error">
                            {errors.password && errors.password.message}
                        </span>   
                    </label>
                    <label className="label-form">
                        Confirmar Contraseña
                        <div className="icon-see-container">
                            {see2
                                ? 
                                <IoIosEye className="space-icon-see" onClick={seePass2}/> 
                                :
                                <IoIosEyeOff className="space-icon-see" onClick={seePass2}/>
                            }
                        </div>
                        <input
                            placeholder=".........."
                            className={`form-control input-text
                                ${
                                    isSubmitted ? 
                                        !errors.password_confirmed ?
                                        ""
                                        : 
                                        "border-error red-input"                                            
                                    : ''
                                }
                            `}
                            name='password_confirmed'
                            type={!see2 ? 'password' : 'text'}
                            ref={register({
                                required: "Este campo es requerido",
                                minLength: { value: 6, message: "Debe contener mínimo 6 caracteres" },
                                maxLength: { value: 12, message: "Debe contener máximo 12 caracteres" }
                                }
                            )}
                        />
                        <span className="span-error">
                            {errors.password_confirmed && errors.password_confirmed.message}
                        </span>   
                    </label>
                    <section  className="container-buttons">
                        <Link
                            className="btn-cancel-register btn" 
                            type='button' 
                            to="/"
                            >
                            CANCELAR  
                        </Link> 
                        <button 
                            className="btn-continue-sol text-center" 
                            type='submit'
                            >
                            ACEPTAR
                        </button>
                    </section>
                </form>
            </div>
        </div>           
        </Fragment>
    )
}
export default withRouter(NewPassword)