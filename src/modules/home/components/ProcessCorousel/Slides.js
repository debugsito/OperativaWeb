import React, { useEffect, useState, useRef } from "react";
import { makeStyles } from '@material-ui/core';
import Slide from "./Slide";
import { numberOne, numberTwo, numberThree, numberFour, numberFive, imgOne, imgTwo, imgThree, imgFour, imgFive } from "../../images2";

const slidesData = [
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
    slidesContainer: {
        display: "flex",
        flexDirection: "column",
    },
    slides: {
        position: "relative",
        height: "300px",
        display: "flex",
        justifycontent: "center",
        alignItems: "center",
        [theme.breakpoints.down('sm')]: {
            height: '450px'
        },
    },
    controls: {
        marginTop: "4rem",
        display: "flex",
        justifyContent: "center",
        [theme.breakpoints.down('sm')]: {
            marginTop: "2rem",
        },
    },
    control: {
        width: "12px",
        height: "12px",
        margin: "5px",
        borderRadius: "50%",
        cursor: "pointer",
        backgroundColor: "#fff",
    },
    activeControl: {
        backgroundColor: "#00F0CA"
    }
}))

export default function Slides() {
    const classes = useStyles()
    const [current, setCurrent] = useState(0);
    // estoy usando useReft porque timeout es especificamente manejado por
    // el browser y no por react
    const timeoutRef = useRef(null);

    const handleClick = (event) => {
        setCurrent(event.target.getAttribute("data") * 1);
    };

    useEffect(() => {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setCurrent((prevCurrent) =>
                prevCurrent === slidesData.length - 1 ? 0 : prevCurrent + 1
            );
        }, 5000);

        // puedes crear una funcion sea especificamente para verificar el current timeout y limpiarlo
        return () => timeoutRef.current && clearTimeout(timeoutRef.current);
    }, [current, timeoutRef]);

    return (
        <div className={classes.slidesContainer}>
            <div className={classes.slides}>
                {slidesData.map((slide, index) => {
                    return (
                        <div
                            className={index === current ? "slide active" : "slide"}
                            key={index}
                        >
                            {index === current && <Slide slide={slide} index={index} />}
                        </div>
                    );
                })}
            </div>
            <div className={classes.controls}>
                {
                    slidesData.map((slide, index) =>
                        <div data={index} className={`${classes.control} ${index === current ? classes.activeControl : ''}`} onClick={handleClick}></div>
                    )
                }
            </div>
        </div>
    );
}