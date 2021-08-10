import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { TitleWithLine } from "../";
import { about } from "../../images2";


const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
        [theme.breakpoints.down('sm')]: {
            marginTop: "2rem",
        },
    },

    containerText: {
        margin: '2rem auto',
        [theme.breakpoints.down('sm')]: {
            width: '85%',
        },
        [theme.breakpoints.up('md')]: {
            width: '80%',
        },
    },
    textParrafo: {
        color: "#373737",
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.85rem',
            lineHeight: '1.4rem'
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '1.3rem',
            fontWeight: 300,
            lineHeight: '2rem'
        },
        // textShadow: '0px 3px 56px #ffffffa8',
        textAlign: 'justify',


    },
}))

export default function SectionAbout(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <TitleWithLine colorLine="#EF1C40" colorText="#212529">
                Sobre Nosotros
            </TitleWithLine>
            <div className={classes.containerText}>
                <p className={classes.textParrafo}>
                    <b>INNOVATE PERÚ</b> y el <strong>MINISTERIO DE LA PRODUCCIÓN</strong> denominan ganador a <strong>OPERATIVA</strong>, como la <strong>1era Plataforma Tecnológica con IA que automatiza los procesos masivos de reclutamiento operario</strong>, segmentada por sectores productivos y que predice el tiempo de permanencia del trabajador en la empresa.
                </p>
                <p className={classes.textParrafo}>
                    <b>OPERATIVA</b> nace ante la necesidad de vincular a las personas que buscan empleo operario y a las empresas de sector productivo, de tal manera que los primeros encuentren un trabajo formal y los segundos cubran sus vacantes operarias mediante un proceso rápido y seguro en un entorno digital.
                </p>
                <p className={classes.textParrafo}>
                    <b>OPERATIVA</b> en joint venture con la Universidad Católica y la start-up VERIFICATIVA buscan desarrollar una solución de reclutamiento masivo de selección de personal operario en Perú, con un impacto social que permitirá una mejora sustancial en la forma y modo en que las personas buscan y aspiran a un trabajo formal de acorde a sus expectativas y en la coyuntura actual.
                </p>
            </div>
        </div>
    )
}
