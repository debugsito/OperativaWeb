import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { AnimatedCounter } from '../';

const useStyles = makeStyles(theme => ({
    rootCard: {

        [theme.breakpoints.down('sm')]: {
            background: "#FFFFFF 0% 0% no-repeat padding-box",
            boxShadow: '0px 3px 6px #2958a329',
            borderRadius: '10px',
            opacity: 1,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            paddingRight: '1rem',
        },
        [theme.breakpoints.up('md')]: {
            background: "#FFFFFF 0% 0% no-repeat padding-box",
            boxShadow: '0px 3px 6px #2958a329',
            borderRadius: '11px',
            opacity: 1,
            marginTop: '1rem',
            padding: '0.5rem 1.5rem 0.5rem 1rem',
            display: 'grid',
            gridGap: '0.5rem',
            gridTemplateColumns: '1fr 1fr 1fr',
        },
    },
    imgCard: {
        [theme.breakpoints.down('sm')]: {
            height: '60%',
            margin: 'auto 0',
            display: 'flex',
            justifyContent: 'center',
        },
        display: 'flex',
        justifyContent: 'center',


    },
    numberCard: {
        margin: 'auto 0',
        fontWeight: 500,
        color: '#E20613',
        [theme.breakpoints.down('sm')]: {
            fontSize: '2.10rem',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '3.10rem',
        },
    },
    textCard: {
        margin: 'auto 0',
        color: '#3E3D3D',

        [theme.breakpoints.down('sm')]: {
            fontSize: '1.1rem',
        },
        [theme.breakpoints.up('md')]: {
            lineHeight: '1.2rem',
            fontSize: '22px',
        },

    }
}))

export default function StatisticCard({ image, number, text, inView }) {
    const classes = useStyles();
    return (
        <div className={classes.rootCard}>
            <div className={classes.imgCard}>
                <img src={image} />
            </div>
            {
                inView &&
                <AnimatedCounter number={number} duration={5000} />
            }
            <div className={classes.textCard}>
                {text}
            </div>
        </div>
    )
}
