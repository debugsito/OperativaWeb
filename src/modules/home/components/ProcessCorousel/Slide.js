import React from 'react'
import { makeStyles } from '@material-ui/core';
import DescriptionSlide from "./DescriptionSlide";

const useStyles = makeStyles(theme => ({

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

export default function Slide(props) {
    const classes = useStyles();

    return (
        <div className={classes.slideContent} key={props.index}>
            <div className={classes.slideContainerText}>
                <DescriptionSlide numberImg={props.slide.numberImg} text={props.slide.text} />
            </div>
            <img src={props.slide.img} className={classes.slideImg} />
        </div>
    )
}
