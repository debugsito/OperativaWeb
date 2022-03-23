import styles from "../styleshome/components_styles/Title.module.scss";

const COLOR = {
    dark: styles.dark,
    light: styles.light,
    red: styles.red
}
export default function Title({ children, variant = "dark" }) {

    return (
        <h1 className={COLOR[variant]}>
            {children}
        </h1>
    )
}
