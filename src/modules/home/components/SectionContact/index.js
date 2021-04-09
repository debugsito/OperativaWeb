import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { bgContact } from "../../images2";
import { Footer } from "../";

const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
        display: 'grid',
        gridTemplateRows: '1fr 6fr 1fr'
    },
    cardContainer: {
        gridRow: '2/3',
        margin: '0 auto',
        boxShadow: '0px 1px 11px #2958a329',
        borderRadius: '11px',
        width: '80%',
        height: '95%'
    },
    cardContact: {
        height: '100%',
        display: 'grid',
        gridGap: '2rem',
        gridTemplateColumns: '1fr 1fr'
    },
    sectionOne: {
        backgroundImage: `url(${bgContact})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
    },
    sectionContainer: {
        height: '85%',
        color: 'white',
        margin: '2rem 3rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    containerTitle: {
        lineHeight: '1rem'
    },
    titleBold: {
        fontFamily: 'Roboto-bold',
        fontSize: '2.3rem'
    },
    titleLight: {
        fontFamily: 'Roboto-light',
    },
    atention: {
        lineHeight: '1rem'
    },
    footer: {
        gridRow: '3/4',
    }
}))

export default function SectionContact(props) {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <div className={classes.cardContainer}>
                <div className={classes.cardContact}>
                    <div className={classes.sectionOne}>
                        <div className={classes.sectionContainer}>
                            <div className={classes.containerTitle}>
                                <h1 className={classes.titleBold}>Consúltanos</h1>
                                <h1 className={classes.titleLight}>tus dudas</h1>
                            </div>
                            <div className={classes.atention}>
                                <h3>Horario de atención</h3>
                                <p>Lunes a Viernes</p>
                                <p>9am a 6pm</p>
                            </div>
                        </div>
                    </div>
                    <div className={classes.sectionTwo}>
                        <h2>Soy...</h2>
                    </div>
                </div>

            </div>
            <div className={classes.footer}>
                <Footer />
            </div>
        </div>
    )
}
