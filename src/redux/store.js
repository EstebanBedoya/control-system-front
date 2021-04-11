import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import roomReducer from './roomDucks'
import historyReducer from './historyDukcs'
import authReducer from './authDucks'
import barReducer from './barDucks'
import statisticsReducer from './statisticsDucks'

const rootReducer = combineReducers({
    rooms: roomReducer,
    history: historyReducer,
    auth: authReducer,
    bar: barReducer,
    statistics: statisticsReducer
})

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

export default function generateStore() {
    const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
    return store 
}