import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { statisticOne } from "../../images2";

const useStyles = makeStyles(theme => ({
    rootCard: {
        background: "#FFFFFF 0% 0% no-repeat padding-box",
        boxShadow: '0px 3px 6px #2958a329',
        borderRadius: '11px',
        opacity: 1,
        marginTop: '2rem',
        padding: '0.5rem 1rem',
        display: 'grid',
        gridGap: '0.5rem',
        gridTemplateColumns: '1fr 1fr 1fr',
    },
    imgCard: {
        display: 'flex',
        justifyContent: 'center'
    },
    numberCard: {
        margin: 'auto 0',
        fontFamily: 'Roboto-medium',
        color: '#E20613',
        fontSize: '3.10rem',
    },
    textCard: {
        margin: 'auto 0',
        fontSize: '20px',
        color: '#3E3D3D',
    }
}))

export default function StatisticCard({ image, number, text }) {
    const classes = useStyles();

    return (
        <div className={classes.rootCard}>
            <div className={classes.imgCard}>
                <img src={image} />
            </div>
            <div className={classes.numberCard}>
                {number}
            </div>
            <div className={classes.textCard}>
                {text}
            </div>
        </div>
    )
}
