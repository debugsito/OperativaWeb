import React from 'react';
import 'boostrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';

const tablaSol = [
    {id:1, año:2000, campeon:"Alianza Lima", subcampeon:"Sporting Cristal"} 
]

const columns = [
    {
        name:'ID',
        selector: 'id',
        sortable: true
    },
    {
        name:'Año',
        selector: 'año',
        sortable: true
    },
    {
        name:'Campeón',
        selector: 'Campeón',
        sortable: true
    },
    {
        name:'Subcampeón',
        selector: 'subcampeon',
        sortable: true
    }
]

function Request(){
    return (
        <div>

        </div>
    )
}

export default Request;