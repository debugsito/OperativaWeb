import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import NavBar from '../../Components/MenuUser/index';
import './index.css';
import UserService from '../../services/user.service';

const RestorePassword = (props) => {
  const { handleSubmit, register, errors, formState } = useForm();
  const { isSubmitted } = formState;
  const [error, setError] = useState(null);

  const onSubmit = (values) => {
    const datafield = {
      email: values.usuario
    }
    restorePass(datafield);
  };

  async function restorePass(datafield){
    try{
    const responseEducation = await UserService.restorePass(datafield);  
    if(responseEducation.status === 200){
        props.history.push('/notificacion-contraseña');
      }
    }catch(error){
      setError(error.response.data.message);
    }
  }

  return (
    <>
      <NavBar />
      <div className="row justify-content-center padding-container row-no-magin">
        <div className="col-12 col-sm-8 col-md-6 container-no-padding">
          <h1 className="h1-custom-restore">Recupera tu contraseña</h1>
            <span className="info-form-pass">
              Ingresa tu correo electrónico para recibir instrucciones de cómo retablecer tu contraseña.
            </span>
          <form onSubmit={handleSubmit(onSubmit)} className="form-container">
            {error ? <div className="alert alert-danger">{error}</div> : null}
            <label className="label-form">
              Correo electrónico
              <input
                placeholder="mail@ejemplo.com"
                className={`form-control input-text
                                ${
                                  isSubmitted
                                    ? !errors.usuario
                                      ? 'input-icono'
                                      : 'border-error red-input input-icoerror'
                                    : ''
                                }
                            `}
                name="usuario"
                type="text"
                autoComplete="off"
                ref={register({
                  required: 'Este campo es requerido',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Coloque un email valido'
                  }
                })}
              />
            </label>
            <span 
              className="span-error">{errors.usuario && errors.usuario.message}
            </span>
            <section className="container-buttons-continue">
              <Link className="btn-cancel-register btn" to="/registro">
                CANCELAR
              </Link>
              <button className="btn-register" type="submit">
                CONTINUAR
              </button>
            </section>
          </form>
        </div>
      </div>
    </>
  );
};
export default withRouter(RestorePassword);
