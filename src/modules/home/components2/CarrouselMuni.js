import React from "react";
// import Image from "next/image";
import Carousel from "react-bootstrap/Carousel";
import styles from "../styleshome/components_styles/CarrouselMuni.module.scss";
import SubTitle from "./SubTitle";

//  Images
import muni1 from "../images2/section-operativa/Muni1.jpg";
import muni2 from "../images2/section-operativa/Muni2.jpg";
import muni3 from "../images2/section-operativa/Muni3.jpg";

export default function CarrouselMuni() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.card}>
          <h1 variant="dark">
            Nuestros socios <br></br>estratégicos
          </h1>
        </div>

        <div className={styles.logos}>
          <Carousel fade nextLabel={null} prevLabel={null} indicators={null}>
            <Carousel.Item>
              <img src={muni1} alt="logo" />
              <Carousel.Caption></Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <img src={muni2} alt="logo2" />
              <Carousel.Caption></Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <img src={muni3} alt="logo3" />
              <Carousel.Caption></Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    </div>
  );
}
