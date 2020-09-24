import React from "react";
import NavBar from "../../Components/MenuUser/index"
import {withRouter} from 'react-router-dom'
import Ilustracion from "../../assets/images/ilustracion.svg"
import './index.css';


const Welcome= (props) => {
    
    const onSubmit = (values) => { 
        console.log(values);
        props.history.push('/info');
    }
    return (

        <>
            <NavBar/>
            <div className="row justify-content-center row-no-magin">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <div className="card box-card" >
                        <div className="card-body">
                            <img src= {Ilustracion} className="icon-ilustracion-welcome" alt="..."/>
                            <h1 className='h1-title-card'>BIENVENIDO A OPERATIVA</h1>
                            <p className="text-one-card">Para poder conectarte con tu trabajo ideal, necesitamos que completes tu perfil..</p>
                            <p className="text-one-card">Llenar tus datos te tomará aproximadamente 5 minutos.</p>
                        <div className="d-flex justify-content-center">
                        <button
                            className="btn-primary text-button-next icon-next-button-blue" 
                            type= 'submit' 
                            onClick= {onSubmit}
                            >
                            CONTINUAR 
                        </button> 
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </>  
        )
}
export default withRouter(Welcome)
