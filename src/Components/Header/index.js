import React, { Fragment } from 'react'
import {withRouter, NavLink} from 'react-router-dom'
import Gwyneth from "../../assets/images/Gwyneth.png"
import './index.css'

const NavBar = (props) => {
    const cerrarSesion= () =>{
        console.log()
            .then(()=>{
                props.history.push('/login')
            })
    }
    return (
    <Fragment>
            <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                <div className="d-flex">
                    <nav className="navbar fixed-top navbar-light"
                        style= {{
                            width: "100%",
                            height:"70px",
                            background: '#373737',
                        }}
                        >
                            <span className="info-email mr-2">mail@example.com </span>
                            <NavLink className="btn sign-up-text mr-2 "
                                to='/inicio-sesion'
                                onclick= {() => cerrarSesion()}
                            >
                                Cerrar Sesión
                            </NavLink>
                            <div className="">
                                <img src= { Gwyneth } className='icon-img redondo mb-2' alt=""/>
                            </div>
                    </nav>
                </div>
            </div>
    </Fragment>
    )
}
export default withRouter(NavBar)
