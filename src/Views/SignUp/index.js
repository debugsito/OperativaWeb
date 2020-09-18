import React, { Fragment } from "react";
import './index.css';
import { Link, withRouter } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { useForm } from "react-hook-form";
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';
import NavBarOperativa from "../../Components/MenuOperativa";

const Register= (props) => {
    const [modalTerms, setModalTerms] = React.useState(false);
    const [see, setSee] = React.useState(false)
    const { handleSubmit, register, errors, formState} = useForm();
    const { isSubmitted } = formState;
    
    const seePass = () =>
    {
        setSee(!see)        
    }

    const onSubmit = (values) => { 
        console.log(values);
        props.history.push('/inicio')
    } 
    return (
        <Fragment>
            <div className="row justify-content-center container-padding row-no-magin">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <h1 className='h1-custom'>REGISTRATE EN OPERATIVA</h1>
                    <form onSubmit= { handleSubmit(onSubmit)} className='form-container'>
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
                        <span className="span-error">
                            {errors.dni && errors.dni.message}
                        </span>
                        <label className="mt-2">
                            <input 
                            className="terms-checkbox "
                            name="terms" 
                            type="checkbox" 
                            ref={register({
                                required: "Debe aceptar los términos y condiciones",
                                }
                            )}
                            />
                            <span className="info-form ml-2">Acepto <a href="#" onClick={e => setModalTerms(!modalTerms)}>términos y condiciones</a></span>
                        </label>
                        <span className="span-error">
                            {errors.terms && errors.terms.message}
                        </span>
                        <section  className="container-buttons">
                            <Link
                                className="btn-cancel-register btn" 
                                type= 'submit'
                                 to="/"
                                >
                                CANCELAR  
                            </Link> 
                            <button 
                                className="btn-register btn"
                                type= 'submit'
                                >
                                REGISTRARME
                            </button>
                        </section>
                        <div>
                            <span className="info-form">Si ya tienes una cuenta <a href="/inicio-sesion">inicia sesión aquí</a></span>
                        </div>
                    </form>
                </div>
            </div>
            <Modal isOpen={modalTerms}>
                <ModalHeader>
                    Términos y condiciones.
                </ModalHeader>
                <ModalBody>
                    <p>
                    Este es el cuerpo del modal
                    </p>
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
                    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                    ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur 
                    sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est 
                    laborum.
                    </p>
                </ModalBody>
                <ModalFooter>
                    <buttom className="btn btn-danger" onClick={e => setModalTerms(!modalTerms)}> Cerrar </buttom>
                </ModalFooter>
            </Modal>
            <NavBarOperativa/>
        </Fragment>
    )
}
export default withRouter(Register) 

//******Codigo para llamado a Api*****

//   const data = { email: setEmail, password: setPassword };
//    const signIn = () => {
//         const requestInfo = {
//             method: 'POST',
//             body: JSON.stringify({data}),
//             headers: new Headers({
//                 'Content-Type': 'application/json'
//             }),
//         };
//         fetch('', requestInfo)
//         .then(response => {
//             if(response.ok) {
//                 return response.json()
//             }
//             throw new Error("Login inválido...");
//         })
//         .then(token => {
//            localStorage.setItem('token', token);
//         })
//         .catch(e =>{
//              setError()
//         }); 
//  }