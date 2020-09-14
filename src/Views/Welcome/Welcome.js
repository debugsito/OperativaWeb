import React, { Fragment } from "react";
import NavBarOperativa from "../../Components/MenuOperativa";


const Welcome= () => {
    return (
            <Fragment>
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <h1 className='h1-custom-init'>BIENVENIDO</h1>
                    </div>
                </div>
                <NavBarOperativa/>
            </Fragment>
    )
}
export default Welcome