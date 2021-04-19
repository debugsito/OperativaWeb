import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',


        [theme.breakpoints.down('sm')]: {

            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gridTemplateRows: '1fr 1fr',
            justifyItems: 'center'
        }
    },
    img: {
        height: '110px',
        margin: '0 1.5rem',
        [theme.breakpoints.down('sm')]: {
            height: '80px',
            margin: '1rem .2rem',
        }
    }
}))

export default function SlideGenerator(props) {
    const classes = useStyles()

    return (
        <div className={classes.root} key={props.index}>
            {
                props.data.map((img, index) =>
                    <img src={img} key={index} className={classes.img} />
                )
            }
        </div>
    )
}