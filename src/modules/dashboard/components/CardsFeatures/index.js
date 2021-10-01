import React from 'react'
import { Typography, makeStyles } from '@material-ui/core';
import { CardPremiumIconOne, CardPremiumIconTwo, CardPremiumIconThree, CardPremiumIconFour } from "../../images";

const CARDS = [
    { id: 0, icon: CardPremiumIconOne, description: "Multiposting (N días de búsqueda en redes)" },
    { id: 1, icon: CardPremiumIconTwo, description: "Envía prueba técnica de experiencia y conocimiento específicos." },
    { id: 2, icon: CardPremiumIconThree, description: "Solicita a verifiación de antecedentes penales." },
    { id: 3, icon: CardPremiumIconFour, description: "Envía template de agradecimiento." },
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
    }

}))

export default function CardsFeatures(props) {
    const classes = useStyles()

    return (
        <div className={classes.containerCard}>
            {
                CARDS.map(item => (
                    <div className={classes.card}>
                        <img src={item.icon} />
                        <Typography>{item.description}</Typography>
                    </div>
                ))
            }
        </div>

    )
}
