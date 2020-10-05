import React from 'react'

const Stepper = ({current}) => {
    const actual = current ? parseInt(current) : 0;

    const page = [
        '/info',
        '/info-direccion',
        '/informacion-academica',
        '/info-experiencia'
    ]

    const limitPrevious = 0
    const limitNext = (page.length) - 1;
    const limitPage = page.length;
    const actualPage = actual + 1;
    const previous = actual === limitPrevious ? limitPrevious : actual - 1;
    const next = actual === limitNext ? limitNext : actual + 1;

    return (
        <div className="progress-form">
            <div className="container-progress">
                <a href={page[previous]} className="item-left icon-left">
                </a>
                <span className="item-center">Paso {actualPage} de {limitPage}</span>
                <a href={page[next]} className="item-right icon-right">
                </a>
            </div>
        </div>
    )
}

export default Stepper
