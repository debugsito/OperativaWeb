import React, {Fragment} from "react";
import { Link } from 'react-router-dom'
import NavBarDesk from "../../Components/Menu-desktop/NavbarDesk";
import ImageConexion from "../../assets/images/image-conexion.svg"
import Ilustracion from "../../assets/images/ilustracion.svg"
import ImgProduction from "../../assets/icons/medium1.png"
import ImgMaintenance from "../../assets/icons/medium2.png"
import ImgDistribution from "../../assets/icons/medium3.png"
import ImgCallCenter from "../../assets/icons/medium4.png"
import ImgConstruction from "../../assets/icons/medium5.png"
import ImgOperaction from "../../assets/icons/medium6.png"
import Gloria from "../../assets/logos/1.png"
import Talma from "../../assets/logos/2.png"
import Manpower from "../../assets/logos/3.png"
import G4S from "../../assets/logos/4.png"
import Eulen from "../../assets/logos/5.png"
import Ngl from "../../assets/logos/6.png"
import Chinalco from "../../assets/logos/7.png"
import Neptunia from "../../assets/logos/8.png"
import Rokis from "../../assets/logos/9.png"
import Central from "../../assets/logos/10.png"
import Arato from "../../assets/logos/11.png"
import Autopista from "../../assets/logos/12.png"
import Gold from "../../assets/logos/13.png"
import IqFarma from "../../assets/logos/14.png"
import Adex from "../../assets/logos/15.png"
import CasaPalca from "../../assets/logos/16.png"
import CampoSol from "../../assets/logos/17.png"
import Antapaccay from "../../assets/logos/18.png"
import SunFrama from "../../assets/logos/19.png"
import haug from "../../assets/logos/20.png"
import Cipsa from "../../assets/logos/21.png"
import Db from "../../assets/logos/22.png"
import Cruz from "../../assets/logos/23.png"
import Latina from "../../assets/logos/24.png"
import Shakaska from "../../assets/logos/25.png"
import Ares from "../../assets/logos/26.png"
import Tata from "../../assets/logos/27.png"
import Sgs from "../../assets/logos/28.png"
import Tailoy from "../../assets/logos/29.jpg"
import Viva from "../../assets/logos/30.png"
import DesktopCarrusel from "../../Components/Carrusel/DesktopCarrusel"
import LogoMedio from "../../assets/logos/logo-container-operativa.svg"
import './index.css';

const Home= () => {

    return (
        <Fragment>
        <NavBarDesk/>
            <div className="row row-no-magin container-no-padding">
                {/* Primer Bloque */}
                <div className="col-12 col-md-2 container-no-padding"></div>
                <div className="col-12 col-md-8 container-no-padding">
                    <div className="row m-nav row-no-magin container-no-padding">
                        <div className="col-11 col-md-9 container-no-padding hide-sm">
                            <a href="/" ><img src= {LogoMedio} className="icon-img-logo"  alt="" /></a>            
                        </div>
                        <div className="col-11 col-md-9 container-no-padding">
                            <h1 className='h1-tittle-Home'>ENCUENTRA EL TRABAJO QUE BUSCABAS</h1>
                        </div>
                    </div >
                    <div className="row box-container-title ">
                        <div className="col-6 col-md-8 container-no-padding">
                            <span className="text-box-one">Operativa te conecta con más de 600 empresas de todo el Perú
                            </span>
                            <div className="d-flex justify-content-start">
                                <Link 
                                    className="btn btn-operativa btn-sm"
                                    to="/registro"
                                    >
                                    REGISTRATE AQUÍ
                                </Link> 
                            </div>
                        </div>
                        <div className="col-6 col-md-4 container-no-padding">
                            <img alt='conexion' src= {ImageConexion} className="icon-image-conexion" />
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-2 container-no-padding"></div>
                {/* Segundo Bloque */}
                <div className="col-12 col-md-2 container-no-padding hide-sm box-container-title-two"></div>
                <div className="col-12 col-md-8 container-no-padding">
                    <div className="row box-container-title-two box-container-align-rubros row-no-magin container-no-padding">
                        <div className="col-12 col-md-6 container-no-padding">
                            <h1 className='h1-tittle-box'>LOS SECTORES MÁS PRODUCTIVOS</h1>
                            <p className='text-box-two'>
                                Encuentra el trabajo que buscabas desde tu celular.
                                Más de 600 empresas reclutan a través de Operativa.
                            </p>
                        </div>
                        <div className="col-12 col-md-6 pt-md-4">
                            <div className="row row-no-magin container-no-padding">
                                <div className="col-4 text-center">
                                    <img alt='' src= {ImgProduction} className="icon-image-rubros" />
                                    <p className="text-icon-rubros">Producción y operaciones</p>
                                </div>
                                <div className="col-4 text-center">
                                    <img alt='' src= {ImgMaintenance} className="icon-image-rubros" />
                                    <p className="text-icon-rubros">Mantenimiento y limpieza</p>
                                    
                                </div>
                                <div className="col-4 text-center">
                                    <img alt='' src= {ImgDistribution} className="icon-image-rubros" />
                                    <p className="text-icon-rubros">Almacén y transporte</p>
                                </div>
                                <div className="col-4 text-center">
                                    <img alt='' src= {ImgCallCenter} className="icon-image-rubros" />
                                    <p className="text-icon-rubros">
                                        Call-center y Ventas
                                    </p>
                                </div>
                                <div className="col-4 text-center">
                                    <img alt='' src= {ImgConstruction} className="icon-image-rubros" />
                                    <p className="text-icon-rubros">Construcción y obras</p>
                                </div>
                                <div className="col-4 text-center">
                                    <img alt='' src= {ImgOperaction} className="icon-image-rubros" />
                                    <p className="text-icon-rubros">Motorizados y courier</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-2 container-no-padding hide-sm box-container-title-two"></div>
                {/* Tercer Bloque */}
                <div className="col-12 col-md-2 container-no-padding hide-sm"></div>
                <div className="col-12 col-md-8 container-no-padding">
                        <div className="row row-no-magin container-no-padding">
                            <div className="col-12 container-no-padding">
                                <h1 className='h1-tittle-carousel'>TRABAJAMOS CON LAS MEJORES EMPRESAS DEL PAÍS</h1>
                            </div>
                        </div >
                        <div id="carouselExampleSlidesOnly" 
                                className="carousel slide my-0" 
                                width="100"  
                                data-interval="3500" data-ride="carousel"
                                >            
                            <div className="carousel-inner h-slide-custom mobile-car">
                                <div className="carousel-item active">
                                    <div className="row w-100 mx-auto">
                                        <div className="col-6 col-sm-6 col-md-6 mt-1">
                                            <img className="img-fluid d-block  img-slite-custom " src={Gloria}  alt="First slide"/>
                                        </div>
                                        <div className="col-6 col-sm-6 col-md-6  ">
                                            <img className="img-fluid d-block  img-slite-custom" src={Rokis} alt="First slide"/>
                                        </div>
                                        <div className="col-6 col-sm-6 col-md-6 ">
                                            <img className="img-fluid d-block  img-slite-custom" src={Arato}  alt="First slide"/>
                                        </div>
                                        <div className="col-6 col-sm-6 col-md-6">
                                            <img className="img-fluid d-block  img-slite-custom" src={Autopista} alt="First slide"/>
                                        </div>                                                                              
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <div className="row w-100 mx-auto">
                                        <div className="col-6 col-sm-6 col-md-6">
                                            <img className="img-fluid d-block mt-4 img-slite-custom" src={Eulen} alt="First slide"/>
                                        </div>
                                        <div className="col-6 col-sm-6 col-md-6">
                                            <img className="img-fluid d-block mt-4 img-slite-custom" src={Ngl} alt="First slide"/>
                                        </div>
                                        <div className="col-6 col-sm-6 col-md-6">
                                            <img className="img-fluid d-block mt-4 img-slite-custom" src={Chinalco}  alt="First slide"/>
                                        </div>
                                        <div className="col-6 col-sm-6 col-md-6 mt-2">
                                            <img className="img-fluid d-block mt-4 img-slite-custom" src={Neptunia}   alt="First slide"/>
                                        </div>                                      
                                    </div>
                                </div>                                                                                                                                    
                                <div className="carousel-item">
                                    <div className="row w-100 mx-auto">
                                        <div className="col-6 col-sm-6 col-md-6">
                                            <img className="img-fluid d-block  img-slite-custom" src={IqFarma} alt="First slide"/>
                                        </div>
                                        <div className="col-6 col-sm-6 col-md-6 mt-4">
                                            <img className="img-fluid d-block  img-slite-custom" src={Central} alt="First slide"/>
                                        </div>
                                        <div className="col-6 col-sm-6 col-md-6">
                                            <img className="img-fluid d-block  img-slite-custom" src={Manpower}  alt="First slide"/>
                                        </div>
                                        <div className="col-6 col-sm-6 col-md-6 mt-2">
                                            <img className="img-fluid d-block  img-slite-custom" src={G4S} alt="First slide"/>
                                        </div>                                      
                                    </div>
                                </div>     
                                <div className="carousel-item">
                                    <div className="row w-100 mx-auto">
                                        <div className="col-6 col-sm-6 col-md-6">
                                            <img className="img-fluid d-block  img-slite-custom" src={Gold} alt="First slide"/>
                                        </div>
                                        <div className="col-6 col-sm-6 col-md-6">
                                            <img className="img-fluid d-block  img-slite-custom" src={CampoSol} alt="First slide"/>
                                        </div>
                                        <div className="col-6 col-sm-6 col-md-6 mt-4">
                                            <img className="img-fluid d-block  img-slite-custom" src={Adex}  alt="First slide"/>
                                        </div>
                                        <div className="col-6 col-sm-6 col-md-6 mt-3">
                                            <img className="img-fluid d-block  img-slite-custom" src={CasaPalca} alt="First slide"/>
                                        </div>                                      
                                    </div>
                                </div>    
                                <div className="carousel-item">
                                    <div className="row w-100 mx-auto">
                                        <div className="col-6 col-sm-6 col-md-6 mt-3">
                                            <img className="img-fluid d-block  img-slite-custom" src={Db} alt="First slide"/>
                                        </div>
                                        <div className="col-6 col-sm-6 col-md-6 mt-3">
                                            <img className="img-fluid d-block  img-slite-custom" src={Shakaska} alt="First slide"/>
                                        </div>
                                        <div className="col-6 col-sm-6 col-md-6 mt-2 ">
                                            <img className="img-fluid d-block  img-slite-custom" src={Tata}  alt="First slide"/>
                                        </div>
                                        <div className="col-6 col-sm-6 col-md-6 mt-2">
                                            <img className="img-fluid d-block  img-slite-custom" src={Tailoy} alt="First slide"/>
                                        </div>                                      
                                    </div>
                                </div>      
                                <div className="carousel-item">
                                    <div className="row w-100 mx-auto">
                                        <div className="col-6 col-sm-6 col-md-6 mt-4">
                                            <img className="img-fluid d-block  img-slite-custom" src={Cipsa} alt="First slide"/>
                                        </div>
                                        <div className="col-6 col-sm-6 col-md-6 mt-3">
                                            <img className="img-fluid d-block  img-slite-custom" src={Talma} alt="First slide"/>
                                        </div>
                                        <div className="col-6 col-sm-6 col-md-6 mt-5">
                                            <img className="img-fluid d-block  img-slite-custom" src={Cruz}  alt="First slide"/>
                                        </div>
                                        <div className="col-6 col-sm-6 col-md-6 mt-5">
                                            <img className="img-fluid d-block  img-slite-custom" src={haug} alt="First slide"/>
                                        </div>                                      
                                    </div>
                                </div>  
                                <div className="carousel-item">
                                    <div className="row w-100 mx-auto">
                                        <div className="col-6 col-sm-6 col-md-6">
                                            <img className="img-fluid d-block  img-slite-custom" src={Antapaccay} alt="First slide"/>
                                        </div>
                                        <div className="col-6 col-sm-6 col-md-6 mt-2">
                                            <img className="img-fluid d-block  img-slite-custom" src={Ares} alt="First slide"/>
                                        </div>
                                        <div className="col-6 col-sm-6 col-md-6 mt-5">
                                            <img className="img-fluid d-block  img-slite-custom" src={Viva}  alt="First slide"/>
                                        </div>
                                        <div className="col-6 col-sm-6 col-md-6 mt-5">
                                            <img className="img-fluid d-block  img-slite-custom" src={Sgs} alt="First slide"/>
                                        </div>                                      
                                    </div>
                                </div>     
                                <div className="carousel-item">
                                    <div className="row w-100 mx-auto">
                                        <div className="col-6 col-sm-6 col-md-6 mt-2">
                                            <img className="img-fluid d-block  img-slite-custom" src={Latina} alt="First slide"/>
                                        </div>
                                        <div className="col-6 col-sm-6 col-md-6 mt-2">
                                            <img className="img-fluid d-block  img-slite-custom" src={SunFrama} alt="First slide"/>
                                        </div>                                                                              
                                    </div>
                                </div>                     
                            </div>     
                        </div>
                        <div className = "desktop-car">
                            <DesktopCarrusel/>  
                        </div> 
                    </div>
                    <div className="col-12 col-md-2 container-no-padding hide-sm"></div>
                    {/* Cuarto Bloque */}
                    <div className="col-12 col-md-2 container-no-padding hide-sm box-container-title-three"></div>
                    <div className="col-12 col-md-8 container-no-padding">   
                        <div className="row box-container-title-three row-no-magin container-no-padding">
                            <div className="col-12 container-no-padding">
                                <h1 className='h1-text-ilustracion-box'>CÓMO INSCRIBIRTE</h1>
                            </div>
                            <div className="col-6 col-md-5 container-no-padding">
                                    <img alt='conexion' src= {Ilustracion} className="icon-ilustracion" />
                            </div>
                            <div className="col-5 col-md-3 container-no-padding">
                                <div className="ml-2">
                                <span className="text-box-three">Inscribete completando el formulario con tus datos.
                                </span>
                                </div>
                                <div className="d-flex justify-content-start ml-2">
                                    <Link 
                                        className="btn btn-ilustracion-operativa btn-sm"
                                        type='submit'
                                        to="/registro"
                                        >
                                        REGISTRATE AQUÍ
                                    </Link> 
                                </div>
                            </div>
                        </div>

                </div>
                <div className="col-12 col-md-2 container-no-padding hide-sm box-container-title-three"></div>
            </div>
        </Fragment>
    )
} 
export default Home;
