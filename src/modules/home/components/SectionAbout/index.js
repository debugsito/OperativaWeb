import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { TitleWithLine } from "../";
import { about } from "../../images2";


const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
        backgroundImage: `url(${about})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    },

    containerText: {
        margin: '2rem auto',
        [theme.breakpoints.down('sm')]: {
            width: '95%',
        },
        [theme.breakpoints.up('md')]: {
            width: '60%',
        },
    },
    text: {
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.9rem',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '1.3rem',
        },
        color: '#373737',
        textShadow: '0px 3px 56px #ffffffa8',
        fontFamily: "Roboto-Light",
        textAlign: 'center',
        lineHeight: '2rem'

    },
}))

export default function SectionAbout(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <TitleWithLine color="#EF1C40">
                Sobre Nosotros
            </TitleWithLine>
            <div className={classes.containerText}>
                <p className={classes.text}>
                    Para las empresas de RRHH la problemática se agudiza en los procesos de selección
                    masivo – operario debido a su alta tasa de rotación, los procesos de selección se vuelven
                    permanentes y de repetidas actividades.
                </p>
                <p className={classes.text}>
                    Es por ello que el Ministerio de la Producción mediante el programa Innóvate Perú financian en
                    Octubre del 2020 el proyecto Operativa, un join venture de la Start Up Verificativa y
                    la PUCP con fines de investigación para el desarrollo de una ambiciosa solución de reclutamiento de selección personal en Perú,
                    con impacto social que permitirá una mejora sustancial en la forma y modo en que las personas
                    buscan y aspiran a un empleo formal de puestos de operarios, ahorrando costos de movilidad,
                    documentos y tiempo, con trabajo de acorde a sus expectativas.
                </p>
            </div>
        </div>
    )
}
