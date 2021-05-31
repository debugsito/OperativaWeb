import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { useDispatch } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import { Dialog, Divider, makeStyles, Typography } from '@material-ui/core';
import MuiDialogContent from '@material-ui/core/DialogContent';

import SignInDialog from "./SignInDialog";
import { setIsPostulant as setIsPostulantRedux } from "../../../../store/actions/home/home.action";
import { setUserError } from "../../../../store/actions/auth/auth.action";

const useStyles = makeStyles(theme => ({
    paper: {
        position: "fixed",
        top: "20px",
        right: "80px"
    }

}))

const Text = withStyles((theme) => ({
    root: {
        margin: 2,
        cursor: "pointer"
    },
}))(Typography);
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
    )
}

SimpleDialog.propTypes = {
    handleClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

