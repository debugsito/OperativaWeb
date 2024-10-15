import React from 'react'
import { Button, EnhancedTableToolbar, Typography } from "../../../shared/components";
import { Tooltip, IconButton } from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";

export default function EnhancedTableToolbarCustom({handleSelectPostulant, handleDismissPostulant, ...props}) {


    return (
        <EnhancedTableToolbar {...props}>
            <div className="align-items-center">
                <Button
                    variant="contained"
                    color="default"
                    endIcon={<PlaylistAddCheckIcon />}
                    onClick={handleSelectPostulant}
                >
                    Seleccionar
                </Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button
                    variant="contained"
                    color="default"
                    endIcon={<RemoveCircleIcon />}
                    onClick={handleDismissPostulant}
                >
                    Descartar
                </Button>
            </div>
            {/* <div className="align-items-center">
                <Typography
                    className={`color-white`}
                    variant="subtitle1"
                    component="div"
                >
                    <b>Contactar</b>
                </Typography>
                <Tooltip title="enviar">
                <IconButton aria-label="Enviar" color="inherit">
                    <SendIcon />
                </IconButton>
                </Tooltip>
            </div> */}
        </EnhancedTableToolbar>
    )
}
