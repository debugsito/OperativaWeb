import { Container, Dialog, Grid, makeStyles, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { SessionRoutes } from "../../shared/libs/sessionRoutes";
import { ImportExport, NavigateBefore } from "@material-ui/icons";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getMessagesApplicant } from "../../../store/actions/applicant/applicant.action";
import { Email, Drafts } from '@material-ui/icons';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import IconButton from '@material-ui/core/IconButton'



const useStyles = makeStyles((theme) => ({
    // background: #f7f7f7;
    // padding: 1rem;
    container: {
        background: '#f7f7f7',
        padding: '1rem',
    },
    spanText: {
        fontWeight: 'bold',
        fontSize: '1.5em'
    },
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    messageBody: {
        display: 'flex',
        direction: 'column'
    },

}));



const ApplicantMessages = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory()
    const { publication_account_id } = useParams();
    const initRoute = SessionRoutes().initRoute;
    const { applicant: { messages } } = useSelector(state => state);


    useEffect(() => {
        getMessages();
    }, []);

    const getMessages = async () => {
        dispatch(getMessagesApplicant(publication_account_id))
    };

    const setBefore = () => {
        history.push(`${initRoute}/postulaciones/detalle/${publication_account_id}`);
    };

    const formatDate = (value) => {
        let date = new Date(value);
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        let strTime = hours + ':' + minutes + ' ' + ampm;
        console.log(strTime)
        return strTime;
    }

    const handleListItemClick = (event, message_id) => {
        history.push(`${initRoute}/mensajes/${publication_account_id}/detalle/${message_id}`);
    };

    return (
        <>
            <Container className={classes.container}>
                <Grid container spacing={0}>
                    <Grid item xs={12} className="mb-2">
                        <a className="btn-logout">
                            <NavigateBefore onClick={setBefore} />
                        </a>
                    </Grid>
                    <Grid item xs={12} className="mb-2">
                        <div className="container-result-postulate-form">
                            <Grid item xs={12} className="mb-2">
                                <div className="container-header">
                                    <h4 className="title">Bandeja de Mensajes</h4>

                                    <IconButton aria-label="order" style={{ color: '#7879F1' }}>
                                        <ImportExport />
                                    </IconButton>
                                </div>
                            </Grid>

                        </div>
                    </Grid>

                    <Grid item xs={12} className="mb-2">
                        <List className={classes.root} >
                            {
                                (messages.map((item, i) => {
                                    return <>
                                        <ListItem alignItems="flex-start" key="{item}"
                                            onClick={(event) => handleListItemClick(event, item.id)}
                                        >

                                            <ListItemAvatar>
                                                {item?.message_detail[0]?.seen == 1 ? <Email /> : <Drafts />}
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={item.user.fullname}
                                                secondary={
                                                    <React.Fragment>
                                                        <Typography
                                                            component="span"
                                                            letiant="body2"
                                                            className={classes.messageBody}
                                                            color="textPrimary"
                                                        >
                                                            {item.subject}
                                                        </Typography>
                                                        {item?.message_detail[0]?.body.slice(0, 20)}...
                                                    </React.Fragment>
                                                }
                                            />
                                            <Typography>
                                                {formatDate(item?.message_detail[0]?.createdAt)}
                                            </Typography>
                                        </ListItem>
                                    </>
                                }))
                            }
                        </List>

                    </Grid>

                </Grid>

            </Container>
        </>
    )
}
export default ApplicantMessages;
