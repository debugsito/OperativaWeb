import React, { Fragment } from "react";
import { Link, withRouter } from 'react-router-dom'
import './index.css';
import { useForm } from "react-hook-form";
import NavBarOperativa from "../../Components/MenuOperativa";
import axios from "axios";

const Login= (props) => {
    const { handleSubmit, register, errors, formState} = useForm();
    const { isSubmitted } = formState;
    const baseUrl="http://3.136.22.230:5000/auth/login";
    

    const onSubmit = (values) => { 
        console.log(values);
        axios.post(baseUrl, { 
            params: {
                    email: values.usuario, 
                    password: values.password 
                    }
        }).then(response=>{
            if(response.status === 200) {
                // Guardar el tocken que devuelve el api en el local storage
                localStorage.setItem('token');
                props.history.push('/inicio') 

            } else if(response.staus === 401) {
                alert(response.message);
            }
            else {
                alert("Ha ocurrido un error interno.");
                console.log(response.data);
            }
        }).catch(error=>{
            alert("Ha ocurrido un error interno con el api");
            console.log(error);
        })
    }
    return (
        <Fragment>
        <NavBarOperativa/>
            <div className="row justify-content-center container-padding row-no-magin">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <h1 className='h1-custom'>INICIA SESIÓN EN OPERATIVA</h1>
                    <form  className='form-container' onSubmit= { handleSubmit(onSubmit) } >
                        <label className="label-form">
                            Correo Electrónico
                            <input
                                placeholder ="mail@ejemplo.com" 
                                
                                className={`form-control placeholder
                                                ${
                                                    isSubmitted ? 
                                                        !errors.usuario ?
                                                        "input-icono"
                                                        : 
                                                        "border-error red-input" 
                                                        
                                                    : ''
                                                }
                                            `}
                                id="email"
                                name="usuario"
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
                        <span className="span-error">
                            {errors.usuario && errors.usuario.message}
                        </span>
                        <label className="label-form">
                            Contraseña
                            <input
                                placeholder=".........."
                                className={`form-control placeholder
                                    ${
                                        isSubmitted ? 
                                            !errors.password ?
                                            "input-icono"
                                            : 
                                            "border-error red-input" 
                                            
                                        : ''
                                    }
                                `} 
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
                        <span className="span-error">
                            {errors.password && errors.password.message}
                        </span>                       
                        <div>
                            <span className="info-form"><a href="/restablecer-contraseña">Restablecer contraseña</a></span>
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