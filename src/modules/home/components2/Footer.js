import React from "react";
import styles from "../styleshome/components_styles/Footer.module.scss";

// import Image from "next/image";
import fb from "../images2/footer/fb.svg";
import linkedin from "../images2/footer/lnkin.svg";
import youtube from "../images2/footer/youtube.svg";
import logo_white from "../images2/logos/logo_white.png";
import call_ico from "../images2/footer/call_ico.svg";
import home_ico from "../images2/footer/home_ico.svg";
import mail_ico from "../images2/footer/mail_ico.svg";

export default function Footer(props) {
	return (
		<div className={styles.conteiner}>
			<div className={styles.footer}>
				<div className={styles.OneColum}>
					<div className={styles.containerLogo}>
						<img
							src={logo_white}
							alt="verificativa"
							width={150}
							automatically
							provided
							height={30}
						/>
					</div>

					<b>Elegir personal confiable, no es</b>
					<b>cuestión de suerte</b>
					<div className={styles.redes}>
						<a
							href="https://www.facebook.com/VerificativaSAC/"
							target="_blank"
							rel="noopener noreferrer"
						>
							<img
								src={fb}
								alt="facebook"
								width={30}
								automatically
								provided
								height={50}
							/>
						</a>

						<a
							href="https://www.linkedin.com/company/verificativa-sac/?originalSubdomain=pe"
							target="_blank"
							rel="noopener noreferrer"
						>
							<img
								src={linkedin}
								alt="linkedin"
								width={30}
								automatically
								provided
								height={50}
							/>
						</a>

						<a
							href="https://www.youtube.com/channel/UC0EinzTeh6T6kU0kaNvqGPw/featured"
							target="_blank"
							rel="noopener noreferrer"
						>
							<img
								src={youtube}
								alt="youtube"
								width={30}
								automatically
								provided
								height={50}
							/>
						</a>
					</div>
				</div>

				<div className={styles.TwoColum}>
					<div className={styles.TwoColumA}>
						<b>Datos de contacto</b>
						<div>
							<div className={styles.ico_inline}>
								<img
									src={call_ico}
									alt="call_ico"
									width={25}
									automatically
									provided
									height={25}
								/>

								<p>(01) 247-2829 / 923 890 165</p>
							</div>
							<div className={styles.ico_inline}>
								<img
									src={home_ico}
									alt="home_ico"
									width={25}
									automatically
									provided
									height={25}
								/>

								<p>Jr. Alfonso Ugarte, Barranco</p>
							</div>
						</div>
					</div>

					<div className={styles.TwoColumB}>
						<div className={styles.ico_inline}>
							<img
								src={mail_ico}
								alt="mail_ico"
								width={25}
								automatically
								provided
								height={25}
							/>

							<p>
								<a href="mailto:comercial@verificativa.com">
									comercial@verificativa.com
								</a>
							</p>
						</div>
					</div>

					<div className={styles.redesMovil}>
						<a
							href="https://www.facebook.com/VerificativaSAC/"
							target="_blank"
							rel="noopener noreferrer"
						>
							<img
								src={fb}
								alt="facebook"
								width={30}
								automatically
								provided
								height={50}
							/>
						</a>

						<a
							href="https://www.linkedin.com/company/verificativa-sac/?originalSubdomain=pe"
							target="_blank"
							rel="noopener noreferrer"
						>
							<img
								src={linkedin}
								alt="linkedin"
								width={30}
								automatically
								provided
								height={50}
							/>
						</a>

						<a
							href="https://www.youtube.com/channel/UC0EinzTeh6T6kU0kaNvqGPw/featured"
							target="_blank"
							rel="noopener noreferrer"
						>
							<img
								src={youtube}
								alt="youtube"
								width={30}
								automatically
								provided
								height={50}
							/>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
