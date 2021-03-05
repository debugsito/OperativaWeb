import React, { useState } from 'react';
import Carousel from "react-material-ui-carousel"
import { CardMedia, Grid } from '@material-ui/core';
import './index.css';

function Banner(props) {
    const totalItems = props.length ? props.length : 3;
    const mediaLength = totalItems;

    let items = [];

    for (let i = 0; i < mediaLength; i++) {
        const item = props.item.items[i];
        const media = (
            <Grid item xs={12 / totalItems} key={item.name}>
                <CardMedia
                    component="img"
                    image={item.image}
                    title={item.name}
                    alt={item.name}
                >
                </CardMedia>
            </Grid>
        )
        items.push(media);
    }

    return (
        <Grid container spacing={5} className="business-carousel-images-container">
            {items}
        </Grid>
    )
}

const BusinessCarousel = ({ items }) => {
    return (
        <div style={{ marginTop: "0.5rem", color: "#494949" }}>
            <Carousel
                autoPlay
                stopAutoPlayOnHover={false}
                interval={5000}
                indicators={false}
                animation="slide"
                timeout={100}
                swipe={false}
                navButtonsAlwaysVisible={false}
                navButtonsAlwaysInvisible={true}
                fullHeightHover={true}
            >
                {
                    items.map((item, index) => <Banner item={item} key={index} contentPosition={item.contentPosition} />)
                }
            </Carousel>
        </div>

    )
}

export default BusinessCarousel;
