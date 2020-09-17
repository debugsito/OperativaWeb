import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import * as ROUTES from '../Constant/routes';
// Views
import Home from '../Views/Home';
import Register from '../Views/SignUp/index'
import RestorePass from "../Views/SignUp/RestorePass"
import NotificationReset from "../Views/SignUp/NotificationReset"
import NewPassword from "../Views/SignUp/NewPassword"
import Login from "../Views/Login/index"
import Welcome from '../Views/Welcome/Welcome'
import ProfileInfo from '../Views/Profile/ProfileInfo'
import ProfileAdress from '../Views/Profile/ProfileAdress'
import ProfileExperience from '../Views/Profile/ProfileExperience'

//Header & Footer

import Footer from '../Components/Footer';

function router() {
    return (
        <BrowserRouter>
            <Switch>
                <ClientRoute path={ROUTES.REGISTER} component={Register} />
                <ClientRoute path={ROUTES.RESTOREPASS} component={RestorePass} />
                <ClientRoute path={ROUTES.NOTIFICATIONPASS} component={NotificationReset} />
                <ClientRoute path={ROUTES.NEWPASSWORD} component={NewPassword} />
                <ClientRoute path={ROUTES.LOGIN} component={Login} />
                <ClientRoute path={ROUTES.WELCOME} component={Welcome} />
                <ClientRoute path={ROUTES.INFO} component={ProfileInfo} />
                <ClientRoute path={ROUTES.INFOADRESS} component={ProfileAdress} />
                <ClientRoute path={ROUTES.INFOEXPERIENCE} component={ProfileExperience} />  
                <ClientRoute exact path={ROUTES.HOME} component={Home} />
            </Switch>
        </BrowserRouter>
    )

    function ClientRoute({ component: Component, ...rest }) {
        return (
            <Route
                {...rest}
                render={props =>
                    <div>

                        <div className="">
                            <Component {...props}/>
                        </div>
                        <Footer/>
                        
                    </div>
                }
            />
        )
    }

}

export default router