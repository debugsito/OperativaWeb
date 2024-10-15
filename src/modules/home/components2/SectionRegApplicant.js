// import Image from "next/image";
import Carrousel from "./Carrousel";
import styles from "../styleshome/components_styles/Section_RegApp.module.scss";
import Title from "./Title";

export default function SectionRegApplicant(props) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.sideOne}>
          <Title variant="dark">{props.data.title}</Title>
          <p className="me-1">{props.data.content}</p>
          <Carrousel info={props.data.carousel} />
        </div>
        <div className={styles.sideTwo}>
          <div className={styles.regpost}>
            <img src={props.data.image} />
          </div>
        </div>
      </div>
    </div>
  );
}
