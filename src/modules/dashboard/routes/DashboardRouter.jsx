import React from 'react';

//router
import { Route, Switch } from 'react-router-dom';
import DashboardRoutes from './DashboardRoutes';
import PrivateRoute from '../../../routers/PrivateRoute';

//Pages
import Dashboard from '../pages/Dashboard';
import DataTableUser from '../components/DataTableUser'; //cambiar a page
import JobPosition from '../pages/JobPosition';
import ListPostulants from '../pages/ListPostulants';
import ApplicantProfile from '../pages/ApplicantProfile';
import Profile from '../pages/Profile';
import showPositionDetail from '../pages/PositionDetails';
import ChangePassword from '../pages/ChangePassword';
import Users from '../pages/Users'; 
import History from '../pages/History';
import RepublishPosition from '../pages/RepublishPosition';
import ShowPosition from '../pages/ShowPosition';
import EditJobPosition from '../pages/EditJobPosition';
import JobPositionCreated from '../pages/JobPositionCreated';
import ListOfApplicants from '../pages/ListOfApplicants';
import Multiposting from '../pages/Multiposting';

const MyAccountRouter = () => {
    return (
        <>
            <Switch>
                <PrivateRoute
                    needSession
                    exact
                    path={DashboardRoutes[0]}
                    component={Dashboard} />
                <PrivateRoute
                    needSession
                    exact
                    path={DashboardRoutes[1]}
                    component={Dashboard} />
                <PrivateRoute
                    needSession
                    exact
                    path={DashboardRoutes[2]}
                    component={Profile} />
                <PrivateRoute
                    needSession
                    exact
                    path={DashboardRoutes[3]}
                    component={Profile} />
                <PrivateRoute
                    needSession
                    exact
                    path={DashboardRoutes[4]}
                    component={Users} />
                <PrivateRoute
                    needSession
                    exact
                    path={DashboardRoutes[5]}
                    component={Users} />
                <PrivateRoute
                    needSession
                    exact
                    path={DashboardRoutes[6]}
                    component={JobPosition} />
                <PrivateRoute
                    needSession
                    exact
                    path={DashboardRoutes[7]}
                    component={JobPosition} />
                <PrivateRoute
                    needSession
                    exact
                    path={DashboardRoutes[8]}
                    component={EditJobPosition} />
                <PrivateRoute
                    needSession
                    exact
                    path={DashboardRoutes[9]}
                    component={EditJobPosition} />
                <PrivateRoute
                    needSession
                    exact
                    path={DashboardRoutes[10]}
                    component={ListPostulants} />
                <PrivateRoute
                    needSession
                    exact
                    path={DashboardRoutes[11]}
                    component={ListPostulants} />
                <PrivateRoute
                    needSession
                    exact
                    path={DashboardRoutes[12]}
                    component={ApplicantProfile} />
                <PrivateRoute
                    needSession
                    exact
                    path={DashboardRoutes[13]}
                    component={ApplicantProfile} />
                <PrivateRoute
                    needSession
                    exact
                    path={DashboardRoutes[14]}
                    component={showPositionDetail} />
                <PrivateRoute
                    needSession
                    exact
                    path={DashboardRoutes[15]}
                    component={showPositionDetail} />
                <PrivateRoute
                    needSession
                    exact
                    path={DashboardRoutes[16]}
                    component={ChangePassword} />
                <PrivateRoute
                    needSession
                    exact
                    path={DashboardRoutes[17]}
                    component={ChangePassword} />
                <PrivateRoute
                    needSession
                    exact
                    path={DashboardRoutes[18]}
                    component={History} />
                <PrivateRoute
                    needSession
                    exact
                    path={DashboardRoutes[19]}
                    component={History} />
                <PrivateRoute
                    needSession
                    exact
                    path={DashboardRoutes[20]}
                    component={RepublishPosition} />
                <PrivateRoute
                    needSession
                    exact
                    path={DashboardRoutes[21]}
                    component={RepublishPosition} />
                <PrivateRoute
                    needSession
                    exact
                    path={DashboardRoutes[22]}
                    component={ShowPosition} />
                <PrivateRoute
                    needSession
                    exact
                    path={DashboardRoutes[23]}
                    component={ShowPosition} />
                <PrivateRoute
                    needSession
                    exact
                    path={DashboardRoutes[24]}
                    component={JobPositionCreated} />
                <PrivateRoute
                    needSession
                    exact
                    path={DashboardRoutes[25]}
                    component={JobPositionCreated} />
                <PrivateRoute
                    needSession
                    exact
                    path={DashboardRoutes[26]}
                    component={ListOfApplicants} />
                <PrivateRoute
                    needSession
                    exact
                    path={DashboardRoutes[27]}
                    component={ListOfApplicants} />
                <PrivateRoute
                    needSession
                    exact
                    path={DashboardRoutes[28]}
                    component={Multiposting} />
                <PrivateRoute
                    needSession
                    exact
                    path={DashboardRoutes[29]}
                    component={Multiposting} />
            </Switch>
        </>
    );
};
export default MyAccountRouter;