import React from "react";
import { PizzaHut } from "../../../shared/images";
import { CalendarTodayOutlined, Notifications } from '@material-ui/icons';
import { useHistory } from "react-router-dom";
import { SessionRoutes } from "../../../shared/libs/sessionRoutes";
import * as moment from 'moment';
import { makeStyles } from "@material-ui/core";
import ApplicantStatusSpan from "../ApplicantStatusSpan";


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
        height: 'auto',
        borderRadius:'50%'
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
    const { data, status = null } = props;
    const history = useHistory()
    const initRoute = SessionRoutes().initRoute;
    const selectItemResult = () => {
        history.push(`${initRoute}/postulaciones/detalle/${data.id}`);
    };

    const formatDate = (value) => {
        if (value) {
            const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'setiembre', 'octubre', 'noviembre', 'diciembre'];
            const objDate = moment(value);
            return `${objDate.format('DD')} de ${months[Number(objDate.format('MM'))]} del ${objDate.format('YYYY')}`;
        }
        return '30 de julio del 2021';
    };

    const getEvalucacionesNotification = () => {
        const { medical_test, interviewed, questions, verificativa, evaluativa,uncomplete_questions,unread_messages } = data;
        if (uncomplete_questions || unread_messages) {
            return true;
        }
        return false
    }

    return (
        <div className={classes.containerResult} onClick={selectItemResult}>
            <ApplicantStatusSpan status={status} />
            {getEvalucacionesNotification() ? <div className={classes.notification}>
                <span className={classes.notificationIcon}><Notifications /></span>
            </div> : <></>}
            <div className={classes.headerResultCard}>
                <div>
                    {data?.publication?.account?.account_sup?.user?.image_url ?
                        <img src={data?.publication?.account?.account_sup?.user?.image_url} className={classes.brandImg} alt="" />
                        : data?.publication?.account?.user?.image_url ?
                            <img src={data?.publication?.account?.user?.image_url} className={classes.brandImg} alt="" />
                            : <></>
                    }
                </div>
                <h4 style={{marginLeft:'0.5rem'}}>
                    <span className={classes.title}>{data.publication.job_title}</span> <br />
                    <small className={classes.businessName}>{data.publication.company}</small>
                </h4>
            </div>
            <div className={classes.bodyResultCard}>
                <div>
                    <CalendarTodayOutlined className={classes.calendarIcon} />
                    {/*<span>30 de julio del 2021</span>*/}
                    <span>{formatDate(data.createdAt)}</span>
                </div>
                <div>Salario S/{data.publication.salary}</div>
            </div>
        </div>
    );
}
