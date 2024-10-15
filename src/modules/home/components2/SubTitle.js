import styles from "../styleshome/components_styles/SubTitle.module.scss";

export default function SubTitle({ children, variant = "light" }) {
    const color = variant === "dark" ? styles.dark : styles.light

    return (
        <h3 className={color}>
            {children}
        </h3>
    )
}
