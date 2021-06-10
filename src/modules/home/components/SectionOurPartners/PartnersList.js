import React from 'react'
import Carousel from "react-material-ui-carousel"
import SlideGenerator from "./SlideGenerator";
import "./index.css"
import {
    img1, img2, img3, img4, img5, img6,
    img7, img8, img9, img10, img11, img12,
    img13, img14, img15, img16, img17, img18,
    img19, img20, img21, img22, img23, img24,
    img25, img26, img27, img28, img29, img30,
    img31, img32, img33, img34, img35, img36,
    img37, img38, img39, img40, img41, img42,
    img43, img44, img45, img46, img47, img48, img49
} from "../../images2";

const slideOne = [img1, img2, img3, img4, img5, img6]
const slideTwo = [img7, img8, img9, img10, img11, img12,]
const slideThree = [img13, img14, img15, img16, img17, img18,]
const slideFour = [img19, img20, img21, img22, img23, img24,]
const slideFive = [img25, img26, img27, img28, img29, img30,]
const slideSix = [img31, img32, img33, img34, img35, img36,]
const slideSeven = [img37, img38, img39, img40, img41, img42]
const slideEight = [img43, img44, img45, img46, img47, img48]

const slidesTemp = [slideOne, slideTwo, slideThree, slideFour, slideFive, slideSix, slideSeven, slideEight]

export default function Partnerslist(props) {

    return (
        <Carousel
            className="slider-partners"
            navButtonsAlwaysInvisible={true}
            interval={3000}
            indicatorIconButtonProps={{
                style: {
                    padding: '10px',    // 1
                },
            }}
            indicatorContainerProps={{
                style: {
                    marginTop: '2rem', // 5
                }

            }}
        >
            {
                slidesTemp.map((slides, index) =>
                    <SlideGenerator data={slides} index={index} key={index} />
                )
            }
        </Carousel>
    )
}

