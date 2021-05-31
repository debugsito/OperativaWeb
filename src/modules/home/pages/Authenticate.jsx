import React, { useEffect } from 'react'
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { Backdrop } from "../../shared/components";
import { logIn } from "../../../store/actions/auth/auth.middleware";

export default function Authenticate(props) {
    const dispatch = useDispatch()
    const location = useLocation()
    const [open, setOpen] = React.useState(true);

    console.log("location",location)
    const useQuery = () => new URLSearchParams(location.search);

    let query = useQuery();

    useEffect(() => {
        console.log("::::::::::::::USE_EFFECT:::::::::::::::")
        if(location.search !== ""){
            const values = {
                token:query.get("token"),
                email: query.get("email"),
                role: query.get("role")
            }
            dispatch(logIn(values))
            console.log("values",values)

        }

    },[location.search])

    console.log("location",location)

    const handleClose = () => {
        // setOpen(false);
      };

    return (
        <>
            <Backdrop open={open} onClick={handleClose} />
        </>
    )
}
