const objFB = {
    client_id: process.env.REACT_APP_FB_CLIENT_ID,
    redirect_uri: process.env.REACT_APP_FB_REDIRECT_URI,
    scope: ['email', 'user_friends'].join(','), // comma seperated string
    response_type: 'code',
    auth_type: 'rerequest',
    display: 'popup',
}

const objGoogle = {
    client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    redirect_uri: process.env.REACT_APP_GOOGLE_REDIRECT_URI,
    scope: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
    ].join(' '), // comma seperated string
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent',
}

export function getFacebookLoginUrl() {
    let parametersTemp = ""

    Object.entries(objFB).forEach(([key, value]) => {
        parametersTemp += `${key}=${value}&`
    });

    parametersTemp.substring(0, parametersTemp.length - 1)

    return `https://www.facebook.com/v4.0/dialog/oauth?${parametersTemp}`;

}

export function getGoogleLoginUrl() {
    let parametersTemp = ""

    Object.entries(objGoogle).forEach(([key, value]) => {
        parametersTemp += `${key}=${value}&`
    });

    parametersTemp.substring(0, parametersTemp.length - 1)

    return `https://accounts.google.com/o/oauth2/v2/auth?${parametersTemp}`;

}