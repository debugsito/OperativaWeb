// import Image from "next/image";
import Title from "./Title";
import Button from "./Button";
import styles from "../styleshome/components_styles/Section_Demoteam.module.scss";
import { useHistory } from "react-router-dom";

//images
import circles from "../images2/demo/circles.png";
import man from "../images2/demo/man.png";

export default function SectionDemoteam() {
	const router = useHistory()

	return (
		<section className={styles.container}>
			<div className={styles.content}>
				<div className={styles.columOne}>
					<Title variant="light">Prueba Operativa para tu equipo</Title>
					<p className={styles.sub}>
						Prueba gratuita por 15 días, no necesitas tarjeta de crédito
					</p>
					<div>
						<Button variant="secondary"
						onClick={() => router.push("/registro")}
						> Solicitar demo</Button>
					</div>
				</div>
				<div className={styles.columTwo}>
					<div className={styles.circleOne}>
						<img src={circles} />
					</div>
					<div className={styles.man}>
						<img src={man} />
					</div>
				</div>
			</div>
		</section>
	);
}
