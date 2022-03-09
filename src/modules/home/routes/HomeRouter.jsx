import React from 'react';

//router
import { Route, Switch } from 'react-router-dom';
import HomeRoutes from './HomeRoutes';

//Pages
// import Home from '../pages/Home';
import Home from '../pages/Home2';
import Authenticate from '../pages/Authenticate';
import AuthRedirect from '../pages/AuthRedirect';
import Error from '../pages/Error';

//PrivateRoute
import PrivateRoute from '../../../routers/PrivateRoute';

const MyAccountRouter = () => {
    return (
        <>
            <Switch>
                <PrivateRoute
                    exact
                    path={HomeRoutes[0]}
                    component={Home} />
                <PrivateRoute
                    exact
                    path={HomeRoutes[1]}
                    component={Authenticate} />
                <PrivateRoute
                    exact
                    path={HomeRoutes[2]}
                    component={Authenticate} />
                <PrivateRoute
                    exact
                    path={HomeRoutes[3]}
                    component={Authenticate} />
            </Switch>
        </>
    );
};
export default MyAccountRouter;