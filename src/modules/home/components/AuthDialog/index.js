import React from 'react'
import PropTypes from 'prop-types';
import { Dialog, DialogTitle } from '@material-ui/core';

export default function SimpleDialog({ open, handleClose }) {

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
            Hola
        </Dialog>
    )
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

