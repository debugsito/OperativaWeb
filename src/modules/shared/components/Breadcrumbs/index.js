import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { useHistory } from 'react-router-dom';

import "./index.css";
const initRoutes = [{ name: "", to: "" }]

export default function CustomBreadcrumbs({ routes = initRoutes }) {


    const history = useHistory();
    return (
        <Breadcrumbs aria-label="breadcrumb">
            {
                routes?.map((route, index) => (
                    index === (routes.length - 1) ? <Typography key={index} variant="button" className="title-color">{route.name}</Typography> :
                        <Link key={index} color="inherit" href="#" onClick={() => history.push(route.to)}>
                            <Typography variant="button" className="light-gray-color">
                                {route.name}
                            </Typography>
                        </Link>
                ))
            }
        </Breadcrumbs>
    );
}