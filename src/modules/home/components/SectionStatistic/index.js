import React from 'react'
import { Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { about, statisticOne, statisticTwo, statisticThree } from "../../images2";

import { StatisticCard, SectorList } from "../";

const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
        backgroundImage: `url(${about})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        padding:'1rem 1rem 0 1rem'
    },
    containerCards: {
        [theme.breakpoints.down('sm')]: {
            margin:'0 1.5rem',
            display: 'grid',
            gridGap: '0.5rem',
            gridTemplateColumns: '1fr',
            gridTemplateRows:'1fr 1fr 1fr',
        },
        [theme.breakpoints.up('md')]: {
            width: '100%',
            display: 'grid',
            gridGap: '1rem',
            gridTemplateColumns: 'repeat(11, 1fr)'
        },
    },
    
    itemCardOne: {
        [theme.breakpoints.down('sm')]: {
           
        },
        [theme.breakpoints.up('md')]: {
           gridColumn: '2 / 5'
        },
    },
    itemCardTwo: {
         [theme.breakpoints.down('sm')]: {
           
        },
        [theme.breakpoints.up('md')]: {
           gridColumn: '5 / 8'
        },
    },
    itemCardThree: {
         [theme.breakpoints.down('sm')]: {
           
        },
        [theme.breakpoints.up('md')]: {
            gridColumn: '8 / 11'
        },
    },
    containerText: {
         [theme.breakpoints.down('sm')]: {
            textAlign: 'center',
            '& h1': {
                fontFamily: 'Roboto-bold',
                fontSize: '1.2rem',
            },
            '& h3': {
                fontFamily: 'Roboto-light',
                fontSize: '1rem',
            }
        },
        [theme.breakpoints.up('md')]: {
            marginTop: '3rem',
            textAlign: 'center',
            lineHeight: '1rem',
            '& h1': {
                fontFamily: 'Roboto-bold',
            },
            '& h3': {
                fontFamily: 'Roboto-light',
                fontSize: '1.5rem',
            }
        },
    },

}))

export default function SectionStatistic(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.containerCards}>
                <div className={classes.itemCardOne}>
                    <StatisticCard
                        image={statisticOne}
                        number="5000"
                        text={<small>Registro de <strong>postulantes</strong></small>}
                    />
                </div>
                <div className={classes.itemCardTwo}>
                    <StatisticCard
                        image={statisticTwo}
                        number="500"
                        text={<small>Socios <strong>estratégicos</strong></small>}
                    />
                </div>
                <div className={classes.itemCardThree}>
                    <StatisticCard
                        image={statisticThree}
                        number="600"
                        text={<small>Cantidad de <strong>colocaciones</strong></small>}
                    />
                </div>
            </div>
            <div className={classes.containerText} >
                <Hidden smDown>
                    <h1>Nuestra plataforma está segmentada por los </h1>
                    <h3>sectores productivos de mayor demanda laboral</h3>
                </Hidden>
                <Hidden mdUp>
                    <h1>Nuestra plataforma está segmentada por los sectores productivos de mayor demanda laboral</h1>
                </Hidden>
                
            </div>
            <SectorList />
        </div>
    )
}
