// import Image from "next/image";
import styles from "../styleshome/components_styles/MensajeSuccess.module.scss";
import SuccessImg from "../images2/page-register/bg-success.webp";

export default function MensajeSuccess({ title, content, children }) {


    return (
        <div className={styles.background}>
            <div className={styles.image}>
                <img src={SuccessImg} alt="imagen" />
            </div>
            <div className={styles.main}>
                {title}
                <div className={styles.text}>
                    {content}
                </div>
                {
                    children
                }
            </div>
        </div>
    )
}
