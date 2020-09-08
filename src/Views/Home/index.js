import React from "react";
import { Link } from 'react-router-dom'
import './index.css';

export default function Home() {

    return (
        <div className='container-fluid'>
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <h1 className='h1-custom-home'>OPERATIVA</h1>
                    <Link 
                        className="button-sign-up btn"
                        type='submit'
                        to="/registro"
                        >
                        REGISTRATE
                    </Link> 
                </div>
            </div>
        </div>
    )
} 