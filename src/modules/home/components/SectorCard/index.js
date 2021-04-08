import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    rootCard: {
        width: '190px',
        boxShadow: '3px 7px 11px #122e5a29',
        borderRadius: '11px',
        border: 0,
    },
    cardContainerImg: {

    },
    cardImg: {
        width: '100%'
    },
    cardText: {
        textAlign: 'center',
        margin: '2rem 0',
        padding: '0 1.5rem',
        lineHeight: '1.5rem',
        fontFamily: "Roboto-medium",
        color: '#7C7B7B',
    }
}))

export default function SectorCard({ text, image }) {
    const classes = useStyles()

    return (
        <div className={classes.rootCard}>
            <div className={classes.cardContainerImg}>
                <img src={image} className={classes.cardImg} />
            </div>
            <div className={classes.cardText}>
                <p>{text}</p>
            </div>
        </div>
    )
}
