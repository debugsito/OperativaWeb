import styles from "../styleshome/components_styles/Button.module.scss";

const COLOR = {
    primary: styles.primary,
    secondary: styles.secondary,
    info: styles.info,
    light: styles.light
}

export default function Button({ children, variant = "primary", ...props }) {
    // const color = variant === "secondary" ? styles.secondary : (variant === "info" ? styles.info : styles.primary)
    return (
        <button {...props} className={`${COLOR[variant]}`}>{children}</button>
    )
}
