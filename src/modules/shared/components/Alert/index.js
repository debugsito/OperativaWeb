import React from 'react'
import { Alert, AlertTitle } from '@material-ui/lab';

export default function AlertCustom({ title, message, ...props }) {

    return (
        <Alert {...props}>
            <AlertTitle>{title}</AlertTitle>
            {message} - <strong>compruebalo!</strong>
        </Alert>
    )
}
