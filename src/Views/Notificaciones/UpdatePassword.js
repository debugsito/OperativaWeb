import React from 'react';
import NavBar from '../../Components/MenuUser/index';
import { Link } from 'react-router-dom';
import SolicitudEnviada from '../../assets/images/solicitud-enviada.svg';

const UpdatePassword = (props) => {
  return (
    <>
    <NavBar />

    <div className="row justify-content-center container-padding row-no-magin">
        <div className="col-12 col-sm-6 col-md-10">
            <h1 className="h1-custom-solicitud"> </h1>
            <div className="row box-container-title justify-content-center">
                <div className="col-4 col-md-5 image-solicitud">
                    <img alt="conexion" src={SolicitudEnviada} className="icon-image-solicitud-enviada"/>
                </div>
                <div className="col-8 col-md-7 mensaje-solicitud ">
                    <label className="title-solicitud justify-content-center">Tu contraseña ha sido actualizada correctamentente.</label>
                    <p className="text-box-four justify-content-center">
                        Ahora puedes acceder a la plataforma con tu nueva contraseña.
                        
                    </p>
                    <div className="row justify-content-center mt-5">
                        <Link to="/" className="btn btn-solicitud">VOLVER AL INICIO</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  );
};
export default UpdatePassword;