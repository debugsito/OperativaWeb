import React, { Fragment } from "react";
import { Link, withRouter } from 'react-router-dom'
import './index.css';
import { useForm } from "react-hook-form";
import NavBarOperativa from "../../Components/MenuOperativa";

const Login= (props) => {
    const { handleSubmit, register, errors } = useForm();
    
    const onSubmit = (values) => { 
        console.log(values);
        props.history.push('/inicio') 
    }
    return (
        <Fragment>
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <h1 className='h1-custom'>INICIA SESIÓN EN OPERATIVA</h1>
                    <form onSubmit= { handleSubmit(onSubmit) } className='form-container'>
                        <label className="label-form">
                            Correo Electrónico
                            <input
                                placeholder ="mail@ejemplo.com" 
                                className= {errors.usuario ? "border-error form-control placeholder red-input" : "form-control placeholder"} 
                                id='email'
                                name='usuario'
                                type="text"
                                autoComplete="off"
                                ref={register({
                                    required: "Este campo es requerido",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Coloque un email valido"
                                    }
                                  })}
                            />
                        </label>
                        <span className="input-error">
                            {errors.usuario && errors.usuario.message}
                        </span>
                        <label className="label-form">
                            Contraseña
                            <input
                                placeholder=".........."
                                className={errors.password ? "border-error form-control placeholder red-input": "form-control placeholder"} 
                                // "form-control placeholder mb-2 input-icono"
                                id='password'
                                name='password'
                                type="password"
                                ref={register({
                                    required: "Este campo es requerido",
                                    minLength: { value: 6, message: "Debe contener mínimo 6 caracteres" },
                                    maxLength: { value: 12, message: "Debe contener máximo 12 caracteres" }
                                    }
                                )}
                            />
                        </label>
                        <span className="input-error">
                            {errors.password && errors.password.message}
                        </span>                       
                        <div>
                            <span className="info-form"><a href="/">Restablecer contraseña</a></span>
                        </div>
                        <section  className="container-buttons">
                            <Link
                                className="btn-cancel-register btn" 
                                type= 'submit' 
                                to="/"
                                >
                                CANCELAR  
                            </Link> 
                            <button 
                                className="btn-login btn" 
                                type= 'submit'
                                >
                                INICIAR SESIÓN
                            </button>
                        </section>
                        <div>
                            <span className="info-form">Si aún no tienes una cuenta <a href="/registro">registrate aquí</a></span>
                        </div>
                    </form>
                </div>
            </div>
            <NavBarOperativa/>
        </Fragment>
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