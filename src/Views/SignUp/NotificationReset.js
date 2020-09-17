import React, { Fragment } from "react";
import NavBarOperativa from "../../Components/MenuOperativa";
import { Link} from 'react-router-dom'

const NotificationReset= (props) => {
    return (
            <Fragment>
                <NavBarOperativa/>
                <div className="row justify-content-center container-padding row-no-magin">
                    <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                        <h1 className='h1-custom-notification'>
                            TE HEMOS ENVIADO UN CORREO ELECTRÓNICO CON INSTRUCCIONES
                        </h1>
                        <div className="row">
                            <div className="col-12">
                                <Link
                                        className="button-continue-notification btn icon-next" 
                                        type= 'submit' 
                                        to="/nueva-contraseña"
                                        >
                                        CONTINUAR
                                </Link> 

                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
    )
}
export default NotificationReset