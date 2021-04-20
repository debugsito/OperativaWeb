import React from 'react'
import { makeStyles } from '@material-ui/core';
import DescriptionSlide from "./DescriptionSlide";
import Carousel from 'react-material-ui-carousel'
import { numberOne, numberTwo, numberThree, numberFour, numberFive, imgOne, imgTwo, imgThree, imgFour, imgFive } from "../../images2";
import "./index.css";

const slides = [
    {
        numberImg: numberOne,
        text: <h2>Registrate como <br /> empresa en operativa.pe</h2>,
        img: imgOne,
    },
    {
        numberImg: numberTwo,
        text: <h2>Registrate como <br /> empresa en operativa.pe</h2>,
        img: imgTwo,
    },
    {
        numberImg: numberThree,
        text: <h2>Registrate como <br /> empresa en operativa.pe</h2>,
        img: imgThree,
    },
    {
        numberImg: numberFour,
        text: <h2>Registrate como <br /> empresa en operativa.pe</h2>,
        img: imgFour,
    },
    {
        numberImg: numberFive,
        text: <h2>Registrate como <br /> empresa en operativa.pe</h2>,
        img: imgFive,
    }
]

const useStyles = makeStyles(theme => ({
    slider: {

    },
    slideContent: {
        scrollSnapAlign: 'start',
        flexShrink: 0,
        width: '100%',
        marginRight: '50px',
        borderRadius: '10px',

        display: 'grid',
        gridTemplateColumns: '4fr 4fr 2fr',
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            flexDirection: 'column-reverse',
            alignItems: 'center',
            justifyContent: 'center'

        }
    },
    slideContainerText: {
        gridColumn: '1/2',
    },
    slideImg: {
        gridColumn: '2/3',
        width: '400px',
        [theme.breakpoints.down('sm')]: {
            width: '200px',
        },
    }
}))

export default function ListSlides() {
    const classes = useStyles();

    return (
        <Carousel
            className={classes.slider}
            navButtonsAlwaysInvisible={true}
            interval={3500}
        >
            {
                slides.map((slide, index) => <Slide slide={slide} index={index} />)
            }
        </Carousel>
    )
}

function Slide(props) {
    const classes = useStyles();

    return (
        <div id={`slide-${props.index + 1}`} className={classes.slideContent} key={props.index}>
            <div className={classes.slideContainerText}>
                <DescriptionSlide numberImg={props.slide.numberImg} text={props.slide.text} />
            </div>
            <img src={props.slide.img} className={classes.slideImg} />
        </div>
    )
}
