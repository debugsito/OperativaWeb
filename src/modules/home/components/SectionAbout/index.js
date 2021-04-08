import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { about } from "../../images2";


const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
        backgroundImage: `url(${about})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    },
    containerTitle: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    titleAbout: {
        [theme.breakpoints.down('sm')]: {
            marginTop: '1rem',
            fontSize: '1.5rem',
        },
        [theme.breakpoints.up('md')]: {
            marginTop: '4rem',
            fontSize: '3.10rem',
        },
        marginBottom: '0.5rem',
        fontFamily: "Roboto-Bold",

    },
    lineRed: {
        [theme.breakpoints.down('sm')]: {
            borderBottom: '6px solid #EF1C40',
            width: '4.5rem',
        },
        [theme.breakpoints.up('md')]: {
            borderBottom: '8px solid #EF1C40',
            width: '6.5rem',
        },

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
            <div className={classes.containerTitle}>
                <h1 className={classes.titleAbout}>Sobre Nosotros</h1>
                <div className={classes.lineRed} />
            </div>
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
