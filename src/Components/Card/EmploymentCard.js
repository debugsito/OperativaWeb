import React from 'react'
import * as FaIcons from 'react-icons/fa'
import moment from 'moment';
import './index.css'

const EmploymentCard = ({publish}) => {

    const fechaInicio =  moment(publish.from_date).format('YYYY-MM-DD')

    return (
    <div className="col-12 mt-4 card-container">
        <div className="card-job">
            <div className="card-body">
                <blockquote className="blockquote mb-0">
                    <button type="button" className="edit-card mt-2">
                        <span><FaIcons.FaPen size={14}/>  EDITAR</span>
                    </button>
                    <button type="button" className="edit-card mt-2">
                        <span><FaIcons.FaTrashAlt size={14}/>  BORRAR</span>
                    </button>
                    <p className="name-company">{publish.job_title}</p>
                    <footer className="card-job-subtitle">
                        <label className="vertical-align"><FaIcons.FaCalendarAlt/>&nbsp;</label>
                        <label>{fechaInicio}</label>
                    </footer>
                    <label className="label-postulant">100 postulantes</label>
                </blockquote>
            </div>
        </div>
    </div>
    )
}

export default EmploymentCard
