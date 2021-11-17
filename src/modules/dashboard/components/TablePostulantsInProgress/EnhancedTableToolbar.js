import React from 'react'
import { EnhancedTableToolbar, Typography } from "../../../shared/components";
import { Tooltip, IconButton } from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';

export default function EnhancedTableToolbarCustom(props) {


    return (
        <EnhancedTableToolbar {...props}>
            <div className="align-items-center">
                <Typography
                    className={`color-white`}
                    color="textSecondary"
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
            </div>
        </EnhancedTableToolbar>
    )
}
