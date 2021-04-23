import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import "./index.css"

export default function PositionedSnackbar({ ...props }) {
    const [state] = React.useState({
        vertical: 'top',
        horizontal: 'right',
    });

    const { vertical, horizontal } = state;
    return (
        <div className="snackbar__container">
            <Snackbar
                {...props}
                anchorOrigin={{ vertical, horizontal }}
                // open={open}
                // onClose={handleClose}
                message="Asegúrate de completar todos los campos del formulario"
                key={vertical + horizontal}
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        onClick={props.onClose}
                    >
                        <CloseIcon />
                    </IconButton>
                }
            />
        </div>
    );
}
