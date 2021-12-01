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

export default function CustomLink({ children, to, ...props }) {
    const initRoute = SessionRoutes().initRoute
    const classes = useStyles()
    return (
        <Link className={classes.link} to={`${initRoute}${to}`} {...props}>
            {children}
        </Link>
    );
};
