// import Image from "next/image";

// import { useRouter } from "next/router";
import { useHistory } from "react-router-dom";

import IconForward from '../images2/page-register/icon-forward.svg'
import styles from "../styleshome/components_styles/ButtonGoForward.module.scss";

export default function ButtonGoForward(props) {
    const router = useHistory();
    const  {url,text} = props;
    return (
        <div className={styles.button} 
        onClick={() => router.push(url)}
        >
            <p>{text}</p>
            <img src={IconForward}  className={styles.imgClass} alt="Siguiente" />
        </div>
    )
}
