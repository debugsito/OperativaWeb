let sessionProvider = sessionStorage, sessionItemName = 'SESSION_STORE';

const create = (sessionData) => { sessionProvider.setItem(sessionItemName, JSON.stringify(sessionData)) };
const get = () => (JSON.parse(sessionProvider.getItem(sessionItemName)));
const add = (nodeName, nodeData) => {
    const currentSession = (JSON.parse(sessionProvider.getItem(sessionItemName))) || {};
    sessionProvider.setItem(sessionItemName, JSON.stringify({
        ...currentSession,
        [nodeName]: nodeData
    }))
};
const destroy = (exitNavigation = true) => {
    sessionProvider.removeItem(sessionItemName);
    if (exitNavigation) {
        window.location.reload();
        // history.push('/')
    }
}

export default { create, get, add, destroy };
