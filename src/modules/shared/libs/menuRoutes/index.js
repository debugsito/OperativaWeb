import { useSelector } from "react-redux";
import AppSession from "../session/AppSession";
import { SessionRoutes } from "../sessionRoutes";

export function MenuRoutes(props) {
    const { user: { account }, user } = useSelector(state => state.auth)
    const route = SessionRoutes().initRoute;
    const session = AppSession.get();
    const hasSession = (!session || Object.keys(session).length === 0 || session.errorCode) ? false : true;

    let list = [];
    let hasDashboard = false
    if (account && hasSession) {
        switch (account.role) {
            case 'muni':
            case 'business':
                list = [
                    { name: "Inicio", to: `${route}` },
                    { name: "Mi perfil", to: `${route}/perfil` },
                    { name: "Usuarios", to: `${route}/usuarios` },
                    { name: "Historial", to: `${route}/historial-de-publicaciones` },
                    {
                        name: "Configuración", to: "", nestedList: [
                            { name: "Cambiar password", to: `${route}/cambiar-password` }
                        ]
                    },
                ]
                hasDashboard = true
                break;
            case 'sub-muni':
            case 'sub-business':
                list = [
                    { name: "Inicio", to: `${route}` },
                    { name: "Mi perfil", to: `${route}/perfil` },
                    {
                        name: "Configuracion", to: "", nestedList: [
                            { name: "Cambiar password", to: `${route}/cambiar-password` }
                        ]
                    }
                ]
                hasDashboard = true
                break;
            case 'admin':
                list = [
                    // { name: "Inicio", to: `${route}` },
                    { name: "Solicitudes", to: `${route}` },
                    { name: "Facturación", to: `${route}/facturacion` },
                ]
                hasDashboard = true
                break;
            case 'postulante':
                //solucion Temporal, cambiar en el sprint 4
                if (user.account.user) {

                    list = [
                        { name: "En Progreso", to: `postulante/postulaciones` }//soluciona Temporal, a corregir en el sprint 4
                    ]
                    hasDashboard = true
                }
                break;
            default:
                break
        }
    }

    return { list, hasDashboard }

}
