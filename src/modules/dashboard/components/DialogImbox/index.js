import React, { useState } from 'react'
import { Button, Dialog, MenuList } from "../../../shared/components";
import { DialogSendMessages, TableImbox } from "../";
import { Grid, makeStyles, MenuItem } from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';

//Images, icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
    containerForm: {
        padding: "2rem",
    }
}))

export default function Index({ ...props }) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [openModal, setOpenModal] = useState(false)
    const [openModalFill, setOpenModalFill] = useState(false)

    const handleToggle = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOpenModal = (type) => {
        if (type === "dialog_empty") {
            setOpenModal(true)
        } else if (type === "dialog_fill") {
            setOpenModalFill(true)
        }
        setAnchorEl(null);
    }

    return (
        <Dialog
            fullWidth
            maxWidth="md"
            dialogTitle="Bandeja de mensajes"
            {...props}
        >
            <DialogContent dividers>
                <div className={classes.containerForm}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} className="justify-end">
                            <div>
                                <Button endIcon={<ExpandMoreIcon />} size="large" variant="outlined"
                                    aria-controls="menu-send-message"
                                    aria-haspopup="true"
                                    onClick={handleToggle}
                                >
                                    CONTACTAR
                                </Button>
                                <MenuList anchorEl={anchorEl} handleClose={handleClose}>
                                    <MenuItem onClick={() => handleOpenModal("dialog_empty")}>Personalizado</MenuItem>
                                    <MenuItem onClick={() => handleOpenModal("dialog_fill")}>De agradecimiento</MenuItem>
                                </MenuList>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <TableImbox />
                        </Grid>
                    </Grid>
                </div>
            </DialogContent>
            <DialogSendMessages open={openModal} onClose={() => setOpenModal(false)} />
            <DialogSendMessages open={openModalFill} onClose={() => setOpenModalFill(false)} fill />
        </Dialog>
    )
}
