import React from "react";

//router
import { Route, Switch } from "react-router-dom";
import HomeRoutes from "./HomeRoutes";

//Pages
// import Home from '../pages/Home';
import Home from "../pages/Home2";
import Registro from "../pages/registro";
import Postulante from "../pages/postulante";
import Empresa from "../pages/empresa";
import Municipalidad from "../pages/municipalidad";
import TerminosCondiciones from "../pages/terminos-y-condiciones";
import RecuperarPasword from "../pages/recuperar-password";
// import Authenticate from '../pages/Authenticate';
import AuthRedirect from "../pages/AuthRedirect";
import Error from "../pages/Error";

//PrivateRoute
import PrivateRoute from "../../../routers/PrivateRoute";
import "../styleshome/globals.scss";
import "../styleshome/utils.scss";
import "../styleshome/app.scss";
const MyAccountRouter = () => {
  return (
    <>
      <Switch>
        <PrivateRoute exact path={HomeRoutes[0]} component={Home} />
        <PrivateRoute exact path={HomeRoutes[1]} component={Registro} />
        <PrivateRoute exact path={HomeRoutes[2]} component={Postulante} />
        <PrivateRoute exact path={HomeRoutes[3]} component={Empresa} />
        <PrivateRoute exact path={HomeRoutes[4]} component={Municipalidad} />
        <PrivateRoute exact path={HomeRoutes[5]} component={TerminosCondiciones} />
        <PrivateRoute exact path={HomeRoutes[6]} component={RecuperarPasword} />
      </Switch>
    </>
  );
};
export default MyAccountRouter;
