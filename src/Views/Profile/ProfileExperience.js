import React, { Fragment, useEffect} from "react";
import NavBar from "../../Components/MenuUser/index"
import { Link, withRouter } from 'react-router-dom'
import { useForm } from "react-hook-form";
import './index.css';
import ProfileProfessional from "./ProfileProfessional";



const ProfileAdress = (props) => { 

    const [experienceBuss, setExperienceBuss]= React.useState(false);

    const { handleSubmit} = useForm();

    const onSubmit = (values) => { 
        console.log(values);
        props.history.push('/info-con-experiencia-profesional')
    } 

    const handleExperience= (e)=>{
        console.log()
        setExperienceBuss(e)
    }
    const useHeadings = () => {
        const [listHeadings , setListHeadings] = React.useState([])
        
        useEffect(() => {
            fetch('json/rubros.json')
            .then(response => response.json())
                    .then(datos => {
                        setListHeadings(datos)
                    })
        }, [])
        return listHeadings
    }  
    
    const listHeadings= useHeadings();
    return (
        <Fragment>
            <div className="row justify-content-center row-no-magin">
        <NavBar/>
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                <div>
                    <h1 className='h1-title-form'>COMPLETA TU REGISTRO</h1>
                </div>
                <h1 className='h1-form'>Completa tu experiencia profesional</h1>
                <form name="myForm" onSubmit= { handleSubmit(onSubmit)} className='form-container-info'>
                    <label className="label-form mt-2 mb-2">         
                        Expericia laboral
                        <div className= "input-container-select mt-2">
                            <div name="form-check">
                                <input className="form-check-input"
                                type="radio" 
                                name="family" 
                                id="single" 
                                value="option1"
                                onClick= {()=> {handleExperience(false) }}
                                checked={!experienceBuss ? 'checked': '' }
                                />
                                <label className="form-text-check">
                                    Sin experiencia
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input"
                                type="radio" 
                                name="family" 
                                id="married" 
                                value="option2"
                                required=""
                                onClick= {()=> {handleExperience(true) }}
                                checked={experienceBuss ? 'checked': '' }
                                />
                                <label className="form-text-check">
                                    Con experiencia
                                </label>
                            </div>
                        </div>
                    </label>
                    {
                        experienceBuss ? (
                            <ProfileProfessional/>) :(
                    <>
                        <label className="label-form" >
                            Rubro de interés
                            <select 
                                className="form-control form-text-check-adress mt-2"
                                id=""
                                >
                                    <option value={-1}>Option</option>
                                    {
                                listHeadings.map(item =>(
                                    <option >{item.name}</option>
                                ))
                            }
                            </select>
                        </label>  
                        <section  className="">
                            <Link
                                className="mt-3" 
                                type= 'submit' 
                                to="/"
                                >
                                AGREGAR OTRA EXPERIENCIA
                            </Link> 
                        </section>                
                        <section  className="container-buttons">
                            <Link
                                className="button-continue btn icon-next" 
                                type= 'submit' 
                                to="/info-con-experiencia-profesional"
                                >
                                CONTINUAR
                            </Link> 
                        </section>                      
                    </> 
                    )
                    }
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default withRouter(ProfileAdress)
