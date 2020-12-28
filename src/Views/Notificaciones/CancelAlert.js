import React from 'react';
import NavBar from '../../Components/MenuUser/index';
import { Link } from 'react-router-dom';
import SolicitudEnviada from '../../assets/images/solicitud-enviada.svg';

const CancelAlert = () => {
  return (
    <>
      <NavBar />

      <div className="row justify-content-center container-padding row-no-magin">
        <div className="col-12 col-md-11">
            <h1 className="h1-custom-solicitud"> </h1>
            <div className="row box-container-title justify-content-center">
                <div className="col-4 col-md-5 image-solicitud">
                    <img alt="conexion" src={SolicitudEnviada} className="icon-image-solicitud-enviada"/>
                </div>
                <div className="col-8 col-md-6 mensaje-solicitud">
                    <label className="text-msg-password">Has cancelado con éxito las alertas de empleo de nuestra lista de correo.</label>
                    <div className="row justify-content-center mt-5">
                        <Link to="/" className="btn btn-ir-plataforma">IR A LA PLATAFORMA</Link>
                    </div>
                </div>
            </div>
        </div>
  
    </div>
    </>
  );
};
export default CancelAlert;