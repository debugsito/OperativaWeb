import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/styles';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
    rootSnackbar: {
        top: "4.5rem",
    },
    rootAlert: props => ({
        color: props.severity === "success" ? "#000" : "#fff"
    }),
    filledInfo: {
        background: "#46A9D4",
    },
    filledSuccess: {
        background: "#B8EA71",
    }
}))

export default function PositionedSnackbar({ message, handleClose, ...props }) {
    const classes = useStyles(props);

    return (
        <Snackbar
            {...props}
            classes={{ root: classes.rootSnackbar }}
            onClose={handleClose}
            action={
                <IconButton
                    aria-label="close"
                    color="inherit"
                    onClick={handleClose}
                >
                    <CloseIcon />
                </IconButton>
            }
        >
            <Alert
                severity={props.severity}
                classes={{ root: classes.rootAlert, filledInfo: classes.filledInfo, filledSuccess: classes.filledSuccess }}
                onClose={handleClose}
            >
                {message}
            </Alert>
        </Snackbar>
    );
}
