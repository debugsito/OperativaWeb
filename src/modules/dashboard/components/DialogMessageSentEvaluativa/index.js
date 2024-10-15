import React from 'react'
import PropTypes from 'prop-types'
import { Button, Dialog } from "../../../shared/components";
import { Grid, Typography, makeStyles, withStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { InfoPremiumImg } from "../../images";

const useStyles = makeStyles(theme => ({
    container: {
        padding: "0 0 0 6em",
    },
    image: {
        width: "80%",
    },
}))

export default function Index({ title="Verificativa", nextTab,...props }) {
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
                                <Typography variant="h4">Tu mensaje ha sido enviado a un asesor de {title}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" size="large" onClick={nextTab}>SIGAMOS</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={7} className="justify-end">
                        <img src={InfoPremiumImg} alt="trabajo remoto" className={classes.image} />
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


Index.propTypes = {
    text: PropTypes.string.isRequired,
    nextTab: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
}

