import React from "react";
import NavBar from "../../Components/MenuUser/index"
import {withRouter} from 'react-router-dom'
import Ilustracion from "../../assets/images/hight-five.svg"
import './index.css';


const ProfileUpdate= (props) => {
    
    const onSubmit = (values) => { 
        console.log(values);
        props.history.push('/inicio');
    }
    return (

        <>
            <NavBar/>
            <div className="row justify-content-center row-no-magin">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <div className="card box-card" 
                        >
                        <div className="card-body">
                            <h1 className='h1-title-card'>TUS DATOS SE COMPLETARON CON EXITO</h1>
                            <p className="text-one-card">Has dado el primer paso para conseguir el trabajo que tanto anhelas.</p>
                            <img src= {Ilustracion} className="icon-ilustracion-welcome" alt="..."/>
                        <div className="d-flex justify-content-center">
                        <button
                            className="btn-primary text-button-next " 
                            type= 'submit' 
                            onClick= {onSubmit}
                            >
                            <span className="text-button-continue-restore">Explora Operativa</span>
                            <span className="icon-next-button-blue"></span>
                        </button> 
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </>  
        )
}
export default withRouter(ProfileUpdate)
