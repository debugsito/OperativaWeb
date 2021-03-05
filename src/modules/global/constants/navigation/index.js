//Images
const HOLDING_NAV_TITLE = '¿Deseas abandonar el proceso?';
const HOLDING_NAV_MESSAGE = 'Los datos que has consignado en esta página se perderán';

const navigation = [
    {
        text: 'Inicio',
        // icon: doubleCheckOrange,
        iconActive: '',
        path: '/',
        pathLink: '/',
        holdContent: {
            title: HOLDING_NAV_TITLE,
            content: HOLDING_NAV_MESSAGE
        },
    }, {
        text: 'Auth',
        // icon: doubleCheckOrange,
        iconActive: '',
        path: '/auth',
        pathLink: '/auth',
        holdContent: {
            title: HOLDING_NAV_TITLE,
            content: HOLDING_NAV_MESSAGE
        },
    },
    {
        text: 'Dashboard',
        // icon: doubleCheckOrange,
        iconActive: '',
        path: '/dashboard',
        pathLink: '/dashboard',
        holdContent: {
            title: HOLDING_NAV_TITLE,
            content: HOLDING_NAV_MESSAGE
        },
    },
    {
        text: 'Admin',
        // icon: doubleCheckOrange,
        iconActive: '',
        path: '/admin',
        pathLink: '/admin',
        holdContent: {
            title: HOLDING_NAV_TITLE,
            content: HOLDING_NAV_MESSAGE
        },
    },
    {
        text: 'Postulante',
        // icon: doubleCheckOrange,
        iconActive: '',
        path: '/postualante',
        pathLink: '/postualante',
        holdContent: {
            title: HOLDING_NAV_TITLE,
            content: HOLDING_NAV_MESSAGE
        },
    }
];

export default navigation;
