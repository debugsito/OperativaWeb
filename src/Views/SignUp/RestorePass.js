import React, { Fragment } from "react";
import { Link, withRouter } from 'react-router-dom'
import './index.css';
import { useForm } from "react-hook-form";
import NavBarOperativa from "../../Components/MenuOperativa";


const RestorePassword= (props) => {

    const { handleSubmit, register, errors, formState} = useForm();
    const { isSubmitted } = formState;
    
    const onSubmit = (values) => { 
        console.log(values);
        props.history.push('/notificacion-contraseña') 
    }
    return (
        <Fragment>
            <NavBarOperativa/>
            <div className="row justify-content-center container-padding row-no-magin">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <h1 className='h1-custom-restore'>RECUPERA TU CONTRASEÑA</h1>
                <form onSubmit= { handleSubmit(onSubmit) } className='form-container'>
                    <label className="label-form">
                        Ingresa tu correo electrónico
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
                            id="email"
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
                    <section  className="row container-buttons">
                        <div className="col-6">
                            <Link
                                className="btn-cancel-pr btn" 
                                type= 'submit' 
                                to="/registro"
                                >
                                CANCELAR
                            </Link> 
                        </div>
                        <div className="col-6">
                            <button className="button-continue-restore btn icon-next" 
                            type= 'submit' >
                                    RESTAURAR
                            </button>

                        </div>
                    </section>
                </form>
            </div>
        </div>           
        </Fragment>
    )
}
export default withRouter(RestorePassword)