import {makeStyles} from '@material-ui/core';
import {Home, AccountCircle, Widgets} from '@material-ui/icons';
import {useHistory} from "react-router-dom";
import {SessionRoutes} from "../../libs/sessionRoutes";
import { useSelector } from "react-redux";
import './index.css'

const useStyles = makeStyles((theme) => ({
    toolbar: {
        position: 'fixed',
        bottom: '.5rem',
        width: '100%',
        padding: '0 .5rem',
        // margin: '0 .5rem'
    },
    containerToolbar: {
        borderRadius: '20px',
        backgroundColor: 'var(--titleColor)',
        padding: '.5rem 2rem'
    },
    playing : {
        backgroundColor : "#5D5FEF"
    },
    containerToolbarIcon: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    iconsToolbar: {
        color: '#fff',
        fontSize: '10px',
        textAlign: 'center',
        '& p': {
            margin: 0
        }
    },
}));

const BottomNavigationBar = () => {
    const classes = useStyles();
    const history = useHistory()
    const initRoute = SessionRoutes().initRoute;
    const { auth: { user } } = useSelector(state => state);

    const goToPostulaciones = (event) => {
        history.push(`${initRoute}/postulaciones`);
    };

    const goToProfile = (event) => {
        history.push(`${initRoute}/mi-perfil`);
    };

    const goToHome = (event) => {
        history.push(`${initRoute}`);
    };

    return (
        <>
            <div className={`${classes.toolbar} toolbarCondition`} >
                <div className={`${classes.containerToolbar} ${user?.account?.job_hunting_account? classes.playing: ''}`}>
                    <div className={classes.containerToolbarIcon}>
                        <a onClick={goToHome} className={classes.iconsToolbar}>
                            <Home/>
                            <p>Inicio</p>
                        </a>
                        <a onClick={goToPostulaciones} className={classes.iconsToolbar}>
                            <Widgets/>
                            <p>Mis Postulaciones</p>
                        </a>
                        <a onClick={goToProfile} className={classes.iconsToolbar}>
                            <AccountCircle/>
                            <p>Mi CV</p>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BottomNavigationBar;
