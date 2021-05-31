import React from 'react';

//router
import { Route, Switch } from 'react-router-dom';
import HomeRoutes from './HomeRoutes';

//Pages
import Home from '../pages/Home';
import Authenticate from '../pages/Authenticate';
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
            </Switch>
        </>
    );
};
export default MyAccountRouter;