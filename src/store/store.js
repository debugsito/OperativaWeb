import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

const checkDevTools = typeof window === 'object'
    && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() :
    f => f;

const initialState = loadState();

const storeConfig = createStore(
    reducers,
    initialState,
    compose(
        applyMiddleware(thunk),
        checkDevTools
    )
);

storeConfig.subscribe(function () {
    saveState(storeConfig.getState())
});

export function loadState() {
    try {
        const serializedData = localStorage.getItem('state')
    if (serializedData === null) {
            return undefined;
        }
        return JSON.parse(serializedData);
    } catch (error) {
        return undefined;
    }
}

export function saveState(state) {
    try {
        let serializedData = JSON.stringify(state);
        localStorage.setItem('state', serializedData);
    } catch (error) { }
}

export default storeConfig;