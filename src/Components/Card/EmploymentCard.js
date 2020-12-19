import React from 'react'
import * as FaIcons from 'react-icons/fa'
import './index.css'

const EmploymentCard = () => {

    return (
    <div className="col-12 mt-4">
        <div className="card-job">
            <div className="card-body">
                <blockquote className="blockquote mb-0">
                    <button type="button" className="edit-card mt-2">
                        <span><FaIcons.FaPen size={14}/>  EDITAR</span>
                    </button>
                    <button type="button" className="edit-card mt-2">
                        <span><FaIcons.FaTrashAlt size={14}/>  BORRAR</span>
                    </button>
                    <p className="name-company">Nombre de la empresa</p>
                    <footer className="card-job-subtitle">
                        <label className="vertical-align"><FaIcons.FaCalendarAlt/>&nbsp;</label>
                        <label>Publicado 12 de noviembre del 2020</label>
                    </footer>
                    <label className="label-postulant">100 postulantes</label>
                </blockquote>
            </div>
        </div>
    </div>
    )
}

export default EmploymentCard
