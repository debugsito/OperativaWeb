import React from "react";
import { Link, withRouter } from 'react-router-dom'
import './index.css';

const Login= (props) => {
     
    const handleSubmit = e => {
        e.preventDefault();
        props.history.push('/welcome')
    }
    return (
        <div className='container-fluid'>
            <div className="row justify-content-center wrapper">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <h1 className='text'>INICIA SESIÓN EN OPERATIVA</h1>
                    <form className='form-container' onSubmit= {handleSubmit}>
                        <section className="">
                            <label className="style-input-email">
                                Correo Electrónico
                                <input
                                    id='email'
                                    type="email"
                                    className="form-control style-placeholder"
                                    placeholder="mail@ejemplo.com"
                                    // onChange={e => setEmail(e.target.value)}
                                    // value={email}
                                />
                            </label>
                            <label className="style-input-password ">
                                Contraseña
                                <input
                                    id='password'
                                    type="password"
                                    className="form-control style-placeholder mb-2 "
                                    placeholder=".........."
                                    // onChange={e => setPass(e.target.value)}
                                    // value={pass}..
                                />
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
                                INICIAR SESIÓN
                            </button>
                        </section>
                        </section>
                        <div>
                            <span className="span-login">Si aún no tienes una cuenta <a href="/register">registrate aquí</a></span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default withRouter(Login)


//*****Codigo para llamado a Api*****
// const baseUrl="";
// const [user, setUser] = React.useState('');
// componentDidMount() {
//     const token = localStorage.getItem('token');
//     fetch('', { headers: new Headers({ 'Authorization': `Bearer ${token}` })})
//     .then(response => {
//         if(response.ok) {
//             return response.json();
//         }
//         throw new Error("Oops! Ocorreu um erro. :(");
//     })
//     .then(user => this.setState({ user }))
//     .catch(e => console.log(e));
// }

//***Codigo de llamado a la Api con axios */
// iniciarSesion=async()=>{
//     await axios.get(baseUrl, {params: {username: this.state.form.username, password: md5(this.state.form.password)}})
//     .then(response=>{
//         return response.data;
//     })
//     .then(response=>{
//         if(response.length>0){
//             var respuesta=response[0];
//             cookies.set('id', respuesta.id, {path: "/"});
//             cookies.set('apellido_paterno', respuesta.apellido_paterno, {path: "/"});
//             cookies.set('apellido_materno', respuesta.apellido_materno, {path: "/"});
//             cookies.set('nombre', respuesta.nombre, {path: "/"});
//             cookies.set('username', respuesta.username, {path: "/"});
//             alert(`Bienvenido ${respuesta.nombre} ${respuesta.apellido_paterno}`);
//             window.location.href="./menu";
//         }else{
//             alert('El usuario o la contraseña no son correctos');
//         }
//     })
//     .catch(error=>{
//         console.log(error);
//     })

// }

// componentDidMount() {
//     if(cookies.get('username')){
//         window.location.href="./menu";
//     }
// }