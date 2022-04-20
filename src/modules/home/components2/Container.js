import React from 'react'
import styles from "../styleshome/components_styles/Container.module.scss";
import Navbar from "./Navbar";
import SectionStep from "./SectionStep";

const COLOR = {
    bgMain: styles.bgMain
}

const _HEIGHT = {
    heightVH: styles.heightVH,
    heightPorc: styles.heightPorc
}

export default function Container({ children, navbar = false, menu = false, height = "heightVH", step = null }) {

    return (
        <div className={`${styles.container} ${_HEIGHT[height]}`}>
            {
                navbar && <><Navbar menu={menu} /></>
            }
            {
                step && <SectionStep content={step} />
            }
            <div className={styles.content}>
                {children}
            </div>
        </div>
    )
}
