// import Image from "next/image";

import Title from "./Title";
import SubTitle from "./SubTitle";
import CarrouselMuni from "./CarrouselMuni";

//images
import LogoInnovate from "../images2/logos/logo-proinnovate.png";
import LogoPucp from "../images2/logos/PUCP.png";
import Verificativa from "../images2/logos/logo_verificativa.png";
import PointLeft from "../images2/section-operativa/point_left.svg";
import PointRight from "../images2/section-operativa/point_right.svg";
import styles from "../styleshome/components_styles/Section_Operativa.module.scss";


export default function SectionOperativa(props) {


    return (
        <section className={styles.container}>
            <div className={styles.content}>
                <div className={styles.financed}>
                    <p>Financiado por:</p>
                    <div className={styles.logos}>
                        <img src={LogoInnovate} alt="Logo" />
                        <img src={LogoPucp} alt="Logo" />
                        <img src={Verificativa} alt="Logo" />
                    </div>
                </div>
                <div className={styles.text}>
                    <div className={styles.icon}>
                        <img className={styles.img} src={PointLeft} alt="" />
                    </div>
                    <div className={styles.textCenter}>
                        <Title variant="dark">¿Qué es Operativa?</Title>
                        <p>Es la primera Plataforma Digital Inteligente que automatiza los procesos masivos de reclutamiento operario, a través de modelos de inteligencia artificial (IA) para una identificación inmediata y “match” entre el candidato y la empresa.
                        <br></br>
                        <br></br>
                        OPERATIVA, optimiza el proceso de reclutamiento de operarios hasta en 70% y predice el tiempo de permanencia de un trabajador en una organización con un porcentaje de éxito del 97%, mediante algoritmos de inteligencia artificial, que permite identificar personal idóneo y disminuir la tasa de rotación de personal.
                        </p>
                    </div>
                    <div className={styles.icon}>
                        <img className={styles.img} src={PointRight} alt="" />
                    </div>
                </div>

                {/* <div className={styles.card}>
                    <SubTitle variant="dark">Nuestras alianzas Estratégicas</SubTitle>
                    <div>
                    <CarrouselMuni />
                    </div>
                    
                </div>  */}
               
            </div>
        </section>
    )
}
