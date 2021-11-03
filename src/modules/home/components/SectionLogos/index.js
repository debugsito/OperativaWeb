import React from 'react'
import { Hidden, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

//IMAGES
import LogoInnovate from "../../assets/images/LOGO_PROINNÓVATE.png"
import LogoPucp from "../../assets/images/pucp.png"
import LogoVerificativa from "../../assets/images/LOGO_VERIFICATIVA.png"

const useStyles = makeStyles(theme => ({
    root: {
        height: "50vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    containerCards: {
        display: 'grid',
        gridGap: '2rem',
        gridTemplateRows: '1fr 1fr 1fr',
        justifyItems: 'center'
    },

    textF: {
        textAlign: "center",
        fontSize: "1.5rem",
        color: "#757575",
        fontWeight: 600,
    },

}))
export default function SectionLogos(props) {
    const classes = useStyles();

    return (
        <Hidden mdUp>
            <div className={classes.root}>
                <h4 className={classes.textF}>Financiado por:</h4>
                <div className={classes.containerCards}>
                    <img src={LogoInnovate} alt="Pro Innóvate" />
                    <img src={LogoPucp} alt="PUCP" />
                    <img src={LogoVerificativa} alt="Verificativa" />
                </div>
            </div>
        </Hidden>
    )
}
