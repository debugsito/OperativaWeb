import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { bgContact, bgContactMovil } from "../../images2";
import { FooterMain, ContactForm } from "../";

const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
        display: 'grid',
        gridTemplateRows: '1fr 6fr 1fr',
        fontFamily: 'Roboto, sans-serif',
    },
    cardContainer: {
        [theme.breakpoints.down('sm')]: {
            gridRow: '1/3',
            margin: '0 auto',
            boxShadow: '0px 1px 11px #2958a329',
            borderRadius: '11px',
            width: '100%',
            height: '100%',
        },
        [theme.breakpoints.up('md')]: {
            gridRow: '2/3',
            margin: '0 auto',
            boxShadow: '0px 1px 11px #2958a329',
            borderRadius: '11px',
            width: '85%',
            height: '95%',
        }
    },
    cardContact: {
        height: '100%',
        [theme.breakpoints.down('sm')]: {
            display: 'grid',
            gridTemplateRows: '1fr 1fr'
        },
        [theme.breakpoints.up('md')]: {
            display: 'grid',
            gridGap: '2rem',
            gridTemplateColumns: '1fr 1fr',
        }

    },
    sectionOne: {
        [theme.breakpoints.down('sm')]: {
            backgroundImage: `url(${bgContactMovil})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
        },
        [theme.breakpoints.up('md')]: {
            backgroundImage: `url(${bgContact})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
        },


    },
    sectionTwo: {

    },
    sectionOneContainer: {
        [theme.breakpoints.down('sm')]: {
            color: 'white',
            margin: '0 1rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            marginBottom: '5rem'
        },
        [theme.breakpoints.up('md')]: {
            height: '85%',
            color: 'white',
            margin: '2rem 3rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        },
    },
    containerTitle: {
        lineHeight: '1rem'
    },
    titleBold: {
        fontWeight: 700,
        fontSize: '2.3rem',
        [theme.breakpoints.down('sm')]: {
            fontSize: '2rem'
        },
    },
    titleLight: {
        fontWeight: 500,
        [theme.breakpoints.down('sm')]: {
            fontSize: '1.5rem'
        },
    },
    atention: {
        lineHeight: '1rem',
        '& h3': {
            fontWeight: 700,
        },
        [theme.breakpoints.down('sm')]: {
            lineHeight: '0.6rem',
            '& h2': {
                fontSize: '1rem'
            }
        },
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
                        <div className={classes.sectionOneContainer}>
                            <div className={classes.containerTitle}>
                                <h1 className={classes.titleBold}>Consúltanos</h1>
                                <h1 className={classes.titleLight}>tus dudas</h1>
                            </div>
                            <div className={classes.atention}>
                                <h2>Horario de atención</h2>
                                <p>Lunes a Viernes</p>
                                <p>9am a 6pm</p>
                            </div>
                        </div>
                    </div>
                    <div className={classes.sectionTwo}>
                        <ContactForm />
                    </div>
                </div>
            </div>
            <div className={classes.footer}>
                <FooterMain />
            </div>
        </div>
    )
}
