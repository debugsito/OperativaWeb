import React from 'react';
import './assets/css/variables.css';
import './assets/css/footerTable.css';
import './index.css';

import AppRouter from './routers';

function App() {

    window.addEventListener('beforeinstallprompt',e=>{
        // For older browsers
        e.preventDefault();
        console.log("Install Prompt fired");
        alert('Entré al flujo pwa');
        this.installPrompt = e;
        // See if the app is already installed, in that case, do nothing
        if((window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone === true){
            return false;
        }
        // Set the state variable to make button visible
        /*this.setState({
            installButton:true
        })*/
    })

    return (
        <AppRouter/>
    );
}

export default App;
