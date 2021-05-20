import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import "./index.css"

const text = "Se guardo exitosamente."
export default function CustomSnackbarSuccess({ message = text, ...props }) {
    const [state] = React.useState({
        vertical: 'top',
        horizontal: 'right',
    });

    const { vertical, horizontal } = state;
    return (
        <div className="snackbar__container_success">
            <Snackbar
                {...props}
                anchorOrigin={{ vertical, horizontal }}
                // open={open}
                // onClose={handleClose}
                message={message}
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
