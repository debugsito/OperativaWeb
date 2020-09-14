import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import iconoMenuDark from "../../assets/icons/icon-menu-dark.svg"

const NavBarOperativa = () => {

    return (
    <Fragment>
            <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                <div className="d-flex">
                    <nav className="navbar fixed-top navbar-dark"
                        style= {{
                            width: "100%",
                            height:"70px",
                            background: '#F7F7F7',
                            padding: "0px"
                        }}
                        >
                    <Link className="navbar-brand  icon-container ml-3 " to="/"></Link>
                    <button class="navbar-toggler"
                        type="button" 
                        data-toggle="collapse" 
                        data-target="#navbarSupportedContent" 
                        aria-controls="navbarSupportedContent" 
                        aria-expanded="false" 
                        aria-label="Toggle navigation"
                            style={{
                                border: "0px",
                                padding: "0px",
                                marginRight:"16px"
                            }}
                        >
                        <span>
                            <img src= { iconoMenuDark } className='' alt=""/>
                               
                        </span>
                    </button>
                    </nav>
                </div>
            </div>
    </Fragment>
    )
}
export default NavBarOperativa