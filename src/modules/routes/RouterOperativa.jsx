import React, { useEffect, useState } from 'react';

//react router
import { Route, Switch, Redirect } from 'react-router-dom';

//Routes
import { AuthRoutes, AuthRouter } from '../auth';
import { HomeRoutes, HomeRouter } from '../home';
import { DashboardRoutes, DashboardRouter } from '../dashboard';
import { AdminRoutes, AdminRouter } from '../admin';
import { SessionRoutes } from '../shared/libs/sessionRoutes';
import {ApplicantRouter,ApplicantRoutes} from '../applicant'

//Sidebar
import { Navigation } from "../shared/components";

const RouterOperativa = () => {
    // Get session and user
    const initRoute = SessionRoutes().initRoute;

    return (
        <>
            <Switch>
                <Route exact path={HomeRoutes} component={HomeRouter} />
                <Navigation>
                    <Route exact path={AuthRoutes} component={AuthRouter} />
                    <Route exact path={DashboardRoutes} component={DashboardRouter} />
                    <Route exact path={AdminRoutes} component={AdminRouter} />
                    <Route exact path={ApplicantRoutes} component={ApplicantRouter} />
                </Navigation>
                <Redirect to={initRoute} />
            </Switch>
        </>
    );
};


export default RouterOperativa;
