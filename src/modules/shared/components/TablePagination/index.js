import React from 'react'
import { TablePagination, makeStyles } from "@material-ui/core";
import "./index.css"

const tableStyles = makeStyles(theme => ({
    root: {
        background: "#373737",
        color: "#fff"
    },
}))
export default function Index(props) {
    const classes = tableStyles()

    return (
        <div className="table-custom-pagination">
            <TablePagination
                {...props}
                classes={classes}
                component="div"
                labelRowsPerPage="Filas por página"
                labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count !== -1 ? count : to}`}
            />
        </div>
    )
}
