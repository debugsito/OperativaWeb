import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import * as ROUTES from '../Constant/routes';
// Views
// import Home from '../Views/Home';
import Register from '../Views/SignUp/index'
import Login from "../Views/Login/index"
import Welcome from '../Views/Welcome/Welcome'
import ProfileInfo from '../Views/Profile/ProfileInfo'
import ProfileAdress from '../Views/Profile/ProfileAdress'
//Header & Footer

import Footer from '../Components/Footer';

function router() {
    return (
        <BrowserRouter>
            <Switch>
                {/* <ClientRoute exact path={ROUTES.HOME} component={Home} /> */}
                <ClientRoute path={ROUTES.LOGIN} component={Login} />
                <ClientRoute path={ROUTES.WELCOME} component={Welcome} />
                <ClientRoute path={ROUTES.INFO} component={ProfileInfo} />
                <ClientRoute path={ROUTES.INFOADRESS} component={ProfileAdress} />
                <ClientRoute exact path={ROUTES.REGISTER} component={Register} />
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