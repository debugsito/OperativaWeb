import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


const useStyles = makeStyles((theme) => ({
    root: {
        padding: "0",
    },
    paper: {
        borderRadius: "10px",
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: "#fff",
    },
    dialogTitle: {
        background: "#ED1D40",
        color: "#fff",
    }
}));

export default function CustomDialog({ children, open, onClose, dialogTitle = false, ...props }) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Dialog
                {...props}
                open={open}
                onClose={onClose}
                aria-labelledby="max-width-dialog-title"
                classes={{ root: classes.root, paper: classes.paper }}
            >
                {
                    dialogTitle &&
                    <DialogTitle classes={{ root: classes.dialogTitle }} disableTypography>
                        <Typography variant="h6" className="color-white">{dialogTitle}</Typography>
                        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                }
                {
                    children
                }
            </Dialog>
        </React.Fragment>
    );
}
