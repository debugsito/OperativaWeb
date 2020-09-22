import React, { Fragment } from 'react'
import { withRouter} from 'react-router-dom'
import Gwyneth from "../../assets/images/Gwyneth.png"
import LogoMedio from "../../assets/logos/logo-medio.svg"
import './index.css'

//cerrar Sesion
const NavBar = (props) => {  
   const cerrarSesion= () =>{
        localStorage.removeItem('token')
        localStorage.removeItem('email')
        props.history.push('/')    
    }
const email = localStorage.getItem('email')
    return (
    <Fragment>
            <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                <div className="d-flex">
                    <nav className="navbar fixed-top navbar-light"
                        style= {{
                            width: "100%",
                            height:"70px",
                            background: '#F7F7F7',
                        }}
                        >
                        <span className="info-email mr-2">{email}</span>
                        <button className="btn sign-up-text mr-2 "
                            onClick= {() => cerrarSesion()}
                        >
                            Cerrar Sesión
                        </button>
                        <div className="">
                            <img src= { LogoMedio} className='icon-img-logo' alt=""
                                style={{
                                }}/>
                            <img src= { Gwyneth } className='icon-img mb-2' alt=""/>
                        </div>
                    </nav>
                </div>
            </div>
    </Fragment>
    )
}
export default withRouter(NavBar)

