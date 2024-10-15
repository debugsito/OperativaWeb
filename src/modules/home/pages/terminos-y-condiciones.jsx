import React from 'react'
import Tabs from "../components2/Tabs";
import Tab from "../components2/Tab";
import Container from "../components2/Container";
import TermsAndCondition from "../components2/Policies/TermsAndCondition";
import PoliciesOfPrivacity from "../components2/Policies/PoliciesOfPrivacity";
import PoliciesOfCookies from "../components2/Policies/PoliciesOfCookies";
import ButtonGoBack from "../components2/ButtonGoBack";

export default function TerminosYCondiciones(props) {

    return (
        <Container navbar height="heightPorc">
            <div className="accordion-terminos-y-condiciones">
                <Tabs defaultActiveKey="terminos" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="terminos" title="TÉRMINOS Y CONDICIONES DEL SERVICIO">
                        <TermsAndCondition />
                    </Tab>
                    <Tab eventKey="privacity" title="POLÍTICAS DE PRIVACIDAD">
                        <PoliciesOfPrivacity />
                    </Tab>
                    <Tab eventKey="cookies" title="POLÍTICA DE COOKIES">
                        <PoliciesOfCookies />
                    </Tab>
                </Tabs>
            </div>

        </Container>
    )
}
