import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import * as ROUTES from '../Constant/routes';
// Views
// import Home from '../Views/Home';
import Register from '../Views/SignUp/index'
import Login from "../Views/Login/index"
import Welcome from '../Views/Welcome/Welcome'
//Header & Footer
import Header from "../Components/Header";
import Footer from '../Components/Footer';

function router() {
    return (
        <BrowserRouter>
            <Switch>
                {/* <ClientRoute exact path={ROUTES.HOME} component={Home} /> */}
                <ClientRoute path={ROUTES.LOGIN} component={Login} />
                <ClientRoute path={ROUTES.WELCOME} component={Welcome} />
                <ClientRoute path={ROUTES.REGISTER} component={Register} />
            </Switch>
        </BrowserRouter>
    )

    function ClientRoute({ component: Component, ...rest }) {
        return (
            <Route
                {...rest}
                render={props =>
                    <div>
                        <Header/>
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