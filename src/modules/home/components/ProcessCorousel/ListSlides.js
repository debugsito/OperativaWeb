import React from 'react'
import Carousel from 'react-material-ui-carousel'
import "./index.css";
import { makeStyles } from '@material-ui/core';
import DescriptionSlide from "./DescriptionSlide";
import { numberOne, numberTwo, numberThree, numberFour, numberFive, imgOne, imgTwo, imgThree, imgFour, imgFive } from "../../images2";

const slides = [
    {
        numberImg: numberOne,
        text: <div className="slide__containerText"><h2 className="slide__title-bold">Registrate como</h2><h2 className="slide__title-light">empresa en operativa.pe</h2></div>,
        img: imgOne,
    },
    {
        numberImg: numberTwo,
        text: <div className="slide__containerText"><h2 className="slide__title-bold">Busca candidatos</h2><h2 className="slide__title-light">según el rubro necesario</h2></div>,
        img: imgTwo,
    },
    {
        numberImg: numberThree,
        text: <div className="slide__containerText"><h2 className="slide__title-bold">Revisa y analiza</h2><h2 className="slide__title-light">su perfil profesional</h2></div>,
        img: imgThree,
    },
    {
        numberImg: numberFour,
        text: <div className="slide__containerText"><h2 className="slide__title-bold">Selecciona tus</h2><h2 className="slide__title-light">mejores candidatos</h2></div>,
        img: imgFour,
    },
    {
        numberImg: numberFive,
        text: <div className="slide__containerText"><h2 className="slide__title-bold">Contacta a</h2><h2 className="slide__title-light">tus postulantes</h2></div>,
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
        gridTemplateColumns: '2fr 4fr 4fr 2fr',
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            flexDirection: 'column-reverse',
            alignItems: 'center',
            justifyContent: 'center'

        }
    },
    slideContainerText: {
        gridColumn: '2/3',
    },
    slideImg: {
        gridColumn: '3/4',
        height: '350px',
        [theme.breakpoints.down('sm')]: {
            height: '200px'
        },
    }
}))

export default function ListSlides() {
    return (
        <div className="container-slider">
            <Carousel
                className="ourProcessSlides"
                navButtonsAlwaysInvisible={true}
                interval={3000}
                indicatorIconButtonProps={{
                    style: {
                        padding: '10px',    // 1
                    },
                }}
                indicatorContainerProps={{
                    style: {
                        marginTop: '1rem', // 5
                    }

                }}

            >
                {
                    slides.map((slide, index) => <Slide slide={slide} index={index} />)
                }
            </Carousel>
        </div>
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
