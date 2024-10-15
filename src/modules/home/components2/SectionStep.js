import React from 'react'
import ButtonGoBack from "./ButtonGoBack";
import styles from "../styleshome/components_styles/SectionStep.module.scss";

/**
 * params:
 * step:
 */
const PROGRESS = {
    one: { title: "Datos personales  y de contacto", value: "35%", progress: [styles.active, styles.inactive, styles.inactive] },
    two: { title: "Educación", value: "60%", progress: [styles.active, styles.active, styles.inactive] },
    three: { title: "Experiencia laboral", value: "100%", progress: [styles.active, styles.active, styles.active] },
}

export default function Sectionstep({ content = "one" }) {

    return (
        <div className={styles.containerStep}>
            <section className={styles.content}>
                <div className={styles.button}>
                    <h3>{PROGRESS[content].value}</h3>
                    <ButtonGoBack />
                </div>
                <h4>{PROGRESS[content].title}</h4>
                <div className={styles.progress}>
                    {
                        PROGRESS[content].progress.map(style => (
                            <div className={style}></div>
                        ))
                    }
                </div>
            </section>
        </div>
    )
}
