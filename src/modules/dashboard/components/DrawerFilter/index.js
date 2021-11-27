import React from 'react'
import PropTypes from 'prop-types'
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
    paper:{
        borderRadius:"10px 0 0 0"
    },
    container:{
        width:350,
    },
    header:{
        width:"100%",
        height:68,
        background:"#5D5FEF",
        borderRadius: "10px 0px 0px 0px",

        display:"flex",
        alignItems:"center",
        paddingLeft:"1.5em",
    }
}))

const DrawerFilter = ({openDrawer, handleClose}) => {
    const classes = useStyles()

    return (
        <Drawer
          variant="temporary"
          anchor="right"
          open={openDrawer}
          onClose={handleClose}
          classes={{paper:classes.paper}}
        >
            <div className={classes.container}>
                <div className={classes.header}>
                    <Typography variant="h6" className="color-white">Filtar por:</Typography>
                </div>
            </div>
        </Drawer>
    )
}

DrawerFilter.propTypes = {
    openDrawer: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired
}

export default DrawerFilter
