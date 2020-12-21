import React from 'react'
import NavBar from '../../Components/MenuUser/index';
import * as FaIcons from 'react-icons/fa'
import EmploymentCard from '../../Components/Card/EmploymentCard';
import { Link } from 'react-router-dom'

import './index.css'

const HomeCompany = (props) => {


    

    
    return (
        <>
        <NavBar />
        <div className='row row-no-magin padding-container'>
            <div className='col-12 col-md-12 container-no-padding m-nav-form'></div>
            <div className='col-12 col-md-12 container-no-padding mt-2'>
                <div className='row justify-content-center'>
                    <div className="col-12 mt-4">
                        <div className="card-job">
                            <div className="card-body">
                                <blockquote className="blockquote mb-0">
                                    <button type="button" className="edit-card mt-2">
                                        <span><FaIcons.FaPen size={14}/>  EDITAR</span>
                                    </button>
                                    <p className="name-company">Nombre de la empresa</p>
                                    <footer className="">RUC: 25748574851</footer>
                                </blockquote>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 container-no-padding">
                        <h1 className="h1-tittle-carousel">Posiciones abiertas</h1>
                        <div className='row justify-content-left ml-2'>
                            <Link
                                className="btn btn-nuevo-user" 
                                to='/publications'
                                >
                                PUBLICAR EMPLEO
                            </Link> 
                        </div>
                    </div>
                    
                    <EmploymentCard></EmploymentCard>
                    
                </div>
            </div>
        </div>
        </>
    )
}

export default HomeCompany