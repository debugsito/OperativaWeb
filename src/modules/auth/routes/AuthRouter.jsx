import React from 'react';

//router
import { Route, Switch } from 'react-router-dom';
import AuthRoutes from './AuthRoutes';

//Pages
import AccountType from '../pages/AccountType';
import SignIn from '../pages/SignIn';
import ApplicantSignUp from '../pages/ApplicantSignUp';
import CompanySignUp from "../pages/CompanySignUp";
import ApplicantHome from "../pages/ApplicantHome";
import ApplicantProfile from '../pages/ApplicantProfile';
import RecoverPassword from '../pages/RecoverPassword';
import NewPassword from '../pages/NewPassword';
import PrivateRoute from '../../../routers/PrivateRoute';

const MyAccountRouter = () => {
    return (
        <>
            <Switch>
                <PrivateRoute
                    exact
                    path={AuthRoutes[0]}
                    component={SignIn} />
                <PrivateRoute
                    exact
                    path={AuthRoutes[1]}
                    component={AccountType} />
                <PrivateRoute
                    exact
                    needAccountType
                    path={AuthRoutes[2]}
                    component={ApplicantSignUp} />
                <PrivateRoute
                    exact
                    needAccountType
                    path={AuthRoutes[3]}
                    component={CompanySignUp} />
                <PrivateRoute
                    exact
                    needAccountType
                    path={AuthRoutes[4]}
                    component={CompanySignUp} />
                <PrivateRoute
                    exact
                    needSession
                    needAccountType
                    path={AuthRoutes[5]}
                    component={ApplicantHome} />
                <PrivateRoute
                    exact
                    needSession
                    needAccountType
                    path={AuthRoutes[6]}
                    component={ApplicantProfile} />
                <PrivateRoute
                    exact
                    path={AuthRoutes[7]}
                    component={RecoverPassword} />
                <PrivateRoute
                    exact
                    path={AuthRoutes[8]}
                    component={NewPassword} />
            </Switch>
        </>
    );
};
export default MyAccountRouter;