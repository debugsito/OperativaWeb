import React, {useState} from 'react';
import './assets/css/variables.css';
import './assets/css/footerTable.css';
import './index.css';
import logoOperativa from './assets/images/operativa192.png';

import AppRouter from './routers';

function App() {
    const [installPrompt, setInstallPrompt] = useState(null)
    const [installButton, setInstallButton] = useState(false)

    window.addEventListener('beforeinstallprompt', e => {
        // For older browsers
        e.preventDefault();
        console.log("Install Prompt fired");
        setInstallPrompt(e);
        // See if the app is already installed, in that case, do nothing
        if ((window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone === true) {
            console.log("ACA estoy");
            return false;
        }
        // Set the state variable to make button visible
        // if ((window.innerWidth <= 800) && (window.innerHeight <= 600)) {
        //     setInstallButton(true);
        // }
        setInstallButton(true);
    });

    const installApp = async () => {
        if (!installPrompt) return false;
        installPrompt.prompt();
        let outcome = await installPrompt.userChoice;
        if (outcome.outcome == 'accepted') {
            console.log("App Installed")
        } else {
            console.log("App not installed");
        }
        // Remove the event reference
        setInstallPrompt(null);
        // Hide the button
        setInstallButton(false);
    }

    return (
        <>
            {installButton &&
                <>
                    <div className="alert-install-pwa" onClick={installApp}>
                        <img src={logoOperativa} alt="Operativa"/>
                        <span> Agrega Operativa a la pantalla principal</span>
                    </div>
                </>
            }
            <AppRouter/>
        </>
    );
}

export default App;
