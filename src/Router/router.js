import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import * as ROUTES from '../Constant/routes';
// Views
import Home from '../Views/Home';
import Login from '../Views/Login';
//Header & Footer
import Header from "../Components/Header";
import Footer from '../Components/Footer';

function router() {
    return (
        <BrowserRouter>
            <Switch>
                <ClientRoute exact path={ROUTES.HOME} component={Home} />
                <ClientRoute exact path={ROUTES.LOGIN} component={Login} />
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