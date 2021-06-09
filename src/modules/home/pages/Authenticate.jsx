import React, { useEffect } from 'react'
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { Backdrop } from "../../shared/components";
import AppSession from "../../shared/libs/session/AppSession";
import { setUser, getAccount} from "../../../store/actions/auth/auth.action";

export default function Authenticate(props) {
    const dispatch = useDispatch()
    const location = useLocation()
    const [open, setOpen] = React.useState(true);

    const useQuery = () => new URLSearchParams(location.search);

    let query = useQuery();

    useEffect(() => {
        if(location.search !== ""){
            AppSession.create(query.get("token"))
            const user = {
                account:{
                    rol_usuario:"Administrador",
                    email: query.get("email"),
                    role: query.get("role")
                },
                token:query.get("token"),
            }
        if(Number(query.get("user"))){
            dispatch(getAccount())
        }else{
            dispatch(setUser(user))
        }
        }

    },[location.search])


    const handleClose = () => {
        // setOpen(false);
      };

    return (
        <>
            <Backdrop open={open} onClick={handleClose} />
        </>
    )
}
