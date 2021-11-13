import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: "0",
    },

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
                classes={{ root: classes.root }}
            >
                {
                    dialogTitle && <DialogTitle onClose={onClose}>Optional sizes</DialogTitle>
                }

                {/* <DialogContent> */}
                {
                    children
                }

                {/* </DialogContent> */}
            </Dialog>
        </React.Fragment>
    );
}
