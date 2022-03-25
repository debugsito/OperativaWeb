import React from 'react'
import Container from "../components2/Container";
import ButtonGoBack from "../components2/ButtonGoBack";
import Title from "../components2/Title";
import SubTitle from "../components2/SubTitle";

import styles from "../styleshome/components_styles/Register.module.scss";
import { useHistory } from "react-router-dom";

//images
import IconBusiness from "../images2/page-register/icon-business.svg";
import IconMunicipality from "../images2/page-register/icon-municipality.svg";
import IconPostulant from "../images2/page-register/icon-postulant.svg";

const CARDS = [
    { id: "0", text: "postulante", img: IconPostulant, path: "/registro/postulante" },
    { id: "0", text: "empresa", img: IconBusiness, path: "/registro/empresa" },
    { id: "1", text: "Municipalidad", img: IconMunicipality, path: "/registro/municipalidad" },
]

export default function Registro(props) {
    const router = useHistory();

    const handleClick = (path) => {
        router.push(path)
    }

    return (
        <Container navbar height="heightPorc">
            <div className={styles.background}>
                <ButtonGoBack />
                <Title>Cuéntanos</Title>
                <p className="text-gray">¿Para quién desea crear la cuenta?</p>
            </div>
            <div className={styles.cards}>
                {
                    CARDS.map(item => (
                        <div className={styles.item} onClick={() => handleClick(item.path)}>
                            <img src={item.img} alt="icono" />
                            <SubTitle variant="dark">Para</SubTitle>
                            <SubTitle variant="dark">{item.text}</SubTitle>
                        </div>
                    ))
                }
            </div>
        </Container>
    )
}
