const objFB = {
    client_id: process.env.REACT_APP_CLIENT_ID,
    redirect_uri: process.env.REACT_APP_REDIRECT_URI,
    scope: ['email', 'user_friends'].join(','), // comma seperated string
    response_type: 'code',
    auth_type: 'rerequest',
    display: 'popup',
}

// export const parametersFB = Object.entries(objFB).forEach(([key, value]) => `${key}=${value}&`)