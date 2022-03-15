import React from 'react';

//router
import { Route, Switch } from 'react-router-dom';
import ApplicantRoutes from './ApplicantRoutes'
import PrivateRoute from '../../../routers/PrivateRoute';

import Applicant from '../pages/Applicant'
import ShowPublication from '../pages/ShowPublication'
import Profile from '../pages/ProfileTemp'
import PostulateForm from '../pages/PostulateForm'
import ItemResultPostulate from "../pages/ItemResultPostulate";
import Applications from "../pages/Applications";
import ApplicationDetail from "../pages/ApplicationDetail";
import PostulateFormList from '../pages/PostulateFormList';
import ApplicantMessages from '../pages/ApplicantMessages';
import ApplicantMessageDetail from '../pages/ApplicantMessageDetail';
import ApplicantEvaluations from '../pages/ApplicantEvaluations';
import ApplicantQuestion from '../pages/ApplicantQuestion'

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
                <PrivateRoute
                    needSession
                    exact
                    path={ApplicantRoutes[3]}
                    component={PostulateForm} />
                <PrivateRoute
                    needSession
                    exact
                    path={ApplicantRoutes[4]}
                    component={ItemResultPostulate} />
                <PrivateRoute
                    needSession
                    exact
                    path={ApplicantRoutes[5]}
                    component={Applications} />
                <PrivateRoute
                    needSession
                    exact
                    path={ApplicantRoutes[6]}
                    component={ApplicationDetail} />
                <PrivateRoute
                    needSession
                    exact
                    path={ApplicantRoutes[7]}
                    component={PostulateFormList} />
                <PrivateRoute
                    needSession
                    exact
                    path={ApplicantRoutes[8]}
                    component={ApplicantMessages} />
                <PrivateRoute
                    needSession
                    exact
                    path={ApplicantRoutes[9]}
                    component={ApplicantMessageDetail} />
                <PrivateRoute
                    needSession
                    exact
                    path={ApplicantRoutes[10]}
                    component={ApplicantEvaluations} />
                     <PrivateRoute
                    needSession
                    exact
                    path={ApplicantRoutes[11]}
                    component={ApplicantQuestion} />
            </Switch>
        </>
    );
};
export default MyAccountRouter;
