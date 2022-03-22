import { useState } from "react";
// import Image from "next/image";
// import Button from "./Button";
import Nav from "./Nav";
import LoginModal from "./LoginModal";

//Images
import logoOperativa from "../images2/logos/logo_operativa.png";
import styles from "../styleshome/components_styles/NavBar.module.scss";

const MENU = [
	{ id: "1", name: "Soy Postulante", section: "postulant", openModal: false },
	{ id: "2", name: "Soy Empresa", section: "business", openModal: false },
	{ id: "3", name: "Iniciar Sesión", section: "", openModal: true },
]

export default function Navbar({ setTab, menu = true }) {
	const [showModal, setShowModal] = useState(false)

	const closeModal = () => {
		setShowModal(false)
	}

	return (
		<div className={styles.container}>
			<header className={styles.header}>
				<div className={styles.logo}>
					<img className={styles.img} src={logoOperativa} alt="logo" />
				</div>
				{
					menu &&
					<Nav setTab={setTab} setShowModal={setShowModal} />
				}
			</header>
			<LoginModal showModal={showModal} closeModal={closeModal} />
		</div>
	);
}
