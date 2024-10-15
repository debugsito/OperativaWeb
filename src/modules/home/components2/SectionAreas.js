
import AvatarOne from "../images2/section-areas/img1.png";
import AvatarTwo from "../images2/section-areas/img2.png";
import AvatarThree from "../images2/section-areas/img3.png";
import AvatarFour from "../images2/section-areas/img4.png";
import AvatarFive from "../images2/section-areas/img5.png";
import AvatarSix from "../images2/section-areas/img6.png";

import styles from "../styleshome/components_styles/Section_Areas.module.scss";

const AVATAR_DATA = [
    { id: "1", img: AvatarOne, text: "Mantenimiento y Limpieza" },
    { id: "2", img: AvatarTwo, text: "Producción y Operaciones" },
    { id: "3", img: AvatarThree, text: "Almacén y Transporte" },
    { id: "4", img: AvatarFour, text: "Call center y Ventas" },
    { id: "5", img: AvatarFive, text: "Construcción y Obras" },
    { id: "6", img: AvatarSix, text: "Motorizados y Courier" },
]

export default function SectionAreas(props) {


    return (
        <section className={styles.container}>
            <div className={styles.content}>
                <div className={styles.avatars}>
                    {
                        AVATAR_DATA.map(item => (
                            <div className={styles.avatar}>
                                <img key={item.key} src={item.img} alt="área" />
                                <p className={styles.text}><b>{item.text}</b></p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

