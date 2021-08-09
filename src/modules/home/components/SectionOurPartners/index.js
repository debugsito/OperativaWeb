import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { TitleWithLine } from "../";
import PartnersList from "./PartnersList";

const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
        fontFamily: "var(--fontFamily)",
    },
    containerText: {
        margin: '2rem auto',
        textAlign: 'center',
        color: "#3e3d3d",
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.9rem',
            width: '85%',
            lineHeight: '1.5rem'
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '1.3rem',
            width: '80%',
            fontWeight: 370,
            lineHeight: '2rem'
        },
    },
    containerCarousel: {
        [theme.breakpoints.down('sm')]: {
            marginTop: '3.5rem'
        },
        [theme.breakpoints.up('md')]: {
            marginTop: '5rem'
        },

    }
}))

export default function SectionOurPartners(props) {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <TitleWithLine colorLine="#EF1C40">Nuestros<br />Socios Estratégicos</TitleWithLine>
            <div className={classes.containerText}>
                <p>
                    En colaboración con nuestros socios estratégicos a nivel nacional, Municipalidades, ONGs, Instituciones, acercamos a miles de operarios, con el propósito de reducir el índice de desempleo, promover la oportunidad laboral y centralizar las ofertas de empleo formal.
                </p>
            </div>
            <div className={classes.containerCarousel}>
                <PartnersList />
            </div>
        </div>
    )
}
