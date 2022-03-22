// import Image from "next/image";

import CustomModal from "./Modal";
import Title from "./Title";
import Tabs from "./Tabs";
import Tab from "./Tab";
import FormLogin from "./Forms/FormLogin";

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import fb from "../images2/login/facebook.svg";
import google from "../images2/login/google.svg";

//Images
import PostulantImage from "../images2/login/postulant.svg";
import BusinessImage from "../images2/login/business.svg";


//Styles
import styles from "../styleshome/components_styles/LoginModal.module.scss";

export default function LoginModal({ showModal, closeModal }) {

    return (
        <CustomModal
            showModal={showModal}
            handleClose={() => closeModal()}
        >
            <div className={styles.container}>
                <Title>Bienvenido</Title>

                <Tabs
                    defaultActiveKey="business"
                    id="login-tab"
                >
                    <Tab eventKey="postulant" title={<img src={PostulantImage} alt="icono" />}
                    >

                        <FormLogin closeModal={closeModal} />
                    </Tab>
                    <Tab eventKey="business" title={<img src={BusinessImage} alt="icono" />}>
                        <Row className="mt-3">
                            <Col className="justify-end">
                                <img src={fb} alt="facebook" />
                            </Col>
                            <Col className="justify-start">
                                <img src={google} alt="google" />
                            </Col>
                        </Row>
                        <FormLogin closeModal={closeModal} />
                    </Tab>
                </Tabs>
                {/* <SocialIcons /> */}
            </div>

        </CustomModal>

    )
}
