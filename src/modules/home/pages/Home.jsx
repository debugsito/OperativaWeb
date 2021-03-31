import React from 'react';
import { CssBaseline, Grid, Container } from '@material-ui/core';
import { makeStyles} from '@material-ui/core/styles';

import bgImage from "../assets/images/bg.png"
import operativaLogo from "../assets/images/operativa_logo.png"
import sectoresGif from "../assets/images/sectores.gif"

const useStyles = makeStyles(theme => ({
    root:{
        minHeight: '100vh',
        backgroundImage: `url(${bgImage})`,
        backgroundRepeat:'no-repeat',
        backgroundSize:'cover',
        backgroundPosition: 'center center',
    },
    sectoresGif:{
        width: '38rem',
        textAlign: 'center'
    },
    titleBold:{
        fontFamily: 'Roboto-Bold, serif',
        color:'#fff',
    },
    titleLight:{
        fontFamily: 'Roboto-Light, serif',
        color:'#fff',
    }
}))

const Home = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={12} md={6}>
                    <div>
                        <img src={operativaLogo}/>
                        <h1 className={classes.titleBold}>Primera Plataforma digital</h1>
                        <h1 className={classes.titleLight}>inteligente de reclutamiento</h1>
                    </div>
                </Grid>
                <Grid item xs={12} md={6}>
                    <img src={sectoresGif} className={classes.sectoresGif}/>
                </Grid>
            </Grid>
        </div>
        
    )
}

export default Home;
