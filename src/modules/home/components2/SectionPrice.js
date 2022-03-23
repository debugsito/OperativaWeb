import Title from "./Title";
import SubTitle from "./SubTitle";
import Card from "./Card";
import style from "../styleshome/components_styles/Section_Price.module.scss";

const CARDS_DATA = [
  {
    plan: "Free",
    price: "S/ 0",
    recommended: false,
    features: [
      {
        description: "Crear hasta 100 publicaciones",
        check: true,
    },
    {
      description: "Accede una lista de 200 postulantes preprocesadas por IA",
      check: true,
  },
    {
        description: "Revisa CV's y datos del postulante",
        check: true,
    },
    {
      description: "Accede a datos de contacto",
      check: true,
  },

    {
        description: "Crea/elimina usuarios",
        check: false,
    },

    {
        description: "Avisos confidenciales",
        check: false,
    },
    {
      description: "Acceso a proceso de selección avanzado",
      check: false,
  },
  {
    description: "Acceso a multiposting de publicación",
    check: false,
  },
    ]
  },
  {
      plan: "Emprendedor",
      price: "S/ 2500 más IGV",
      recommended: false,
      features: [
          {
              description: "Crear hasta 2 publicaciones",
              check: true,
          },
          {
            description: "Accede una lista de 10 postulantes preprocesadas por IA",
            check: true,
        },
          {
              description: "Revisa CV's y datos del postulante",
              check: true,
          },
          {
            description: "Accede a datos de contacto",
            check: true,
        },

          {
              description: "Crea/elimina usuarios",
              check: true,
          },

          {
              description: "Avisos confidenciales",
              check: true,
          },
          {
            description: "Acceso a proceso de selección avanzado",
            check: true,
        },
        {
          description: "Acceso a multiposting de publicación",
          check: true,
        },

      ]
  },
  {
      plan: "Empresa",
      price: "S/ 3800 más IGV",
      recommended: false,
      features: [
        {
          description: "Crear hasta 10 publicaciones",
          check: true,
      },
      {
        description: "Accede una lista de 50 postulantes preprocesadas por IA",
        check: true,
    },
      {
          description: "Revisa CV's y datos del postulante",
          check: true,
      },
      {
        description: "Accede a datos de contacto",
        check: true,
    },

      {
          description: "Crea/elimina usuarios",
          check: true,
      },

      {
          description: "Avisos confidenciales",
          check: true,
      },
      {
        description: "Acceso a proceso de selección avanzado",
        check: true,
    },
    {
      description: "Acceso a multiposting de publicación",
      check: true,
    },
      ]
  },
  {
      plan: "Corporativo",
      price: "Contácta a un asesor",
      recommended: true,
      features: [
        {
          description: "Crear hasta 100 publicaciones",
          check: true,
      },
      {
        description: "Accede una lista de 200 postulantes preprocesadas por IA",
        check: true,
    },
      {
          description: "Revisa CV's y datos del postulante",
          check: true,
      },
      {
        description: "Accede a datos de contacto",
        check: true,
    },

      {
          description: "Crea/elimina usuarios",
          check: true,
      },

      {
          description: "Avisos confidenciales",
          check: true,
      },
      {
        description: "Acceso a proceso de selección avanzado",
        check: true,
    },
    {
      description: "Acceso a multiposting de publicación",
      check: true,
    },
      ]
  },
];

export default function SectionPrice(props) {
  return (
    <section className={style.container}>
      <div className={style.content}>
        <div className={style.p}>
          <Title>¿Qué planes ofrecemos?</Title>
          {/* <p variant="dark">
            Prueba la plataforma en demo y coméntanos tu experiencia.
            <br></br>
            <b>
              Suscríbete ahora y sé parte de la primera plataforma digital
              inteligente de reclutamiento.
            </b>
          </p> */}
        </div>
        <h3 variant="dark">
          Suscríbete ahora y sé parte de la primera plataforma digital
          inteligente de reclutamiento.
        </h3>
        <div className={style.cards}>
          {CARDS_DATA.map((item, index) => (
            <Card key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
