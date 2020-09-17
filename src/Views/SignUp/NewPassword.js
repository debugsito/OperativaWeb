import React, { Fragment } from "react";
import { Link, withRouter } from 'react-router-dom'
import './index.css';
import { useForm } from "react-hook-form";
import NavBarOperativa from "../../Components/MenuOperativa";


const NewPassword= (props) => {

    const { handleSubmit, register, errors } = useForm();
    
    const onSubmit = (values) => { 
        console.log(values);
        props.history.push('/inicio') 
    }
    return (
        <Fragment>
            <NavBarOperativa/>
            <div className="row justify-content-center container-padding row-no-magin">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <h1 className='h1-custom-restore'>CREA UNA NUEVA CONTRASEÑA</h1>
                <form onSubmit= { handleSubmit(onSubmit) } className='form-container'>
                    <label className="label-form">
                        Contraseña
                        <input
                            placeholder=".........."
                            className={errors.password ? "form-control placeholder border-error red-input": "form-control placeholder input-icono"} 
                            id='password'
                            name='password'
                            type="password"
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
                            CREAR
                        </button>
                    </section>
                </form>
            </div>
        </div>           
        </Fragment>
    )
}
export default withRouter(NewPassword)