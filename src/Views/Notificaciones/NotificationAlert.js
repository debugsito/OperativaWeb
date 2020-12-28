import React from 'react';
import NavBar from '../../Components/MenuUser/index';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import SolicitudEnviada from '../../assets/images/solicitud-enviada.svg';

const NotificacionAlert = () => {

   const { handleSubmit, register, errors} = useForm();

   const onSubmit = () => { 

   }

  return (
    <>
    <NavBar />

    <div className="row justify-content-center container-padding row-no-magin">
        <div className="col-12 col-sm-6 col-md-10">
            <h1 className="h1-custom-solicitud"> </h1>
            <form name="myForm" onSubmit={handleSubmit(onSubmit)}  className='form-container-info'>
                <div className="row box-container-title justify-content-center">
                    <div className="col-4 col-md-5 image-solicitud">
                        <img alt="conexion" src={SolicitudEnviada} className="icon-image-solicitud-enviada"/>
                    </div>
                    <div className="col-8 col-md-7 mensaje-solicitud">
                        <label className="title-cancel-suscription">Si tienes un minuto, por favor permítenos saber por qué no deseas recibir más alertas laborales a tu correo.</label>
                        
                        <div className="text-box-four">
                            <label htmlFor="gender" className="label-form mt-1">
                            <div className= "mt-2">
                                <div className="form-check margin-right">
                                    <input 
                                        className="form-check-input"
                                        type="radio" 
                                        name="gender"
                                        value='1'
                                        ref={register({ required: "Seleccione una opción" })}
                                    />
                                    <label className="form-text-check-cancel">
                                        Ya encontré trabajo
                                    </label>
                                </div>
                                <div className="form-check margin-right">
                                    <input 
                                        className="form-check-input"
                                        type="radio" 
                                        name="gender" 
                                        value="2"
                                        ref={register({ required: "Seleccione una opción" })}
                                    />
                                    <label className="form-text-check-cancel">
                                        Las ofertas laborales que recibo no se ajustan a mi búsqueda
                                    </label>
                                </div>
                                <div className="form-check margin-right">
                                    <input 
                                        className="form-check-input"
                                        type="radio" 
                                        name="gender" 
                                        value="0"
                                        ref={register({ required: "Seleccione una opción" })}
                                    />
                                    <label className="form-text-check-cancel">
                                        Los correos llegan con demasiada frecuencia
                                    </label>
                                </div>
                                <div className="form-check margin-right">
                                    <input 
                                        className="form-check-input"
                                        type="radio" 
                                        name="gender" 
                                        value="0"
                                        ref={register({ required: "Seleccione una opción" })}
                                    />
                                    <label className="form-text-check-cancel">
                                        Otro motivo
                                    </label>
                                </div>
                            </div>
                            <span className="span-error">
                                { errors.gender && errors.gender.message}
                            </span>
                        </label>

                        </div>
                        <div className="row justify-content-center section-btn-cancel">
                            <Link to="/" className="btn-ir-plataforma">IR A PLATAFORMA</Link>
                            <button className="btn-cancel-alert" type="submit">CANCELAR ALERTAS</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
  
    </div>
    </>
  );
};
export default NotificacionAlert;