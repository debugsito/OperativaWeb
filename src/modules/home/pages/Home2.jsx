import React, { useState } from "react";
import Navbar from "../components2/Navbar";
import SectionBanner from "../components2/SectionBanner";
import SectionOperativa from "../components2/SectionOperativa";
import SectionFAQ from "../components2/SectionFAQ";
import SectionTab from "../components2/SectionTab";
import SectionAreas from "../components2/SectionAreas";
import SectionPrice from "../components2/SectionPrice";
import SectionDemoteam from "../components2/SectionDemoteam";
import CarrouselMuni from "../components2/CarrouselMuni";
import Footer from "../components2/Footer";

import SectionRegApplicant from "../components2/SectionRegApplicant";
import styles from "../styleshome/components_styles/Home.module.scss";

//images
import regpost from "../images2/section-regpost/regpost.png";
import wbussines from "../images2/section-regpost/wbussines.png";
//React-redux
import { useDispatch } from "react-redux";
import { resetStore } from "../../../store/actions/global";

const BUSSINES = {
  title: "¿Cómo optimizamos la selección de operarios?",
  content: "Selecciona personal operario en 3 simples pasos:",
  image: wbussines,
  carousel: [
    {
      title: "Regístrate",
      description: "Como empresa y completa los datos para crear tu perfil.",
    },
    {
      title: "Busca",
      description: "Candidatos acorde a los requerimientos de tu oferta.",
    },
    {
      title: "Selecciona",
      description: "A los mejores candidatos, revisa coincidencias y contacta.",
    },
  ],
};
const POSTULANT = {
  title: "¿Cómo me registro?",
  content: "Realiza estos 3 simples pasos",
  image: regpost,
  carousel: [
    {
      title: "Regístrate",
      description:
        "Da clic en el botón Regístrate y crea una cuenta con tu correo electrónico.",
    },
    {
      title: "Crea tu CV",
      description:
        "Completa los datos del CV digital, no es necesario tu CV físico.",
    },
    {
      title: "Completa el cuestionario",
      description:
        "Obtén más oportunidades y posicionate en los primeros resultados de los reclutadores.",
    },
  ],
};

export default function Index(props) {
  const [tab, setTab] = useState("postulant");
  const dispatch = useDispatch()
    
    useState(() => {
        dispatch(resetStore())
    },[])

  return (
   
    <div className={styles.container}>
      <h1>hola</h1>
      {/* <Navbar setTab={setTab} />
      <SectionBanner />
      <SectionOperativa />
      <SectionTab setTab={setTab} tab={tab} />
      <SectionAreas />
      <div>
        {tab === "postulant" ? (
          <SectionRegApplicant data={POSTULANT} />
        ) : (
          <SectionRegApplicant data={BUSSINES} />
        )}
        <CarrouselMuni />
        {tab === "business" && <SectionPrice />}
        {tab === "business" ? <SectionDemoteam /> : <SectionFAQ />}
      </div>
      <Footer /> */}
    </div>
  );
}
