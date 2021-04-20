import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { TitleWithLine } from "../";
import PartnersList from "./PartnersList";

const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
    },
    containerText: {
        margin: '1rem auto',
        textAlign: 'center',
        color: "#3e3d3d",
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.9rem',
            width: '95%'
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '1.3rem',
            width: '80%',
            fontWeight: 370,
        },
    },
    containerCarousel: {
        marginTop: '5rem'
    }
}))

export default function SectionOurPartners(props) {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <TitleWithLine colorLine="#EF1C40">Nuestros<br />Socios Estratégicos</TitleWithLine>
            <div className={classes.containerText}>
                <p>
                    Junto a nuestros SOCIOS ESTRATÉGICOS, MUNICIPALIDADES, ONG ́s e INSTITUTOS, acercamos a miles de operarios en la búsqueda permanente de empleo debido a la dispersión de bolsas de trabajo que no centralizan las ofertas de empleo y en lugar de facilitar la búsqueda, terminan haciendo más complejo el proceso de encuentro entre la oferta y demanda
                    laboral.
                </p>
            </div>
            <div className={classes.containerCarousel}>
                <PartnersList />
            </div>
        </div>
    )
}
