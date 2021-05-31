import React from 'react'
import { useLocation } from "react-router-dom";
import { Backdrop } from "../../shared/components";

export default function Authenticate(props) {
    const location = useLocation()
    const [open, setOpen] = React.useState(true);

    console.log("location",location)

    const useQuery = () => new URLSearchParams(location.search);

    const handleClose = () => {
        // setOpen(false);
      };

    return (
        <>
            <Backdrop open={open} onClick={handleClose} />
        </>
    )
}
