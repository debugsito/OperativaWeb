import React, { Fragment } from "react";
import { Link, withRouter } from 'react-router-dom'
import { useForm } from "react-hook-form";
import NavBar from "../../Components/MenuUser/index"
import axios from 'axios';
import './index.css';

const baseUrl="https://reqres.in/api/";


const RestorePassword= (props) => {

    const { handleSubmit, register, errors, formState} = useForm();
    const { isSubmitted } = formState;
    const [error, setError] = React.useState(null)
    
    const onSubmit = (values) => { 
        console.log(values);
      props.history.push('/notificacion-contraseña')
        // let datafield = {
        //   "email": values.usuario
        // }
        //   axios.post(baseUrl+'reset', datafield)
        //       .then((response) => {
        //       if(response.status === 200) {
        //           console.log(response.data)
        //           console.log(response.data.token)            
        //       } else if(response.status === 401) {
        //               alert(response.message);
        //       } else {
        //           alert("Ha ocurrido un error interno.");
        //           console.log(response.data);
        //       }
        //       props.history.push('/notificacion-contraseña')
        //   })
        //   .catch(function(error) {
        //       console.log(error.status)
        //       setError('Usuario y contraseña Incorrecta')
        //       return
        //   })
      }
         
    
       
    return (
      <Fragment>
        <NavBar/>
        <div className="row justify-content-center container-padding row-no-magin">
          <div className="col-12 col-sm-8 col-md-6 col-xl-4">
            <h1 className="h1-custom-restore">RECUPERA TU CONTRASEÑA</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="form-container">
              <label className="label-form">
                Ingresa tu correo electrónico
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
              <section className="row container-buttons">
                <div className="col-6">
                  <Link
                    className="btn-cancel-pr btn"
                    type="submit"
                    to="/registro"
                  >
                    CANCELAR
                  </Link>
                </div>
                <div className="col-6">
                  <button
                    className="button-continue-restore btn icon-next"
                    type="submit"
                    to="/notificacion-contraseña"
                  >
                    CONTINUAR
                  </button>
                </div>
              </section>
            </form>
          </div>
        </div>
      </Fragment>
    );
}
export default withRouter(RestorePassword)