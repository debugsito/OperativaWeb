import React, { Fragment } from "react";
import NavBarOperativa from "../../Components/MenuOperativa";


const Welcome= () => {
    return (
            <Fragment>
                <NavBarOperativa/>
                <div className="row justify-content-center container-padding row-no-magin">
                    <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                        <h1 className='h1-custom-init'>BIENVENIDO</h1>
                    </div>
                </div>
            </Fragment>
    )
}
export default Welcome