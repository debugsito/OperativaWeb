import React from "react";

//router
import { Switch } from "react-router-dom";
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
import Authenticate from '../pages/Authenticate';
import AuthRedirect from "../pages/AuthRedirect";
import PublicationGlobal  from "../pages/PublicationGlobal";
import Error from "../pages/Error";
import FinishCV from "../pages/FinishCV";
import FinishCVStatus from "../pages/FinishCVStatus";
import PersonalInformation from "../pages/PersonalInformation";
import Education from "../pages/Education";
import WorkExperience from "../pages/WorkExperience";
import Questionnaire from "../pages/Questionnaire";

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
        <PrivateRoute exact path={HomeRoutes[7]} component={Authenticate} />
        <PrivateRoute exact path={HomeRoutes[8]} component={Authenticate} />
        <PrivateRoute exact path={HomeRoutes[9]} component={Authenticate} />
        <PrivateRoute exact global={true} path={HomeRoutes[12]} component={PublicationGlobal} />
        <PrivateRoute exact global={true} path={HomeRoutes[13]} component={PersonalInformation} />
        <PrivateRoute exact global={true} path={HomeRoutes[14]} component={FinishCV} />
        <PrivateRoute exact global={true} path={HomeRoutes[15]} component={FinishCVStatus} />
        <PrivateRoute exact global={true} path={HomeRoutes[16]} component={Education} />
        <PrivateRoute exact global={true} path={HomeRoutes[17]} component={WorkExperience} />
        <PrivateRoute exact global={true} path={HomeRoutes[18]} component={Questionnaire} />
      </Switch>
    </>
  );
};
export default MyAccountRouter;
