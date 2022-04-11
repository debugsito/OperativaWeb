import Title from "./Title";
import SubTitle from "./SubTitle";
import Card from "./Card";
import style from "../styleshome/components_styles/Section_Price.module.scss";

const CARDS_DATA = [
  {
    plan: "Free",
    textcost :"Costo por aviso",
    price: "S/ 0",
    comment:"Publicando hasta 2 avisos, Cada aviso te muestra hasta 20 postulantes procesados por IA.",
    price2: "Precio mes S/ 0",
    recommended: false,
    features: [
      {
        description: "Crear hasta 2 publicaciones",
        check: true,
    },
    {
      description: "Accede una lista de hasta 20 postulantes preprocesadas por IA",
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
      textcost :"Costo promedio por aviso",
      price: "S/ 250.00",
      comment:"Publicando hasta 10 avisos, Cada aviso te muestra hasta 50 postulantes procesados por IA.",
      price2: "Precio mes S/ 2500 más IGV",
      recommended: false,
      features: [
          {
              description: "Crear hasta 10 publicaciones",
              check: true,
          },
          {
            description: "Accede una lista de hasta 50 postulantes preprocesadas por IA",
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
          check: false,
        },

      ]
  },
  {
      plan: "Empresa",
      textcost :"Costo promedio por aviso",
      price: "S/ 160.00",
      comment:"Publicando hasta 20 avisos, Cada aviso te muestra hasta 120 postulantes procesados por IA.",
      price2: "Precio mes S/ 3200 más IGV",
      recommended: true,
      features: [
        {
          description: "Crear hasta 20 publicaciones",
          check: true,
      },
      {
        description: "Accede una lista de 120 postulantes preprocesadas por IA",
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
      comment:"Para publicaciones de 100 avisos a más, Cada aviso te muestra hasta 200 postulantes procesados por IA.",
      recommended: false,
      features: [
        {
          description: "Crea más de 100 publicaciones al mes",
          check: true,
      },
      {
        description: "Accede una lista de hasta 200 postulantes preprocesadas por IA",
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
