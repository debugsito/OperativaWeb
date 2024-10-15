import { useState } from "react";
// import Image from "next/image";
import Button from "./Button";
import MenuIcon from "../images2/section-banner/hamburguer_ico.svg";
import styles from "../styleshome/components_styles/Nav.module.scss";

export default function Nav({ setShowModal, setTab }) {
    const [isOpenMenu, setIsOpenMenu] = useState(false)

    const handleClickMenu = (tab) => {
        setTab(tab)
        setIsOpenMenu(false)
    }

    const openMenuMovil = () => {
        setIsOpenMenu(prevState => !prevState)
    }

    const handleClickLogin = () => {
        setShowModal(true)
        setIsOpenMenu(false)
    }

    return (
        <nav className={styles.navbar}>
            <span className={styles.btn_menu} onClick={openMenuMovil}>
                <img  className={styles.img} src={MenuIcon} alt="Menu" />
            </span>
            <ul className={styles.nav}>
                <li>
                    <a href="#postulant" onClick={() => handleClickMenu("postulant")}>Soy Postulante</a>
                </li>
                <li>
                    <a href="#business" onClick={() => handleClickMenu("business")}>Soy Empresa</a>
                </li>
                <li>
                    <Button variant="info" onClick={handleClickLogin} >Iniciar sesión</Button>
                </li>
            </ul>
            {
                isOpenMenu &&
                <div className={`${styles.menuMovil} ${isOpenMenu ? styles.showMenu : ""}`}>
                    <ul >
                        <li>
                            <a href="#postulant" onClick={() => handleClickMenu("postulant")}>Soy Postulante</a>
                        </li>
                        <li>
                            <a href="#business" onClick={() => handleClickMenu("business")}>Soy Empresa</a>
                        </li>
                        <li>
                            <span onClick={handleClickLogin}>Iniciar sesión</span>
                        </li>
                    </ul>
                </div>
            }
        </nav>
    )
}
