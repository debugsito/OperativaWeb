import React from "react";
import { Link } from 'react-router-dom'
import './index.css';

export default function Home() {

    return (
        <div className='container-fluid'>
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <h1 className="text-h1">OPERATIVA</h1>
                        <form className="p-3 container-form">
                            <Link 
                                className="btn-sign-up btn ml-3" 
                                type= 'submit'
                                to="/register"
                                >
                                REGISTRATE
                            </Link> 
                        </form>
                </div>
            </div>
        </div>
    )
} 