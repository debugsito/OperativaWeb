import Title from "./Title";
import SubTitle from "./SubTitle";
import Card from "./Card";
import style from "../styleshome/components_styles/Section_Price.module.scss";

const CARDS_DATA = [
  {
    plan: "Prueba gratuita",

    features: [
      {
        description: "Crear Publicación",
        check: true,
      },
      {
        description: "Crea avisos confidenciales",
        check: true,
      },
      {
        description:
          "Aumenta el alcance de tu publicación con el multiposting a nuestros socios estratégicos",
        check: true,
      },
      {
        description:
          "Accede a la lista de postulantes preproesados por nuestra IA",
        check: true,
      },

      {
        description: "Revisa CV's y datos del postulante",
        check: true,
      },
      {
        description:
          "Realiza un proceso de selección con Ev. de experiencia, Ev.psicológica, verificación, entrevistas entre otros",
        check: true,
      },
      {
        description: "Accede a analitica de tu proceso de selección",
        check: true,
      },

      {
        description: "Crea/elimina usuarios para tu empresa",
        check: true,
      },
    ],
  },
  // {
  //     plan: "Básico",
  //     price: "300.00",
  //     recommended: false,
  //     features: [
  //         {
  //             description: "Crear Publicación",
  //             check: true,
  //         },
  //         {
  //             description: "Revisa CV's y datos del postulante",
  //             check: true,
  //         },
  //         {
  //             description: "Accede a la lista de postulantes",
  //             check: false,
  //         },
  //         {
  //             description: "Crea/elimina usuarios",
  //             check: false,
  //         },
  //         {
  //             description: "Accede a datos de contacto",
  //             check: false,
  //         },
  //         {
  //             description: "Avisos confidenciales",
  //             check: false,
  //         },
  //     ]
  // },
  // {
  //     plan: "Standart",
  //     price: "540.00",
  //     recommended: true,
  //     features: [
  //         {
  //             description: "Crear Publicación",
  //             check: true,
  //         },
  //         {
  //             description: "Revisa CV's y datos del postulante",
  //             check: true,
  //         },
  //         {
  //             description: "Accede a la lista de postulantes",
  //             check: false,
  //         },
  //         {
  //             description: "Crea/elimina usuarios",
  //             check: false,
  //         },
  //         {
  //             description: "Accede a datos de contacto",
  //             check: false,
  //         },
  //         {
  //             description: "Avisos confidenciales",
  //             check: false,
  //         },
  //     ]
  // },
  // {
  //     plan: "Plan Anual",
  //     price: "800.00",
  //     recommended: false,
  //     features: [
  //         {
  //             description: "Crear Publicación",
  //             check: true,
  //         },
  //         {
  //             description: "Revisa CV's y datos del postulante",
  //             check: true,
  //         },
  //         {
  //             description: "Accede a la lista de postulantes",
  //             check: false,
  //         },
  //         {
  //             description: "Crea/elimina usuarios",
  //             check: false,
  //         },
  //         {
  //             description: "Accede a datos de contacto",
  //             check: false,
  //         },
  //         {
  //             description: "Avisos confidenciales",
  //             check: false,
  //         },
  //     ]
  // },
];

export default function SectionPrice(props) {
  return (
    <section className={style.container}>
      <div className={style.content}>
        <div className={style.p}>
          <Title>¿Qué planes ofrecemos?</Title>
          <p variant="dark">
            Prueba la plataforma en demo y coméntanos tu experiencia.
            <br></br>
            <b>
              Suscríbete ahora y sé parte de la primera plataforma digital
              inteligente de reclutamiento.
            </b>
          </p>
        </div>
        {/* <SubTitle variant="dark">
          Suscríbete ahora y sé parte de la primera plataforma digital
          inteligente de reclutamiento.
        </SubTitle> */}
        <div className={style.cards}>
          {CARDS_DATA.map((item, index) => (
            <Card key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
