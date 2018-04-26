import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import mapReducer from '../reducers/mapReducer';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            map: mapReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );

    return store;
};
