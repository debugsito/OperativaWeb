import React from 'react'
import { makeStyles } from '@material-ui/core'
import ListSlides from "./ListSlides";
import './index.css'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        // display: 'grid',
        // gridTemplateColumns: '1fr 1fr 10fr'
    },
    sliderControls: {
        gridColumn: '2/3',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        '& a': {
            height: '8px',
            width: '8px',
            borderRadius: '50%',
            backgroundColor: '#fff',
            margin: '1rem',
            opacity: 1,
        }
    },
    sliderContainer: {
        gridColumn: '3/4',
        // width: '70%',
        textAlign: 'left',
        overflow: 'hidden',
    },
    slides: {
        display: 'flex',
        overflowX: 'auto',
        // scrollSnapType: 'x mandatory',
        // scrollBehavior: 'smooth',
        // WebkitOverflowScrolling: 'touch',
        // '&::-webkit-scrollbar': {
        //     width: '10px',
        //     height: '10px',
        // },
        // '&::-webkit-scrollbar-track': {
        //     background: 'transparent'
        // },
        // animation: 'carousel 15s linear infinite',
        // '& >div:nth-child(1)': {
        //     // animationName: 'first-picture, carousel',
        //     // animationDuration: '15s',
        //     // animationIterationCount: 'infinite',
        //     // animationDelay: '0s, 15s',
        //     // transform: 'translateX(0%)',
        // },
        // '& >div:nth-child(2)': {
        //     animationDelay: 'Calc(15s * .2)',
        // },
        // '& >div:nth-child(3)': {
        //     animationDelay: 'Calc(15s * .2)',
        // },
        // '& >div:nth-child(4)': {
        //     animationDelay: 'Calc(15s * .2)',
        // },
        // '& >div:nth-child(5)': {
        //     animationDelay: 'Calc(15s * .2)',
        // },
    },
}))

export default function ProcessCorousel(props) {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <ListSlides />
            {/* <div className={classes.sliderControls}>
                <a href="#slide-1"></a>
                <a href="#slide-2"></a>
                <a href="#slide-3"></a>
                <a href="#slide-4"></a>
                <a href="#slide-5"></a>
            </div> */}
            {/* <div className={classes.sliderContainer}>
                <div className={classes.slides}>
                </div>
            </div> */}
        </div>

    )
}
