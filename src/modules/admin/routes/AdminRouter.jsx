import React from 'react';

//router
import { Route, Switch } from 'react-router-dom';
import AuthRoutes from './AdminRoutes';

//Pages
import Requests from '../pages/Requests';
import Home from '../pages/Home';
import Billing from '../pages/Billing';
import PrivateRoute from '../../../routers/PrivateRoute';

const MyAccountRouter = () => {
    return (
        <>
            <Switch>
                {/* <PrivateRoute
                    exact
                    needSession
                    needAccountType
                    path={AuthRoutes[0]}
                    component={Home} /> */}
                <PrivateRoute
                    exact
                    needSession
                    needAccountType
                    path={AuthRoutes[0]}
                    component={Requests} />
                <PrivateRoute
                    exact
                    needSession
                    needAccountType
                    path={AuthRoutes[1]}
                    component={Billing} />
            </Switch>
        </>
    );
};
export default MyAccountRouter;