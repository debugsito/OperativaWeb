import React, {Fragment} from "react";
import { Link } from 'react-router-dom'
import NavBarOperativa from "../../Components/MenuOperativa";
import ImageConexion from "../../assets/images/image-conexion.svg"
import Ilustracion from "../../assets/images/ilustracion.svg"
import IconProduction from "../../assets/icons/icon-production.svg"
import IconMaintenance from "../../assets/icons/icon-maintenance.svg"
import IconDistribution from "../../assets/icons/icon-distribution.svg"
import IconCallCenter from "../../assets/icons/icon-call-center.svg"
import IconConstruction from "../../assets/icons/icon-construction.svg"
import IconOperaction from "../../assets/icons/icon-operaction.svg"
import Gloria from "../../assets/images/gloria.png"
import Neptunia from "../../assets/images/neptunia.png"
import './index.css';

const Home= () => {

    return (
        <Fragment>
        <NavBarOperativa/>
            <div className="row m-nav row-no-magin container-no-padding">
                <div className="col-12 col-sm-12 col-md-6 col-xl-4">
                    <h1 className='h1-tittle-Home'>Bienvenido a Operativa</h1>
                </div>
            </div >
            <div className="row box-container-title">
                <div className="col-7">
                    <span className="text-box-one">Encuentra el trabajo que buscabas desde tu celular.
                        Más de 600 empresas reclutan a través de Operativa.
                    </span>
                    <div className="mt-2">
                        <Link 
                            className="btn btn-operativa btn-sm"
                            type='submit'
                            to="/registro"
                            >
                            REGISTRATE AQUÍ
                        </Link> 
                    </div>
                </div>
                <div className="col-5 container-no-padding">
                    <img alt='conexion' src= {ImageConexion} className="icon-image-conexion" />
                </div>
            </div>
            <div className="row box-container-title-two box-container-align-rubros row-no-magin">
                <div className="col-12">
                    <h1 className='h1-tittle-box'>Los sectores más productivos</h1>
                    <p className='text-tittle-p'>
                        Encuentra el trabajo que buscabas desde tu celular.
                        Más de 600 empresas reclutan a través de Operativa.
                    </p>
                </div>
                <div className="col-4">
                    <img alt='' src= {IconProduction} className="icon-image-rubros" />
                    <p className="text-icon-rubros">Producción</p>
                </div>
                <div className="col-4">
                    <img alt='' src= {IconMaintenance} className="icon-image-rubros" />
                    <p className="text-icon-rubros">Mantenimiento</p>
                    
                </div>
                <div className="col-4">
                    <img alt='' src= {IconDistribution} className="icon-image-rubros" />
                    <p className="text-icon-rubros">Distribución</p>
                </div>
                <div className="col-4">
                    <img alt='' src= {IconCallCenter} className="icon-image-rubros" />
                    <p className="text-icon-rubros">
                        Call Center y Ventas
                    </p>
                </div>
                <div className="col-4">
                    <img alt='' src= {IconConstruction} className="icon-image-rubros" />
                    <p className="text-icon-rubros">Construcción</p>
                </div>
                <div className="col-4">
                    <img alt='' src= {IconOperaction} className="icon-image-rubros" />
                    <p className="text-icon-rubros">Operaciones</p>
                </div>
                <div className="row row-no-magin container-no-padding">
                    <div className="col-12">
                        <h1 className='h1-tittle-carousel'>Trabajamos con las mejores empresas del país</h1>
                    </div>
                </div >
                <div className="row row-no-magin container-no-padding">
                    <div className="col-12">
                        <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img src={Gloria} className="d-block w-100" alt="..."/>
                                </div>
                                <div className="carousel-item">
                                    <img src={Neptunia} className="d-block w-100" alt="..."/>
                                </div>
                                <div className="carousel-item">
                                    <img src={Gloria} className="d-block w-100" alt="..."/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row box-container-title-three container-no-padding p-2">
                    <div className="col-12 ">
                        <h1 className='h1-tittle-box '>Cómo inscribirte</h1>
                    </div>
                      <div className="col-6">
                      <img alt='conexion' src= {Ilustracion} className="icon-ilustracion" />
                      </div>
                    <div className="col-5 container-no-padding">
                        <span className="text-box-three">Inscribete completando el formulario con tus datos.
                        </span>
                        <div className="">
                            <Link 
                                className="btn btn-operativa btn-sm"
                                type='submit'
                                to="/registro"
                                >
                                REGISTRATE AQUÍ
                            </Link> 
                        </div>
                    </div>
                </div>
                 
            </div>           
     </Fragment>
    )
} 
export default Home;
