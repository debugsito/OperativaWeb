import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { useDispatch } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import { Dialog, Divider, Hidden, makeStyles, Typography } from '@material-ui/core';
import MuiDialogContent from '@material-ui/core/DialogContent';

import SignInDialog from "./SignInDialog";
import { setIsPostulant as setIsPostulantRedux } from "../../../../store/actions/home/home.action";
import { setUserError } from "../../../../store/actions/auth/auth.action";
import "../../styles/Home.css";

const useStyles = makeStyles(theme => ({
    paper: {
        borderRadius: "25px",
        [theme.breakpoints.up('md')]: {
            position: "fixed",
            top: "28px",
            right: "60px"
        }
    },
    triangulo: {
        position: "fixed",
        top: "48px",
        right: "150px",
        width: 0,
        height: 0,
        borderRight: "10px solid transparent",
        borderBottom: "15px solid white",
        borderLeft: "10px solid transparent",
        zIndex: 2000
    }
}))
export default function SimpleDialog({ open, handleClose }) {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [isBusiness, setIsBusiness] = useState(false)
    const [isPostulant, setIsPostulant] = useState(false)

    const handleClick = () => {
        dispatch(setIsPostulantRedux(true))
        setIsPostulant(true)
    }

    const handleClickClose = () => {
        dispatch(setIsPostulantRedux(false))
        handleClose()
        setIsPostulant(false)
        setIsBusiness(false)
        dispatch(setUserError(null))
    }

    return (
        <>
            <Hidden smDown>
                {open && <div className={classes.triangulo}></div>}
            </Hidden>
            <Dialog onClose={handleClickClose} aria-labelledby="signin-dialog" open={open}
                fullWidth
                maxWidth="xs"
                classes={{ paper: classes.paper }}
            >
                <MuiDialogContent dividers>
                    {
                        (isPostulant || isBusiness) ?
                            <SignInDialog isPostulant={isPostulant} />
                            :
                            <>
                                <Text variant="subtitle1" onClick={handleClick}>Postulante</Text>
                                <Divider />
                                <Text variant="subtitle1" onClick={() => setIsBusiness(true)}>Empresa / Municipalidad</Text>
                            </>
                    }
                </MuiDialogContent>
            </Dialog>
        </>
    )
}

const Text = withStyles((theme) => ({
    root: {
        margin: 2,
        cursor: "pointer"
    },
}))(Typography);

SimpleDialog.propTypes = {
    handleClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

