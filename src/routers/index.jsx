import React from 'react';

//react router
import { BrowserRouter, Route } from 'react-router-dom';

//Global routes
import OperativaModule from '../modules';

//ScrollRouter
import ScrollToTopRouter from './ScrollTopRouter';

//Global Sidebar
// import { Navigation } from "../modules/shared/components";




const AppRouter = () => {
  return (
    <BrowserRouter>
      {/* <Navigation> */}
        <ScrollToTopRouter />
        <Route to={OperativaModule.moduleRouter.pathBase} component={OperativaModule.moduleRouter.componentRouter} />
      {/* </Navigation> */}
    </BrowserRouter>
  );
};

export default AppRouter;
