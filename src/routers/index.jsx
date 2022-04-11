import React from 'react';

//react router
import { BrowserRouter, Route } from 'react-router-dom';

//Global routes
import OperativaModule from '../modules';

//ScrollRouter
import ScrollToTopRouter from './ScrollTopRouter';

//Global Sidebar
import { Navigation } from "../modules/shared/components";
import BottomNavigationBar from "../modules/shared/components/BottomNavigationBar";
import {useSelector} from "react-redux";




const AppRouter = () => {
    const { user } = useSelector(state => state?.auth);
    console.log(user.account);
    return (
    <BrowserRouter>
      <Navigation>
        <ScrollToTopRouter />
        <Route to={OperativaModule.moduleRouter.pathBase} component={OperativaModule.moduleRouter.componentRouter} />
      </Navigation>
        {user.account.rol_usuario === 'postulante' &&
            <BottomNavigationBar />
        }
    </BrowserRouter>
  );
};

export default AppRouter;
