// import Image from "next/image";

// import { useRouter } from "next/router";
import { useHistory } from "react-router-dom";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import styles from "../styleshome/components_styles/ButtonGoBackWhite.module.scss";
import {
    Typography
} from '@material-ui/core';

export default function ButtonGoBack(props) {
    const router = useHistory();

    return (
        <div className={styles.button}
            onClick={() => router.goBack()}
        >
            <ArrowBackIosIcon style={{width:'30px' ,height:'14px', strokeWidth: '2' ,stroke: 'white'}} />
            <Typography variant="h7" component="h7"><strong>Volver</strong></Typography>
        </div>
    )
}
