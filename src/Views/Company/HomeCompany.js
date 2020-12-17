import React from 'react'
import NavBar from '../../Components/MenuUser/index';


import './index.css'

const HomeCompany = (props) => {
    

    return (
        <>
        <NavBar />
        <div className='row row-no-magin padding-container'>
            <div className='col-12 col-md-12 container-no-padding m-nav-form'></div>
            <div className='col-12 col-md-12 container-no-padding mt-2'>
                <div className='row justify-content-center'>
                    <div className="card col-12">
                        <div className="card-body">
                            <blockquote className="blockquote mb-0">
                                <button type="button" className="edit-card">
                                    <span>EDITAR</span>
                                </button>
                            <p>Nombre de la empresa</p>
                            
                            <footer className="blockquote-footer">RUC: <cite title="Source Title">Source Title</cite></footer>
                            </blockquote>
                        </div>
                    </div>
                    <div className="col-12 container-no-padding">
                        <h1 className="h1-tittle-carousel">Posiciones abiertas</h1>
                        <div className='row justify-content-left ml-2'>
                            <button className='btn btn-nuevo-user'>PUBLICAR EMPLEO</button>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        </>
    )
}

export default HomeCompany