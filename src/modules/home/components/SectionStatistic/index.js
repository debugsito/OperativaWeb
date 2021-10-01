import React, { useRef, useEffect } from 'react'
import { Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { about, statisticOne, statisticTwo, statisticThree } from "../../images2";
import { useIntersectionObserver } from "../../../hooks";

import { StatisticCard, SectorList } from "../";

const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
        backgroundImage: `url(${about})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        padding: '1rem 1rem 0 1rem',
        fontFamily: "var(--fontFamily)",
        color: "#212529"
    },
    containerCards: {
        [theme.breakpoints.down('sm')]: {
            margin: '0 1.5rem',
            display: 'grid',
            gridGap: '0.5rem',
            gridTemplateColumns: '1fr',
            gridTemplateRows: '1fr 1fr 1fr',
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
                fontWeight: 900,
                fontSize: '1.2rem',
            },
            '& h3': {
                fontWeight: 300,
                fontSize: '1rem',
            }
        },
        [theme.breakpoints.up('md')]: {
            marginTop: '3rem',
            textAlign: 'center',
            lineHeight: '1rem',
            '& h1': {
                fontWeight: 900,
            },
            '& h3': {
                fontWeight: 300,
                fontSize: '1.5rem',
            }
        },
    },

}))

export default function SectionStatistic(props) {
    const classes = useStyles();
    const elementRef = useRef(null);
    //para las animaciones de los cards
    const [inView, entry] = useIntersectionObserver(elementRef, {
        threshold: 0
    });

    return (
        <div className={classes.root}>
            <div className={classes.containerCards} ref={elementRef}>
                <div className={classes.itemCardOne}>
                    <StatisticCard
                        image={statisticOne}
                        number={5000}
                        text={<small>Registro de <strong>postulantes</strong></small>}
                        inView={inView}
                    />
                </div>
                <div className={classes.itemCardTwo}>
                    <StatisticCard
                        image={statisticTwo}
                        number={500}
                        text={<small>Socios <strong>estratégicos</strong></small>}
                        inView={inView}
                    />
                </div>
                <div className={classes.itemCardThree}>
                    <StatisticCard
                        image={statisticThree}
                        number={600}
                        text={<small>Cantidad de <strong>colocaciones</strong></small>}
                        inView={inView}
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
