import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    rootCard: {
        [theme.breakpoints.down('sm')]: {
            width: '80px',
            boxShadow: '3px 7px 11px #122e5a29',
            borderRadius: '10px',
            border: 0,
        },
        [theme.breakpoints.up('md')]: {
            width: '190px',
            boxShadow: '3px 7px 11px #122e5a29',
            borderRadius: '11px',
            border: 0,
        },
    },
    cardImg: {
        width: '100%'
    },
    cardText: {
        [theme.breakpoints.down('sm')]: {
            textAlign: 'center',
            fontFamily: "Roboto-medium",
            color: '#7C7B7B',
            fontSize: '0.6rem',
            padding: '0 0.5rem',
        },
        [theme.breakpoints.up('md')]: {
            textAlign: 'center',
            margin: '2rem 0',
            padding: '0 1.5rem',
            lineHeight: '1.5rem',
            fontFamily: "Roboto-medium",
            color: '#7C7B7B',
        },
    }
}))

export default function SectorCard({ text, image, index }) {
    const classes = useStyles()

    return (
        <div className={classes.rootCard} key={index}>
            <div className={classes.cardContainerImg}>
                <img src={image} className={classes.cardImg} />
            </div>
            <div className={classes.cardText}>
                <p>{text}</p>
            </div>
        </div>
    )
}
