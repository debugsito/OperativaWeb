import React from 'react'
import styles from "../styleshome/components_styles/Container.module.scss";
import Navbar from "./Navbar";
import NavProgress from './NavProgress';
import SectionStep from "./SectionStep";

const COLOR = {
    bgMain: styles.bgMain
}

const _HEIGHT = {
    heightVH: styles.heightVH,
    heightPorc: styles.heightPorc
}

export default function Container({ children, navbar = false, menu = false, height = "heightVH", step = null, navProgress = false, progress= null , title=null }) {

    return (
        <div className={`${styles.container} ${_HEIGHT[height]}`}>
            {
                navbar && <><Navbar menu={menu} /></>
            }
            {
                navProgress && <NavProgress progress={progress}  title = {title}/>
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
