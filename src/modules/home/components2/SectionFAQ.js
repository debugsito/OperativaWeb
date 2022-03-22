import Title from "./Title";
import SubTitle from "./SubTitle";
import styles from "../styleshome/components_styles/Section_FAQ.module.scss";

import AccordionFaq from "./Accordion";

//images
// import Image from "next/image";
import faq_img from "../images2/faq/faq_img.png";

export default function SectionFAQ(props) {
	return (
		<div className={styles.imgfaq}>
			<img src={faq_img} />

			<div className={styles.containerfaq}>
				<div className={styles.columnFAQ}>
					<Title variant="light">¿Tienes alguna duda?</Title>
					<SubTitle variant="light">
						Esto nos preguntaron nuestros candidatos
					</SubTitle>
					<AccordionFaq />
				</div>
			</div>
		</div>
	);
}
