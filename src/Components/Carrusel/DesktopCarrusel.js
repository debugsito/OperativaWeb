import React from 'react'
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
import { withRouter } from 'react-router-dom'
import '../../index.css'

const DesktopCarrusel = () => {
    return (
            <div id="carouselExampleSlidesOnly" 
                className="carousel slide my-0" 
                width="100"  
                data-interval="5000" 
                data-ride="carousel"
            >                
                <div className="carousel-inner h-slide-custom">
                    <div className="carousel-item active">
                        <div className="row w-100 mx-auto">
                            <div className="col-1 col-sm-2 col-md-2 mt-3">
                                <img className="img-fluid d-block  img-slite-custom " src={Gloria}  alt="First slide"/>
                            </div>
                            <div className="col-1 col-sm-2 col-md-2 mt-2">
                                <img className="img-fluid d-block mt-2 img-slite-custom" src={Ares} alt="First slide"/>
                            </div>                                                
                            <div className="col-1 col-sm-2 col-md-2 ">
                                <img className="img-fluid d-block mt-2 img-slite-custom" src={Arato}  alt="First slide"/>
                            </div>
                            <div className="col-1 col-sm-2 col-md-2">
                                <img className="img-fluid d-block mt-3 img-slite-custom" src={Autopista} alt="First slide"/>
                            </div>          
                            <div className="col-1 col-sm-2 col-md-2">
                                <img className="img-fluid d-block mt-3 img-slite-custom" src={Eulen} alt="First slide"/>
                            </div>
                            <div className="col-1 col-sm-2 col-md-2">
                                <img className="img-fluid d-block mt-3 img-slite-custom" src={Ngl} alt="First slide"/>
                            </div>
                            <div className="col-1 col-sm-2 col-md-2">
                                <img className="img-fluid d-block mt-2 img-slite-custom" src={Chinalco}  alt="First slide"/>
                            </div>
                            <div className="col-1 col-sm-2 col-md-2 mt-2">
                                <img className="img-fluid d-block  img-slite-custom" src={Neptunia}   alt="First slide"/>
                            </div>    
                            <div className="col-1 col-sm-2 col-md-2 mt-2 ">
                                <img className="img-fluid d-block img-slite-custom" src={IqFarma} alt="First slide"/>
                            </div>
                            <div className="col-1 col-sm-2 col-md-2 mt-4">
                                <img className="img-fluid d-block  img-slite-custom" src={Cipsa} alt="First slide"/>
                            </div>
                            <div className="col-1 col-sm-2 col-md-2 mt-3">
                                <img className="img-fluid d-block   img-slite-custom" src={Talma} alt="First slide"/>
                            </div>
                            <div className="col-1 col-sm-2 col-md-2 mt-4">
                                <img className="img-fluid d-block  img-slite-custom" src={Central} alt="First slide"/>
                            </div>                                                                 
                        </div>
                    </div>                                                                                                                                 
                    <div className="carousel-item">
                        <div className="row w-100 mx-auto">
                            <div className="col-1 col-sm-2 col-md-2 mt-3">
                                <img className="img-fluid d-block  img-slite-custom" src={Manpower}  alt="First slide"/>
                            </div>
                            <div className="col-1 col-sm-2 col-md-2 mt-4">
                                <img className="img-fluid d-block  img-slite-custom" src={Antapaccay} alt="First slide"/>
                            </div>
                            <div className="ccol-1 col-sm-2 col-md-2 mt-3">
                                <img className="img-fluid d-block  img-slite-custom" src={Gold} alt="First slide"/>
                            </div>
                            <div className="ccol-1 col-sm-2 col-md-2 mt-3">
                                <img className="img-fluid d-block  img-slite-custom" src={CampoSol} alt="First slide"/>
                            </div>
                            <div className="ccol-1 col-sm-2 col-md-2 mt-4 ">
                                <img className="img-fluid d-block  img-slite-custom" src={Adex}  alt="First slide"/>
                            </div>
                            <div className="col-1 col-sm-2 col-md-2 mt-3">
                                <img className="img-fluid d-block  img-slite-custom" src={CasaPalca} alt="First slide"/>
                            </div>    
                            <div className="ccol-1 col-sm-2 col-md-2 mt-4 ">
                                <img className="img-fluid d-block  img-slite-custom" src={Db} alt="First slide"/>
                            </div>
                            <div className="ccol-1 col-sm-2 col-md-2 mt-4">
                                <img className="img-fluid d-block  img-slite-custom" src={Shakaska} alt="First slide"/>
                            </div>
                            <div className="ccol-1 col-sm-2 col-md-2 mt-4 ">
                                <img className="img-fluid d-block  img-slite-custom" src={Cruz}  alt="First slide"/>
                            </div>
                            <div className="ccol-1 col-sm-2 col-md-2 mt-4 ">
                                <img className="img-fluid d-block  img-slite-custom" src={haug} alt="First slide"/>
                            </div>   
                            <div className="col-1 col-sm-2 col-md-2 mt-3">
                                <img className="img-fluid d-block  img-slite-custom" src={Viva}  alt="First slide"/>
                            </div>
                            <div className="col-1 col-sm-2 col-md-2 mt-3">
                                <img className="img-fluid d-block  img-slite-custom" src={Sgs} alt="First slide"/>
                            </div>                                                              
                        </div>
                    </div>          
                    <div className="carousel-item">
                        <div className="row w-100 mx-auto">
                            <div className="ccol-2 col-sm-2 col-md-2 mt-4 ">
                                <img className="img-fluid d-block  img-slite-custom" src={G4S} alt="First slide"/>
                            </div> 
                            <div className="col-2 col-sm-2 col-md-2 mt-3 ">
                                <img className="img-fluid d-block  img-slite-custom" src={Rokis} alt="First slide"/>
                            </div>
                            <div className="col-2 col-sm-2 col-md-2 mt-3 ">
                                <img className="img-fluid d-block  img-slite-custom" src={Tata}  alt="First slide"/>
                            </div>
                            <div className="col-2 col-sm-2 col-md-2 mt-3">
                                <img className="img-fluid d-block  img-slite-custom" src={Tailoy} alt="First slide"/>
                            </div>                                                     
                            <div className="col-2 col-sm-2 col-md-2 mt-3">
                                <img className="img-fluid d-block  img-slite-custom" src={Latina} alt="First slide"/>
                            </div>
                            <div className="col-2 col-sm-2 col-md-2 mt-3">
                                <img className="img-fluid d-block  img-slite-custom" src={SunFrama} alt="First slide"/>
                            </div>                                
                        </div>
                    </div>                       
                </div>     
            </div>
    )
}
export default withRouter (DesktopCarrusel)
