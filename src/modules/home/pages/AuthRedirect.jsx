import React from 'react'
import { Backdrop } from "../../shared/components";

export default function AuthRedirect(props) {
    const [open, setOpen] = React.useState(true);

    const handleClose = () => {
        // setOpen(false);
      };

    return (
        <>
            <Backdrop open={open} onClick={handleClose} />
        </>
    )
}
