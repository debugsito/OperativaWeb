import { useSelector } from "react-redux";
import AppSession from "../session/AppSession";

export const SessionRoutes = () => {
    const { user } = useSelector(state => state?.auth);
    const session = AppSession.get();
    const hasSession = (!session || Object.keys(session).length === 0 || session.errorCode) ? false : true;

    // Get init route with session
    let initRoute = '/', routeType = '';
    if (user?.account && hasSession) {
        switch (user?.account?.role) {
            case 'muni':
            case 'sub-muni':
                routeType = 'municipalidad';
                initRoute = '/municipalidad/dashboard';
                break;
            case 'business':
            case 'sub-business':
                routeType = 'empresa';
                initRoute = '/empresa/dashboard';
                break;
            case 'postulante':
                routeType = 'postulante';
                //Solucion temporal, cambiara en el siguiente sprint (4)
                if (user.account.user) {
                    initRoute = '/postulante/postulaciones'
                }
                else {
                    initRoute = '/postulante/inicio';
                }
                break;
            case 'admin':
                routeType = 'admin';
                initRoute = '/admin';
                break;
            default:
                break;
        }
    }

    return { routeType, initRoute };
}


