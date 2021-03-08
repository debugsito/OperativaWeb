import React from 'react';

import { Redirect, Route } from 'react-router-dom';
import { SessionRoutes } from '../modules/shared/libs/sessionRoutes';
import AppSession from '../modules/shared/libs/session/AppSession';

const PrivateRoute = ({
    component: Component,
    needSession,
    needAccountType,
    type,
    ...params
}) => {
    const hasSession = AppSession.get();
    const initRoute = SessionRoutes().initRoute;
    const routeType = SessionRoutes().routeType;
    const isPath = routeType && params.location.pathname.includes(routeType);
    // si el usuario tiene sesion
    // verificar si el path es del tipo de session
    // no puede entrar al home, login, registro, olvido contrasena 
    // => redirigir al home respectivo del tipo de sesion
    // si el usuario no tiene sesion
    // puede entrar al home, login, registro, olvido contrasena 
    // no puede entrar directamente a los enlaces respectivos
    return (
        <Route
            {...params}
            render={(props) => {
                // if (needAccountType)
                //     return accountType ? <Route {...params} component={component} /> : <Redirect to="/" />

                if (hasSession) {
                    return isPath ? <Component {...props} /> : <Redirect to={initRoute} />
                } else {
                    return !needSession ? <Component {...props} /> : window.location.href = process.env.REACT_APP_PATH_LANDING
                }
            }}
        />
    )
};

export default PrivateRoute;
