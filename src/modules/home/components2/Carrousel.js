import React from "react";
// import Image from "next/image";

import Carousel from "react-bootstrap/Carousel";
import ArrowLeftIcon from "../images2/section-regpost/arrow-left.webp";
import ArrowRightIcon from "../images2/section-regpost/arrow-right.webp";
import Title from "./Title";

export default function Carrousel(props) {
  return (
    <div d-block w-100 className="container-main">
      <div className="container-blue">
        <Carousel
          fade
          nextLabel={null}
          prevLabel={null}
          indicators={true}
          nextIcon={
            <div className="next-icon">
              <img src={ArrowRightIcon} alt="" />
            </div>
          }
          prevIcon={
            <div className="prev-icon">
              <img src={ArrowLeftIcon} alt="" />
            </div>
          }
        >
          {props.info.map((item, index) => (
            <Carousel.Item key={index}>
              <div className="container-content">
                <div className="contentOne">
                  <p1>{index + 1}</p1>
                </div>

                <div className="contentTwo">
                  <h1 className="h1">{item.title}</h1>
                  <p>{item.description}</p>
                </div>

                <Carousel.Caption></Carousel.Caption>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
