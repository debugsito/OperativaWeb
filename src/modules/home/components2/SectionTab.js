// // import Image from "next/image";
import Tabs from "./Tabs";
import Tab from "./Tab";
import Button from "./Button";
import Title from "./Title";
import style from "../styleshome/components_styles/Section_Tab.module.scss";
import { useHistory } from "react-router-dom";

//Images
import IconOne from "../images2/sectionTab/PostulantIcon.svg";
import IconTwo from "../images2/sectionTab/BusinessIcon.svg";
import ImageOne from "../images2/sectionTab/TabOne.png";
import ImageTwo from "../images2/sectionTab/TabTwo.png";
import Circle from "../images2/sectionTab/circle.png";

const TABS_DATA = [
  {
    id: "postulant",
    titleTab: <img src={IconOne} alt="icono" />,
    eventKey: "postulant",
    img: ImageOne,
    title: "Acércate a tu nuevo empleo con Operativa",
    description: (
      <p>
        Regístrate y crea tu CV Digital en la 1ra. Plataforma de empleo
        exclusiva para personal operario, que te permite acceder a más de 200
        empresas con ofertas laborales acorde a tu perfil.
      </p>
    ),
    button: "Regístrate",
  },
  {
    id: "business",
    titleTab: <img src={IconTwo} alt="icono" />,
    eventKey: "business",
    img: ImageTwo,
    title: "El Match perfecto con tu candidato ideal",
    description: (
      <p>
        Optimiza tu proceso de reclutamiento operario hasta en un 70% mediante
        nuestra plataforma con inteligencia artificial, que permite hacer
        “match” entre tu organización y el operario que buscas.
      </p>
    ),
    button: "Solicitar una Demo",
  },
];

export default function Sectiontab({ tab, setTab }) {
  const router = useHistory()

  const handleSelect = (tab) => {
    setTab(tab);

  };
  return (
    <section className={style.container} id="postulant">
      <div className={style.content} id="business">
        <Tabs
          activeKey={tab}
          defaultActiveKey="postulant"
          onSelect={handleSelect}
        >
          {TABS_DATA.map((item) => (
            <Tab
              eventKey={item.eventKey}
              title={item.titleTab}
              key={item.id}
              id={item.id}
            >
              <div className={style.contentTab}>
                <div className={style.text}>
                  <Title variant="dark">{item.title}</Title>
                  <p>{item.description}</p>
                  <div>
                    <Button variant="secondary"
                      onClick={() => router.push("/registro")}
                    >
                      {item.button}
                    </Button>
                  </div>
                </div>

                <div className={style.image}>
                  <img className={style.img} src={item.img} />
                </div>
                <div className={style.circle}>
                  <img src={Circle} />
                </div>
              </div>
            </Tab>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
