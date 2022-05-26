import React, {useState} from 'react';
import './assets/css/variables.css';
import './assets/css/footerTable.css';
import './index.css';
import logoOperativa from './assets/images/operativa192.png';
import {useSelector} from "react-redux";

import AppRouter from './routers';

function App() {
    const [installPrompt, setInstallPrompt] = useState(null)
    const [installButton, setInstallButton] = useState(false)
    const { user } = useSelector(state => state?.auth);


    const deviceType = () => {
        const ua = navigator.userAgent;
        if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
            return "tablet";
        }
        else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
            return "mobile";
        }
        return "desktop";
    };
    

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
        if(deviceType()=='mobile'){
            setInstallButton(true);
        }
        
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
            {user.account.rol_usuario === 'postulante' && installButton &&
                <>
                    <div className="alert-install-pwa" onClick={installApp}>
                        <img src={logoOperativa} alt="Operativa"/>
                        <span> Postulante! Operativa es mejor en App. Descarga Operativa en tu celular para tener una mejor experiencia.</span>
                    </div>
                </>
            }
            <AppRouter/>
        </>
    );
}

export default App;
