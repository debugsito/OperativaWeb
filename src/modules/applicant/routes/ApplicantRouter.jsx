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
import ApplicantMedicalTest from '../pages/ApplicantMedicalTest'
import ApplicantInterview from '../pages/ApplicantInterview';
import ApplicantPublicationDetail from '../pages/ApplicantPublicationDetail';
import ApplicantJobHuntingDetail from '../pages/ApplicantJobHuntingDetail';
import ApplicantJobHunting from '../pages/ApplicantJobHunting';
import ApplicantQuestionList from '../pages/ApplicantQuestionList';

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
                <PrivateRoute
                    needSession
                    exact
                    path={ApplicantRoutes[12]}
                    component={ApplicantInterview} />
                <PrivateRoute
                    needSession
                    exact
                    path={ApplicantRoutes[13]}
                    component={ApplicantMedicalTest} />
                <PrivateRoute
                    needSession
                    exact
                    path={ApplicantRoutes[14]}
                    component={ApplicantPublicationDetail} />
                <PrivateRoute
                    needSession
                    exact
                    path={ApplicantRoutes[15]}
                    component={ApplicantJobHuntingDetail} />
                <PrivateRoute
                    needSession
                    exact
                    path={ApplicantRoutes[16]}
                    component={ApplicantJobHunting} />
                <PrivateRoute
                    needSession
                    exact
                    path={ApplicantRoutes[17]}
                    component={ApplicantQuestionList} />
            </Switch>
        </>
    );
};
export default MyAccountRouter;
