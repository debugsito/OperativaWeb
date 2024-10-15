// import Image from "next/image";

import SubTitle from "./SubTitle";
import Button from "./Button";
import style from "../styleshome/components_styles/Card.module.scss";

//Images
import BadIcon from "../images2/section-price/backIcon.svg";
import CheckIcon from "../images2/section-price/checkIcon.svg";
import { useHistory } from "react-router-dom";

export default function Card({ key, plan, price,textcost,comment,price2, features, recommended }) {
  const router = useHistory()

  return (
    // <div className={style.containerCard} key={key}>
    //   {recommended && (
    //     <div className={style.recommended}>
    //       <SubTitle variant="light">RECOMENDADO</SubTitle>
    //     </div>
    //   )}
    //   <div className={style.card}>
    //     <SubTitle variant="dark">{plan}</SubTitle> 
    //     <h2 className={`${style.textNumber} mt-0 mb-0`}>DEMO</h2> 
    //      <h3 className={`${style.igv} mt-2`}>DEMO</h3> 
    //     <p>No se requiere tarjeta de crédito, no hay periodo de prueba</p> 
    //      {features.map((item) => (
    //       <div className="display-flex">
    //         <img src={item.check ? CheckIcon : BadIcon} alt="" />
    //         <p className="m-1">{item.description}</p>
    //       </div>
    //     ))}
    //     <div className="justify-center m-3">
    //       <Button variant="info"
    //       						onClick={() => router.push("/registro")}

    //       >Empezar ahora</Button>
    //     </div> 

  <div className={style.containerCard} key={key}>
      {recommended && (
        <div className={style.recommended}>
          <SubTitle variant="light">RECOMENDADO</SubTitle>
        </div>
      )}

        <div className={style.card}>
                <SubTitle variant="dark">{plan}</SubTitle>
                <h6 >{textcost}</h6>
                <h5 className={style.textNumber} > {price}</h5>
                <p className={style.textcomment}>{comment}</p>
                <h5 className={style.textNumber2} > {price2}</h5>
                
                {
                    features.map(item => (
                        <div className="display-flex">
                            <img src={item.check ? CheckIcon : BadIcon} alt="" />
                            <p className="m-1">{item.description}</p>
                        </div>
                    ))
                }
                <div className="justify-center m-3">
                    <Button variant="info"
                    onClick={() => router.push("/registro/empresa")}
                    >Empezar ahora</Button>
                </div>
      </div>
      </div>
    
    
  );
}
