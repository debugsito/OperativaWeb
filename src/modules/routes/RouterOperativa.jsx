import React, { Suspense, lazy } from 'react';

//react router
import { Route, Switch, Redirect } from 'react-router-dom';

//Routes
import { AuthRoutes,  } from '../auth';
import { HomeRoutes,  } from '../home';
import { DashboardRoutes,  } from '../dashboard';
import { AdminRoutes,  } from '../admin';
import {ApplicantRoutes} from '../applicant'
import { SessionRoutes } from '../shared/libs/sessionRoutes';
import Error from "../home/pages/Error";

//React.lazy
const HomeRouter = lazy(() => import("../home/routes/HomeRouter"))
const AuthRouter = lazy(() => import("../auth/routes/AuthRouter"))
const DashboardRouter = lazy(() => import("../dashboard/routes/DashboardRouter"))
const AdminRouter = lazy(() => import("../admin/routes/AdminRouter"))
const ApplicantRouter = lazy(() => import("../applicant/routes/ApplicantRouter"))


//Sidebar
// import { Navigation } from "../shared/components";

//404

const RouterOperativa = () => {
    // Get session and user
    const initRoute = SessionRoutes().initRoute;
    console.log("entre a router Operativa")
    return (
        <>
            <Switch>
                <Suspense fallback={<div>Loading...</div>}>
                    <Route exact path={HomeRoutes} component={HomeRouter} />
                    <Route exact path={AuthRoutes} component={AuthRouter} />
                    <Route exact path={DashboardRoutes} component={DashboardRouter} />
                    <Route exact path={AdminRoutes} component={AdminRouter} />
                    <Route exact path={ApplicantRoutes} component={ApplicantRouter} />
                    {
                        initRoute !== "/" ?
                        <Redirect to={initRoute} /> :
                        <Route path="*" component={Error} />
                    }
                </Suspense>
                
            </Switch>
        </>
    );
};


export default RouterOperativa;
