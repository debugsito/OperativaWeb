import React, { Fragment } from "react";
import { Link, withRouter } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { useForm } from "react-hook-form";
import NavBar from "../../Components/MenuUser/index";
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';
import * as OPTIONS from "../../services/options"
import axios from "axios";
import ReactGa from "react-ga"
import './index.css';

const Register= (props) => {
    const [modalTerms, setModalTerms] = React.useState(false);
    const { handleSubmit, register, errors, formState} = useForm();
    const { isSubmitted } = formState;
    const [see, setSee] = React.useState(false)
    const [error, setError] = React.useState(null)

    //mostrar Contraseña:
    const seePass = () =>
    {
        setSee(!see)        
    }

    const onSubmit = (values) => { 
        console.log(values);

        ReactGa.event({
            category: 'Buttom',
            action:"Click in the buttom"
        })
        
        let datafield = {
            "email": values.usuario, 
            "password": values.password 
        }

        axios.post(OPTIONS.baseUrl + 'user/', datafield, OPTIONS.options)
        .then((response) => {
            if(response.status === OPTIONS.SUCESS_RESPONSE) {
                console.log(response.data)
                axios.post(OPTIONS.baseUrl + 'auth/login', datafield, OPTIONS.options)
                .then((response) => {
                    if(response.status === OPTIONS.OK_RESPONSE) {
                        localStorage.setItem('token', response.data.Authorization);
                        axios.get(OPTIONS.baseUrl + 'user/' + values.usuario)
                        .then((response) => {   
                            //Guardar Email
                            localStorage.setItem('email', response.data.email);
                            props.history.push('/inicio');
                        })
                        .catch(function(error) {
                            console.log(error)
                        })             
                    } else if(response.status === OPTIONS.ERROR_PAGE) {
                            alert(response.data.message);
                    } else {
                        alert("Ha ocurrido un error interno.");
                        console.log(response);
                    }
                })
                .catch(function(error) {
                    console.log(error)
                    setError('Usuario y contraseña Incorrecta')
                    return
                })           
            } else if(response.status === OPTIONS.ERROR_PAGE) {
                    alert(response.message);
            } else {
                alert("Ha ocurrido un error interno.");
                console.log(response.data);
            }
        })
        .catch(function(error) {
            console.log(error.status)
            setError('Usuario ya registrado')
            return
        })
    }
    return (
      <Fragment>
          <NavBar/>
        <div className="row justify-content-center container-padding row-no-magin">
            <div className="col-12 col-sm-8 col-md-6">
                <h1 className="h1-custom">REGISTRATE EN OPERATIVA</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="form-container">
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
                            placeholder="mail@ejemplo.com"
                            className={`form-control placeholder
                                          ${
                                            isSubmitted
                                                ? !errors.usuario
                                                ? "input-icono"
                                                : "border-error red-input input-icoerror"
                                                : ""
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
                                message: "Coloque un email valido",
                              },
                            })}
                        />
                    </label>
                            <span className="span-error">
                                {errors.usuario && errors.usuario.message}
                            </span>
                    <label className="label-form">
                        Contraseña
                        <div className="icon-see-container">
                            {see ? (
                                <IoIosEye className="space-icon-see" onClick={seePass} />
                            ) : (
                                <IoIosEyeOff className="space-icon-see" onClick={seePass} />
                            )}
                        </div>
                        <input
                            placeholder=".........."
                            className=  {`form-control  placeholder                                      
                                        ${
                                            isSubmitted
                                            ? !errors.password
                                            ? ""
                                            : "border-error red-input"
                                            : ""
                                        }
                                   `}
                            name="password"
                            type={!see ? "password" : "text"}
                            ref={register({
                                    required: "Este campo es requerido",
                                    minLength: {
                                    value: 6,
                                    message: "Debe contener mínimo 6 caracteres",
                                },
                                    maxLength: {
                                    value: 12,
                                    message: "Debe contener máximo 12 caracteres",
                                },
                            })}
                        />
                    </label>
                        <span className="span-error">
                            {errors.password && errors.password.message}
                        </span>
                        <span className="span-error">
                            {errors.dni && errors.dni.message}
                        </span>
                    <label className="">
                        <input
                          className="terms-checkbox "
                          name="terms"
                          type="checkbox"
                          ref={register({
                            required: "Debe aceptar los términos y condiciones",
                          })}
                        />
                        <span className="info-form-term">
                            Acepto{" "}
                            <a href="#" onClick={(e) => setModalTerms(!modalTerms)}>
                              términos y condiciones
                            </a>
                        </span>
                    </label>
                        <span className="span-error">
                            {errors.terms && errors.terms.message}
                        </span>
                    <section className="container-buttons">
                        <Link className="btn-cancel-register btn" to="/">
                          CANCELAR
                        </Link>
                        <button className="btn-register btn" type="submit">
                            SOLICITAR
                        </button>
                    </section>
                    <div className="space-spam-login-register">
                        <span className="info-form">
                            Si ya tienes una cuenta{" "}
                            <a href="/inicio-sesion">inicia sesión aquí</a>
                        </span>
                    </div>
                </form>
            </div>
        </div>
        <Modal isOpen={modalTerms}>
            <ModalHeader>Términos y condiciones.</ModalHeader>
            <ModalBody>
                <p className="style-modal">
                De conformidad con la Ley 29733 de Protección de Datos Personales,
                autorizo, libre y expresamente a la Plataforma OPERATIVA para que
                mis datos personales sean utilizados para fines laborales.
                <br/>
                <br/>
                Deseo recibir información sobre organizaciones, empresas, que puedan
                adecuarse a mi interés de trabajo.
                <br/>
                <br/>                
                Deseo recibir notificaciones de convocatorias de trabajo en mi correo
                electrónico.
                </p>
            </ModalBody>
                <ModalFooter>
                    <buttom
                      className="btn btn-danger"
                      onClick={(e) => setModalTerms(!modalTerms)}
                    >
                      {" "}
                      Cerrar{" "}
                    </buttom>
                </ModalFooter>
        </Modal>
      </Fragment>
    );
}
export default withRouter(Register) 