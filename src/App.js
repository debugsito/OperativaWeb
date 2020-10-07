import React, {useEffect} from 'react';
import Router from './Router/router';
import ReactGa from "react-ga"


const App = () => {

    useEffect(()=> {

        ReactGa.initialize('UA-179958704-1')
        //page view
        ReactGa.pageview(window.location.pathname + window.location.search)
    }, [])

    return (
        <div className="container-fluid container-no-padding">
            <Router/>
        </div>
    )
}

export default App
