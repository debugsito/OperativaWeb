import React from 'react'
import { Hidden, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";

import bgImage from "../../assets/images/bg.png"
import operativaLogo from "../../assets/images/operativa_logo.png"
import sectoresGif from "../../assets/images/sectores.gif"

import { ButtonHome, FeatureCard } from "../";
import { featureOne, featureTwo, featureThree, backgroundMovil, logoMovil } from "../../images2";

const useStyles = makeStyles(theme => ({
    root: {
        minHeight: '100vh',
        backgroundImage: `url(${bgImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
    },
    gifScreen: {
        width: '30rem',
        margin: '0 auto'
    },
    titleBold: {
        fontFamily: 'Roboto-Bold, sans-serif',
        marginBottom: '0.5rem',
        fontSize: '2.5rem',
        color: '#fff',
    },
    titleLight: {
        fontWeight: 100,
        marginTop: '0.5rem',
        fontSize: '2.5rem',
        color: '#fff',
    },
    content: {
        marginLeft: '5rem'
    },
    contentButtons: {
        marginTop: '3rem',
        display: 'flex'
    },
    marginLeft: {
        marginLeft: '3rem'
    },
    containerCards: {
        marginLeft: '5rem',
        display: 'grid',
        gridGap: '1rem',
        gridTemplateColumns: '1fr 1fr 1fr',
    },

    rootMovil: {
        height: '100vh',
        display: 'grid',
        gridTemplateRows: 'repeat(12, 1fr)',
        gridTemplateColumns: '1fr'
    },
    sectionOneMovil: {
        gridRowStart: 1,
        gridRowEnd: 3,
        margin: '1rem',
        display: 'flex',
        flexDirection: 'column'
    },
    sectionTwoMovil: {
        gridRowStart: 4,
        gridRowEnd: 13,
        backgroundImage: `url(${backgroundMovil})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    },
    gifMovil: {
        width: '6rem',
        margin: '0 auto',
    },
    containerLogoMovil: {
        marginBottom: '1rem',
        display: 'flex',
        justifyContent: 'flex-start'
    },
    containerButtons: {
        margin: '0 1.2rem',
        display: 'grid',
        gridGap: '1rem',
        gridTemplateColumns: '1fr 1fr',
    },
    containerTitleMovil: {
        marginTop: '4.5rem',
        textAlign: 'center'
    },
    titleBoldMovil: {
        fontWeight: 700,
        marginBottom: '0.5rem',
        fontSize: '1.5rem',
        color: '#fff',
    },
    titleLightMovil: {
        fontWeight: 200,
        marginTop: '0.5rem',
        fontSize: '1.4rem',
        color: '#fff',
    },
    containerCardsMovil: {
        marginTop: '0.5rem',
        display: 'grid',
        justifyItems: 'center',
        gridGap: '0.5rem',
        gridTemplateRows: '1fr 1fr 1fr'
    }
}))

export default function SectionHeader(props) {
    const classes = useStyles();
    const history = useHistory()
    return (
        <>
            <Hidden smDown>
                <div className={classes.root}>
                    <Grid container alignItems="center">
                        <Grid item xs={12} md={6}>
                            <div className={classes.content}>
                                <img src={operativaLogo} />
                                <h1 className={classes.titleBold}>Primera plataforma digital</h1>
                                <h1 className={classes.titleLight}>inteligente de reclutamiento</h1>
                                <div className={classes.contentButtons}>
                                    <div>
                                        <ButtonHome onClick={() => history.push('/tipo-de-cuenta')}>Crea tu cuenta</ButtonHome>
                                    </div>
                                    <div className={classes.marginLeft}>
                                        <ButtonHome onClick={() => history.push('/iniciar-sesion')}>Inicia sesión</ButtonHome>
                                    </div>
                                </div>


                            </div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <img src={sectoresGif} className={classes.gifScreen} />
                        </Grid>
                        <Grid item xs={12} md={10}>
                            <div className={classes.containerCards}>
                                <FeatureCard text="Inmediatez de identificacion del personal requerido" img={featureOne} />
                                <FeatureCard text="Trabajo segmentado por sectores productivos" img={featureTwo} />
                                <FeatureCard text="Prediccion de tiempo de contratación" img={featureThree} />
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </Hidden>
            <Hidden mdUp>
                <div className={classes.rootMovil}>
                    <div className={classes.sectionOneMovil}>
                        <div className={classes.containerLogoMovil}>
                            <img src={logoMovil} />
                        </div>
                        <img src={sectoresGif} className={classes.gifMovil} />
                    </div>
                    <div className={classes.sectionTwoMovil}>
                        <div className={classes.containerTitleMovil}>
                            <h1 className={classes.titleBoldMovil}>Primera Plataforma digital</h1>
                            <h1 className={classes.titleLightMovil}>inteligente de reclutamiento</h1>
                        </div>
                        <div className={classes.containerButtons}>
                            <ButtonHome onClick={() => history.push('/tipo-de-cuenta')}>Crea tu cuenta</ButtonHome>
                            <ButtonHome onClick={() => history.push('/iniciar-sesion')}>Inicia sesión</ButtonHome>
                        </div>
                        <div className={classes.containerCardsMovil}>
                            <FeatureCard text="Inmediatez de identificacion del personal requerido" img={featureOne} />
                            <FeatureCard text="Trabajo segmentado por sectores productivos" img={featureTwo} />
                            <FeatureCard text="Prediccion de tiempo de contratación" img={featureThree} />
                        </div>

                    </div>
                </div>
            </Hidden>

        </>

    )
}
