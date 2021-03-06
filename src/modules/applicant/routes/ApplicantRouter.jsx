import React from 'react';

//router
import { Route, Switch } from 'react-router-dom';
import ApplicantRoutes from './ApplicantRoutes'
import PrivateRoute from '../../../routers/PrivateRoute';

import Applicant from '../pages/Applicant'
import ShowPublication from '../pages/ShowPublication'

const MyAccountRouter = () => {
    return (
        <>
            <Switch>
                <PrivateRoute
                    needSession
                    exact
                    path={ApplicantRoutes[1]}
                    component={Applicant} />
                <PrivateRoute
                    needSession
                    exact
                    path={ApplicantRoutes[3]}
                    component={ShowPublication} />
            </Switch>
        </>
    );
};
export default MyAccountRouter;