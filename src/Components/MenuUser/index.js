import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link, withRouter } from 'react-router-dom';
import { IconContext } from 'react-icons';
import LogoMedio from '../../assets/logos/small.svg'
import { useDispatch } from 'react-redux';
import './index.css';
import { logout } from '../../redux-store/user/actions/logout';
import { logoutAccount } from '../../redux-store/user/actions/logout-account';


function Navbar(props) {
  const [sidebar, setSidebar] = useState(false);

  const dispatch = useDispatch();

  const showSidebar = () => {
    setSidebar(!sidebar);
    var container = document.getElementsByClassName("container-central");
    if (container && container.length > 0 && isMobile.any() == null) {
      container[0].style['transition'] = "350ms";
      if (!sidebar) {
        container[0].style['margin-left'] = "223px";
      } else {
        container[0].style['margin-left'] = "";
      } 
    }
    
  }

  const isAuth = () => {
    if(localStorage.getItem('token') !== null) {
        return true
    }
        return false
};


var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

    const cerrarSesion= () =>{
         localStorage.removeItem('token')
         localStorage.removeItem('email')
         dispatch(logout());
         dispatch(logoutAccount());
         props.history.push('/')    
     }
  return (
    <>
      <IconContext.Provider value={{ color: 'white' }}>
        <div className='navbar2 fixed-top'>
        <div className="">                
                <a href="/" ><img src= {LogoMedio} className="icon-img-logo"  alt="" /></a>            
        </div>
            <div>
              {
                sidebar ? (
                  (
                    <Link to='#' className='menu-bars'>
                        <AiIcons.AiOutlineClose onClick={showSidebar} 
                        style={{
                            color:"white"
                        }}/>
                    </Link>
                  )              
                  ): (
                    <Link to='#' className='menu-bars'>
                      <FaIcons.FaBars onClick={showSidebar} 
                      style={{
                          color:"white"
                      }}/>
                    </Link>
                )
              }
            </div>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu '}>
          <ul  className='nav-menu-items ul-sidebar' onClick={showSidebar}>
              {
                 isAuth() ? (
                   
                    <li className ="nav-text">
                      <a href="/#" onClick= {() => cerrarSesion()}><FaIcons.FaUserCircle/>
                      <span className="title-color">Cerrar sesión</span>  
                      </a>
                    </li>
                  ): (  
                    <li className ="nav-text">
                      <Link to="/inicio-sesion"><FaIcons.FaUserCircle/>
                      <span>Iniciar sesión</span>  
                      </Link>
                    </li>
                  )
              }
              <li className ="nav-text">
                <Link to=""><FaIcons.FaRegBuilding/>
                <span>Empresas</span>  
                </Link>
              </li>
              <li className ="nav-text">
                <Link to="/maintenance-user"><FaIcons.FaUserAlt/>
                <span>Usuarios</span>  
                </Link>
              </li>
              <li className ="nav-text">
                <Link to="/solicitudes"><FaIcons.FaFileAlt/>
                <span>Solicitudes</span>  
                </Link>
              </li>
               
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default withRouter (Navbar);


