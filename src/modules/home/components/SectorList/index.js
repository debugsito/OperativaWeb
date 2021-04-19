import React from 'react'
import { makeStyles } from '@material-ui/core'
import { sectorBuilding, sectorCallCenter, sectorClean, sectorCourier, sectorProduction, sectorStorage } from "../../images2";
import { SectorCard } from "../";

const list = [
    {
        image: sectorProduction,
        text: "Produccion y Operaciones"
    },
    {
        image: sectorClean,
        text: "Mantenimiento y Limpieza"
    },
    {
        image: sectorCallCenter,
        text: "Call center y Ventas"
    },
    {
        image: sectorCourier,
        text: "Motorizados y Courier"
    },
    {
        image: sectorBuilding,
        text: "Construccion y Obras"
    },
    {
        image: sectorStorage,
        text: "Almacén y Transporte"
    },
]

const useStyles = makeStyles(theme => ({
    root: {
        margin: '0 2rem',
        display: 'flex',
        flexWrap: 'wrap',
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'space-around'
        },
        [theme.breakpoints.up('md')]: {
            justifyContent: 'space-evenly'
        },

    },


}))

export default function SectorList(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {
                list.map((sector, index) => <SectorCard text={sector.text} image={sector.image} index={index} />)
            }
        </div>
    )
}
