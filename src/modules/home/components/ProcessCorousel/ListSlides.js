import React from 'react'
import { makeStyles } from '@material-ui/core';
import DescriptionSlide from "./DescriptionSlide";
import { numberOne, numberTwo, numberThree, numberFour, numberFive, imgOne } from "../../images2";

const slides = [
    {
        numberImg: numberOne,
        text: <h1>Registrate como <br /> empresa en operativa.pe</h1>,
        img: imgOne,
    },
    {
        numberImg: numberTwo,
        text: <h1>Registrate como <br /> empresa en operativa.pe</h1>,
        img: imgOne,
    },
    {
        numberImg: numberThree,
        text: <h1>Registrate como <br /> empresa en operativa.pe</h1>,
        img: imgOne,
    },
    {
        numberImg: numberFour,
        text: <h1>Registrate como <br /> empresa en operativa.pe</h1>,
        img: imgOne,
    },
    {
        numberImg: numberFive,
        text: <h1>Registrate como <br /> empresa en operativa.pe</h1>,
        img: imgOne,
    }
]

const useStyles = makeStyles(theme => ({
    slideContent: {
        scrollSnapAlign: 'start',
        flexShrink: 0,
        width: '100%',
        marginRight: '50px',
        borderRadius: '10px',
        transformOrigin: 'center center',
        transform: 'scale(1)',
        transition: 'transform 0.5s',
        position: 'relative',

        display: 'grid',
        gridTemplateColumns: '4fr 4fr 2fr',
    },
    slideTitle: {
        gridColumn: '1/2'
    },
    slideImg: {
        gridColumn: '2/3'
    }
}))

export default function ListSlides() {
    const classes = useStyles()

    return slides.map((slide, index) => (
        <div id={`slide-${index + 1}`} className={classes.slideContent}>
            <div className={classes.slideTitle}>
                <DescriptionSlide numberImg={slide.numberImg} text={slide.text} />
            </div>
            <img src={slide.img} className={classes.slideImg} />
        </div>
    ))
}
