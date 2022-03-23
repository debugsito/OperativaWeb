// import Image from "next/image";
import { useHistory } from "react-router-dom";

import Title from "./Title";
import Button from "./Button";
import styles from "../styleshome/components_styles/Section_Banner.module.scss";
//Images
import ImageBanner from "../images2/section-banner/banner_home.png";
import ImagenWomanB from "../images2/section-banner/womanB.png";
import ImagenOneB from "../images2/section-banner/man_oneB.png";
import ImagenTwoB from "../images2/section-banner/man_twoB.png";

export default function SectionBanner(props) {
  // const router = useRouter();
  const router = useHistory()

  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <div className={styles.content}>
          <div className={styles.columnOne}>
            <Title variant="light">
              1ra Plataforma Digital de Reclutamiento Operario
            </Title>
            <Button
              variant="secondary"
              onClick={() => router.push("/registro")}
            >
              Regístrate
            </Button>
          </div>
          <div className={styles.columnTwo}>
            <img src={ImageBanner} alt="banner" />
          </div>
        </div>
      </div>
      <div className={styles.containerImgsMovil}>
        <div className={styles.imagenWoman}>
          <img src={ImagenWomanB} alt="woman" />
        </div>
        <div className={styles.imagenOne}>
          <img src={ImagenOneB} alt="man1" />
        </div>
        <div className={styles.imagenTwo}>
          <img src={ImagenTwoB} alt="man2" />
        </div>

      </div>
    </div>
  );
}
