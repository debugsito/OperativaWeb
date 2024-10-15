import React from 'react'
import { EnhancedTableToolbar, Typography } from "../../../shared/components";
import { Tooltip, IconButton } from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';

export default function EnhancedTableToolbarCustom({handleClick, ...props}) {


    return (
        <EnhancedTableToolbar {...props}>
            <div className="align-items-center">
                <Typography
                    className={`color-white`}
                    // color="textSecondary"
                    variant="subtitle1"
                    component="div"
                >
                    Llevar masivamente a <b>"En proceso"</b>
                </Typography>
                <Tooltip title="enviar">
                    <IconButton aria-label="Enviar" color="inherit" onClick={handleClick}>
                        <SendIcon />
                    </IconButton>
                </Tooltip>
            </div>
        </EnhancedTableToolbar>
    )
}
