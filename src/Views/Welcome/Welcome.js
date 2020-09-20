import React, { Fragment } from "react";
import Navbar from "../../Components/MenuUser/index"
import {withRouter} from 'react-router-dom'
import Ilustracion from "../../assets/images/ilustracion.svg"

const Welcome= () => {
    return (
            <div>
                <Navbar/>
                <div className="row justify-content-center row-no-magin">
                    <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                        <div className="card" 
                        style={{
                        // width: "20rem",
                        // height: "30rem",
                        marginTop: "160px", 
                        border: '1px solid #979797',
                        boxSizing: 'border-box'
                        }}>
                            <div className="card-body">
                                <img src= {Ilustracion} className="icon-ilustracion-welcome" alt="..."/>
                                <h1 className='h1-title-card'>BIENVENIDO A OPERATIVA</h1>
                                <p className="text-one-card">Para poder conectarte con tu trabajo ideal, necesitamos que completes tu perfil..</p>
                                <p className="text-one-card">Llenar tus datos te tomará aproximadamente 5 minutos.</p>
                            <div>
                            <button
                                className="button-continue-notification btn icon-next-button-blue" 
                                type= 'submit' 
                                to="/nueva-contraseña"
                                >
                                CONTINUAR
                            </button> 
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
        )
}
export default withRouter(Welcome)
