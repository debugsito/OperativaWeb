import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { about, statisticOne, statisticTwo, statisticThree } from "../../images2";

import { StatisticCard, SectorList } from "../";

const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
        backgroundImage: `url(${about})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
    },
    containerCards: {
        width: '100%',
        display: 'grid',
        gridGap: '1rem',
        gridTemplateColumns: 'repeat(11, 1fr)'
    },
    itemCardOne: {
        gridColumn: '2 / 5'
    },
    itemCardTwo: {
        gridColumn: '5 / 8'
    },
    itemCardThree: {
        gridColumn: '8 / 11'
    },
    containerText: {
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
                <h1>Nuestra plataforma está segmentada por los </h1>
                <h3>sectores productivos de mayor demanda laboral</h3>
            </div>
            <br />
            <SectorList />

        </div>
    )
}
