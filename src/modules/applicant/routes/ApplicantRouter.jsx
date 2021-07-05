import React from 'react';

//router
import { Route, Switch } from 'react-router-dom';
import ApplicantRoutes from './ApplicantRoutes'
import PrivateRoute from '../../../routers/PrivateRoute';

import Applicant from '../pages/Applicant'
import ShowPublication from '../pages/ShowPublication'
import Profile from '../pages/ProfileTemp'

const MyAccountRouter = () => {
    return (
        <>
            <Switch>
                <PrivateRoute
                    needSession
                    exact
                    path={ApplicantRoutes[0]}
                    component={Applicant} />
                <PrivateRoute
                    needSession
                    exact
                    path={ApplicantRoutes[1]}
                    component={ShowPublication} />
                <PrivateRoute
                    needSession
                    exact
                    path={ApplicantRoutes[2]}
                    component={Profile} />
            </Switch>
        </>
    );
};
export default MyAccountRouter;