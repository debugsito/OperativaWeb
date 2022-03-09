import React from "react";
import {PizzaHut} from "../../../shared/images";
import {CalendarTodayOutlined, Notifications} from '@material-ui/icons';
import {useHistory} from "react-router-dom";
import {SessionRoutes} from "../../../shared/libs/sessionRoutes";
import * as moment from 'moment';
import {makeStyles} from "@material-ui/core";

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
    containerResult: {
        padding: '1.5rem 1rem 2rem',
        background: '#FFFFFF',
        boxShadow: '0px 4px 24px rgba(136, 166, 255, 0.05)',
        borderRadius: '12px',
        marginBottom: '1.5rem',
        cursor: 'pointer',
        position: 'relative'
    },
    brandImg: {
        width: '4rem',
        height: 'auto'
    },
    headerResultCard: {
        display: 'flex',
        flexDirection: 'row',
    },
    bodyResultCard: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    status: {
        position: 'absolute',
        top: '-.5rem',
        left: '-.5rem',
        background: '#B8EA71',
        borderRadius: '100px',
        padding: '4px 16px',
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

export default function ApplicantAccountItem(props) {
    const classes = useStyles();
    const {data} = props;
    const history = useHistory()
    const initRoute = SessionRoutes().initRoute;
    const selectItemResult = () => {
        history.push(`${initRoute}/postulacion/aviso/${data.id}`);
    };

    const formatDate = (value) => {
        if (value) {
            const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'setiembre', 'octubre', 'noviembre', 'diciembre'];
            const objDate = moment(value);
            return `${objDate.format('DD')} de ${months[Number(objDate.format('MM'))]} del ${objDate.format('YYYY')}`;
        }
        return '30 de julio del 2021';
    };

    return (
        <div className={classes.containerResult} onClick={selectItemResult}>
            <div className={classes.status}>
                <span>Activo</span>
            </div>
            <div className={classes.notification}>
                <span className={classes.notificationIcon}><Notifications/></span>
            </div>
            <div className={classes.headerResultCard}>
                <div>
                    <img src={PizzaHut} className={classes.brandImg} alt=""/>
                </div>
                <h4>
                    <span className={classes.title}>Motorizado - Delivery</span> <br/>
                    <small className={classes.businessName}>Pizza Hut SAC</small>
                </h4>
            </div>
            <div className={classes.bodyResultCard}>
                <div>
                    <CalendarTodayOutlined className={classes.calendarIcon}/>
                    {/*<span>30 de julio del 2021</span>*/}
                    <span>{formatDate(data.createdAt)}</span>
                </div>
                <div>Salario S/1800</div>
            </div>
        </div>
    );
}
