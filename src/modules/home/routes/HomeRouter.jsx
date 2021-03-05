import React from 'react';

//router
import { Route, Switch } from 'react-router-dom';
import HomeRoutes from './HomeRoutes';

//Pages
import Home from '../pages/Home';
import PrivateRoute from '../../../routers/PrivateRoute';

const MyAccountRouter = () => {
    return (
        <>
            <Switch>
                <PrivateRoute
                    exact
                    path={HomeRoutes[0]}
                    component={Home} />
            </Switch>
        </>
    );
};
export default MyAccountRouter;