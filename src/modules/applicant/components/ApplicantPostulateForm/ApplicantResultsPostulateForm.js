import React from "react";
import './ApplicantResultsPostulateForm.css';
import {PizzaHut} from "../../../shared/images";
import {CalendarTodayOutlined} from '@material-ui/icons';
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
        background: '#FFFFFF',
        boxShadow: '0px 4px 24px rgba(136, 166, 255, 0.05)',
        borderRadius: '12px',
        marginBottom: '1.5rem',
        cursor: 'pointer',
        position: 'relative'
    }
}));

export default function ApplicantResultsPostulateForm(props) {
    const classes = useStyles();
    const {data} = props;
    console.log(data);
    const history = useHistory()
    const initRoute = SessionRoutes().initRoute;
    const selectItemResult = () => {
        history.push(`${initRoute}/postulaciones/detalle/${data.publication.id}`);
    };

    const formatDate = (value) => {
        if (value) {
            const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'setiembre', 'octubre', 'noviembre', 'diciembre'];
            const objDate = moment(value);
            return `${objDate.format('DD')} de ${months[Number(objDate.format('MM'))]} del ${objDate.format('YYYY')}`;
        }
        return '';
    };

    return (
        <div className={classes.containerResult} onClick={selectItemResult}>
            <div className={classes.statusProgreso}>
                <span>Activo</span>
            </div>
        
            <div className="header-result-card">
                <div>
                    <img src={PizzaHut} className="brand-img" alt=""/>
                </div>
                <h4>
                    <span className={classes.title}>{data?.publication?.job_title}</span> <br/>
                    <small className={classes.businessName}>{data?.publication?.company}</small>
                </h4>
            </div>
            <div className="body-result-card">
                <div>
                    <CalendarTodayOutlined className={classes.calendarIcon}/>
                    {/*<span>30 de julio del 2021</span>*/}
                    <span>{formatDate(data?.publication?.createdAt)}</span>
                </div>
                <div>Salario S/{data?.publication?.salary}</div>
            </div>
        </div>
    );
}
