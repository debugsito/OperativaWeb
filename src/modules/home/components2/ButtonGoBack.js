// import Image from "next/image";

// import { useRouter } from "next/router";
import { useHistory } from "react-router-dom";

import IconBack from "../images2/page-register/icon-back.svg";
import styles from "../styleshome/components_styles/ButtonGoBack.module.scss";

export default function ButtonGoBack(props) {
    const router = useHistory();

    return (
        <div className={styles.button} 
        onClick={() => router.goBack()}
        >
            <img src={IconBack} alt="Volver" />
            <p>Volver</p>
        </div>
    )
}
