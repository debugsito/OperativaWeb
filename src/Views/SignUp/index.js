import React from "react";
import './index.css';
import { Link, withRouter } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
// import { GoVerified, GoX } from "react-icons/go"
// import LogoVerified from "../../assets/icons/verification.svg"

const Register= (props) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState(null);
    
    const [modalTerms, setModalTerms] = React.useState(false);

    const procesarDatos = e => {
        e.preventDefault()
        if (!email.trim()) {
            console.log('Ingrese Email')
            setError('Ingrese Email')
            return
        }
        if (!validateEmail(email)) {
            console.log('Ingrese Email valido')
            setError('Ingrese Email válido')
            return
        }
        if (!password.trim()) {
            console.log('Ingrese Contraseña')
            setError('Ingrese Contraseña')
            return
        }
        console.log('Pasando todas las validaciones')
        if (password.length < 6) {
            console.log('6 o más carácteres')
            setError('Contraseña de 6 o más carácteres')
            return
        }
        console.log('pasando todas las validaciones')
        setError(null);
        props.history.push('/login')
    }

    const validateEmail= (email) =>{
        
        const expReg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
        if(expReg.test(email)){
            return true
            
        }else {
            return false
        }
    }
    return (
        <div className='container-fluid'>
            <div className="row justify-content-center wrapper">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <h1 className='text'>REGISTRATE EN OPERATIVA</h1>
                    <form onSubmit= { procesarDatos } className='form-container'>
                        <section className="">
                            <label className="style-input-email">
                                Correo Electrónico
                                <input
                                    id='email'
                                    type="text"
                                    className="form-control style-placeholder input-icono" 
                                    alt=''
                                    placeholder ="mail@ejemplo.com" 
                                    onChange={e => setEmail(e.target.value)}
                                    value={email}
                                    />
                                    
                            </label>
                            {/* <img src= {LogoVerified} alt=''/> */}
                            {/* {
                                validateEmail ? 
                                (
                                    <GoVerified
                                    color= 'green'
                                    size= '20px'
                                    />
                                ) : (
                                    <GoX
                                    color= 'red'
                                    size= '20px'
                                    />
                                )
                        }  */}
                            <label className="style-input-password ">
                                Contraseña
                                <input
                                    id='password'
                                    type="password"
                                    className="form-control style-placeholder mb-2 input-icono"
                                    placeholder=".........."
                                    onChange={e => setPassword(e.target.value)}
                                    value={password}
                                />
                            </label>
                            {
                                error && (
                                    <div className="style-input-error">
                                        {error}
                                    </div>
                                )
                            }
                        </section>
                        <label className='space-span' >
                            <input className= "" type="checkbox"
                            />
                            <span className="span ml-2">Acepto <a href="#" onClick={e => setModalTerms(!modalTerms)}>términos y condiciones</a></span>
                        </label>
                        <section  className="container-buttons">
                            <Link
                                className="btn-cancel-register btn" 
                                type= 'submit'
                                 to="/"
                                >
                                CANCELAR  
                            </Link> 
                            <button 
                                className="btn-register btn ml-4" 
                                type= 'submit'
                                // to="/welcome"
                                >
                                REGISTRARME
                            </button>
                        </section>
                        <div>
                            <span className="span-login">Si ya tienes una cuenta <a href="/login">inicia sesión aquí</a></span>
                        </div>
                    </form>
                </div>
            </div>
            <Modal isOpen={modalTerms}>
                <ModalHeader>
                    Terminos y condiciones.
                </ModalHeader>
                <ModalBody>
                    <p>
                    Este es el cuerpo del modal
                    </p>
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
                    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                    ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur 
                    sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est 
                    laborum.
                    </p>
                </ModalBody>
                <ModalFooter>
                    <buttom className="btn btn-danger" onClick={e => setModalTerms(!modalTerms)}> Cerrar </buttom>
                </ModalFooter>
            </Modal>
        </div>
    )
}
export default withRouter(Register) 

//******Codigo para llamado a Api*****

//   const data = { email: setEmail, password: setPassword };
//    const signIn = () => {
//         const requestInfo = {
//             method: 'POST',
//             body: JSON.stringify({data}),
//             headers: new Headers({
//                 'Content-Type': 'application/json'
//             }),
//         };
//         fetch('', requestInfo)
//         .then(response => {
//             if(response.ok) {
//                 return response.json()
//             }
//             throw new Error("Login inválido...");
//         })
//         .then(token => {
//            localStorage.setItem('token', token);
//         })
//         .catch(e =>{
//              setError()
//         }); 
//  }