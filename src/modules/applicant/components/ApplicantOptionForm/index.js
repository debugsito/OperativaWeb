import React from "react";
import './index.css';
import { Notifications, Email, Assignment } from '@material-ui/icons';
import { useHistory } from "react-router-dom";
import { SessionRoutes } from "../../../shared/libs/sessionRoutes";
import { makeStyles } from "@material-ui/core";



const useStyles = makeStyles(theme => ({
    calendarIcon: {
        marginRight: '.5rem',
        marginBottom: '-.4rem'
    },
    businessName: {
        fontWeight: 500
    },
    title: {
        fontWeight: 600
    },
    statusProgreso: {
        position: 'absolute',
        top: '-.5rem',
        left: '-.5rem',
        background: '#B8EA71',
        borderRadius: '100px',
        padding: '4px 16px',
    },
    statusFinalizado: {
        position: 'absolute',
        top: '-.5rem',
        left: '-.5rem',
        background: '#AAAAAA',
        borderRadius: '100px',
        padding: '4px 16px',
    },
    containerResult: {
        padding: '1.5rem 1rem 2rem',
        boxShadow: '0px 4px 24px rgba(136, 166, 255, 0.05)',
        borderRadius: '12px',
        marginBottom: '1.5rem',
        cursor: 'pointer',
        position: 'relative'
    },
    notification: {
        position: 'absolute',
        top: '.5rem',
        right: '.5rem',
    },
    notificationIcon: {
        display: 'block',
        width: '36px',
        height: '36px',
        textAlign: 'center',
        backgroundColor: '#FED253',
        borderRadius: '100%',
        lineHeight: '47px',
    }
}));

export default function ApplicantOptionForm(props) {
    const classes = useStyles();
    const { title, content, route, id, icon , color } = props;
    const history = useHistory()
    const initRoute = SessionRoutes().initRoute;

    const GetIcon = (icon) => {
        if (icon == 'Email') {
            return (
                <Email style={{ color: 'white' }} />
            )
        }
        if (icon == 'Assignment') {
            return (
                <Assignment style={{ color: 'white' }} />
            )
        }
    }

    const selectItemResult = ()=> {
        history.push(route);
    }


    return (
        <div className={classes.containerResult}  onClick={selectItemResult} style={{ background: color}}>
            <div className={classes.notification}>
                <span className={classes.notificationIcon}><Notifications /></span>
            </div>

            <div className="header-result-card">
                <div className="header-title">

                    {GetIcon(icon)}
                    <span style={{ color: 'white', marginLeft: '5px' }} className={classes.title}>{title}</span>


                </div>

            </div>
            <div className="body-result-card">
                <p style={{ color: 'white' }}>{content}</p>
            </div>
        </div>
    );
}
