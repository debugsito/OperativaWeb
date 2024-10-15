import React from 'react';
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { SessionRoutes } from '../../libs/sessionRoutes'

const useStyles = makeStyles(theme => ({
    link:{
        textDecoration: 'none',
        color:"inherit"
    }
}))

export default function CustomLink({ children, to, state=null, ...props }) {
    const initRoute = SessionRoutes().initRoute
    const classes = useStyles()
    const url = `${initRoute}${to}`; 
    let data = url
    if(state){
        data = {
            pathname: url,
            state: state
        }
    }
    return (
        <Link className={classes.link} to={data} {...props}>
            {children}
        </Link>
    );
};
