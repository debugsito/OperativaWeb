import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import * as ROUTES from '../Constant/routes';
// Views
import Home from '../Views/Home';
import Register from '../Views/SignUp/index';
import RestorePass from '../Views/ResetPass/RestorePass';
import NotificationReset from '../Views/Notificaciones/NotificationReset';
import UpdatePassword from '../Views/Notificaciones/UpdatePassword';
import RequestSent from '../Views/Notificaciones/RequestSent';
import NewPassword from '../Views/ResetPass/NewPassword';
import Login from '../Views/Login/index';
import Welcome from '../Views/Welcome/Welcome';
import ProfileInfo from '../Views/Profile/ProfileInfo';
import ProfileAdress from '../Views/Profile/ProfileAdress';
import ProfileAcademic from '../Views/Profile/ProfileAcademic';
import ProfileExperience from '../Views/Profile/ProfileExperience';
import ProfileUpdate from '../Views/Profile/ProfileUpdate';
import RegistrationRequest from '../Views/Company/RegistrationRequest';
import Request from '../Components/Table/Request';
import MaintenanceUser from '../Views/Company/MaintenanceUser';
import HomeCompany from '../Views/Company/HomeCompany';
import Publications from '../Views/Company/Publications';
import { useSelector } from 'react-redux';
 
const userPages = ['/inicio','/info','/info-direccion','/informacion-academica','/info-experiencia','/informacion-completada-con-exito'];
const adminPages = ['/solicitudes', '/welcome','/maintenance-user', '/inicio', '/menu-company'];
const businessPages = ['/solicitudes','/inicio', '/menu-company', '/publications'];
const muniPages = ['/solicitudes','/inicio', '/menu-company', '/publications'];

//Guardar Token
const isAuth = (account,routeName,token) => {
  if (account && token) {
    switch (account.account.role) {
      case 'admin':
        return adminPages.includes(routeName);
      case 'postulante':
        return userPages.includes(routeName);
      case 'business':
        return businessPages.includes(routeName);
      case 'muni':
        return muniPages.includes(routeName);
      default:
        return false;
    }
  }
  return false;
};
function router() {
  return (
    <BrowserRouter>
      <Switch>
        {/* cambio de Privados y Publicos */}
        <Route exact path={ROUTES.HOME} component={Home} />
        <Route path={ROUTES.LOGIN} component={Login} />
        <Route path={ROUTES.REGISTER} component={Register} />
        <Route path={ROUTES.RESTOREPASS} component={RestorePass} />
        <Route path={ROUTES.NOTIFICATIONPASS} component={NotificationReset} />
        <Route path={ROUTES.NOTIFICATIONREQUESTSENT} component={RequestSent} />
        <Route path={ROUTES.NOTIFICATIONUPDATEPASSWORD} component={UpdatePassword} />
        <Route path={ROUTES.NEWPASSWORD} component={NewPassword} />
        <Route path={ROUTES.REGISTRATION_REQUEST} component={RegistrationRequest} />
        
        <PrivateRoute path={ROUTES.HOMECOMPANY} component={HomeCompany} />
        <PrivateRoute path={ROUTES.PUBLICATIONS} component={Publications} />
        <PrivateRoute path={ROUTES.SOLICITUDES} component={Request} />
        <PrivateRoute path={ROUTES.MAINTENANCE_USER} component={MaintenanceUser} />
        <PrivateRoute path={ROUTES.WELCOME} component={Welcome} />
        <PrivateRoute path={ROUTES.INFO} component={ProfileInfo} />
        <PrivateRoute path={ROUTES.INFOADRESS} component={ProfileAdress} />
        <PrivateRoute path={ROUTES.INFOACADEMIC} component={ProfileAcademic} />
        <PrivateRoute path={ROUTES.INFOEXPERIENCE} component={ProfileExperience} />
        <PrivateRoute path={ROUTES.PROFILEUPDATESUCCESSFUL} component={ProfileUpdate} />
      </Switch>
    </BrowserRouter>
  );

  function PrivateRoute({ component: Component, ...rest }) {
    const account = useSelector(state => state.user);
    const token = localStorage.getItem('token');
  
    return (
      <Route
        {...rest}
        render={(props) =>
          isAuth(account, rest.path, token) ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                path: '/inicio'
              }}
            />
          )
        }
      />
    );
  }
}

export default router;
