import React from 'react'
import { Button, EnhancedTableToolbar, Typography } from "../../../shared/components";
import { Tooltip, IconButton } from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';

export default function EnhancedTableToolbarCustom(props) {


    return (
        <EnhancedTableToolbar {...props}>
            <div className="align-items-center">
                <Button
                    variant="contained"
                    color="default"
                    endIcon={<SendIcon />}
                >
                    Enviar Mensaje
                </Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button
                    variant="contained"
                    color="default"
                    endIcon={<AssignmentTurnedInIcon />}
                >
                    ASIGNAR EVALUACION
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
