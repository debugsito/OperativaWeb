import React from 'react'
import { DataGrid } from '@material-ui/data-grid';
import "./datagrid.css"


// PD1. como todas las tablas tienen una paginacion igual (en cuanto a estilos: color)
// en el assets principal se agrego el css para todos: src/assets/css/footerTable.css

// PD2.Si bien es cierto algunos textos estan ingles, estos se pueden modificar.
// Siempre en los componentes que usen revicen la doc en la parte de "Props".
// Ahi encontre un prop llamado "localeText" y eso me llevo al link de abajo :) 
// https://github.com/mui-org/material-ui-x/blob/HEAD/packages/grid/_modules_/grid/constants/localeTextConstants.ts

const DEFAULT_LOCAL_TEXT = {
    footerPaginationRowsPerPage: "Filas por página",
    footerRowSelected: (count) =>
        count !== 1
            ? `${count.toLocaleString()} filas seleccionadas`
            : `${count.toLocaleString()} fila seleccionada`,
}

export default function Index({ ...props }) {

    return (
        <div style={{ height: 400, width: '100%', background: "white" }}>
            <DataGrid
                localeText={DEFAULT_LOCAL_TEXT}
                disableColumnMenu
                {...props}
            />
        </div>

    )
}
