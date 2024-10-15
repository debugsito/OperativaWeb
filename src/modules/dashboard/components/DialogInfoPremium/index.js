import React from 'react'
import { CardsFeatures } from "../";
import { Button, Dialog, TextCustom } from "../../../shared/components";
import { Grid, Typography, makeStyles, withStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { InfoPremiumImg } from "../../images";

const useStyles = makeStyles(theme => ({
    container: {
        padding: "0 0 0 4em",
    },
    image: {
        width: "70%",
    },
}))

export default function Index({ ...props }) {
    const classes = useStyles();

    return (
        <Dialog
            fullWidth
            maxWidth="md"
            {...props}
        >
            <div className={classes.container}>
                <ButtonClose onClose={props.onClose} />
                <Grid container alignItems="center">
                    <Grid item xs={12} md={5}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h4">Esta función solo esta disponible con <TextCustom color="primary" weight={700}>Cuentra Premium</TextCustom></Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" size="large">PASATE A PREMIUM</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={7} className="justify-end">
                        <img src={InfoPremiumImg} alt="trabajo remoto" className={classes.image} />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Typography variant="h6">Mira las funciones adicionales teniendo una <TextCustom color="primary" weight={700}>Cuenta Premium</TextCustom></Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <CardsFeatures />
                    </Grid>

                </Grid>
            </div>
        </Dialog>
    )
}

const styles = (theme) => ({
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const ButtonClose = withStyles(styles)((props) => {
    const { classes, onClose } = props;
    return (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
        </IconButton>
    );
});