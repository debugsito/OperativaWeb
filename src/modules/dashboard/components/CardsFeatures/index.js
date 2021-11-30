import React from 'react'
import { Link } from 'react-router-dom'
import { SessionRoutes } from '../../../shared/libs/sessionRoutes';
import { Typography, makeStyles } from '@material-ui/core';
import { CardPremiumIconOne, CardPremiumIconTwo, CardPremiumIconThree, CardPremiumIconFour } from "../../images";

const CARDS = [
    { id: 0, icon: CardPremiumIconOne, description: "Multiposting (N días de búsqueda en redes)", to:`/multiposting` },
    { id: 1, icon: CardPremiumIconTwo, description: "Envía prueba técnica de experiencia y conocimiento específicos.", to:`/multiposting` },
    { id: 2, icon: CardPremiumIconThree, description: "Solicita a verifiación de antecedentes penales.", to:`/multiposting` },
    { id: 3, icon: CardPremiumIconFour, description: "Envía template de agradecimiento.", to:`/multiposting` },
]

const useStyles = makeStyles(theme => ({
    containerCard: {
        width: "100%",
        display: "flex",
    },
    card: {
        border: "1px solid #E5E5E5",
        boxSizing: "border-box",
        borderRadius: "5px",
        margin: "0.5rem",
        padding: "2rem 1rem",
    },
    link:{
        textDecoration: 'none', color: "#000000DE"
    }

}))

export default function CardsFeatures(props) {
    const classes = useStyles()
    const initRoute = SessionRoutes().initRoute;

    return (
        <div className={classes.containerCard}>
            {
                CARDS.map((item, index) => (
                    <Link to={`${initRoute}${item.to}`} className={classes.link}>
                        <div className={classes.card}>
                            <img src={item.icon} />
                            <Typography>{item.description}</Typography>
                        </div>
                    </Link>
                ))
            }
        </div>

    )
}
