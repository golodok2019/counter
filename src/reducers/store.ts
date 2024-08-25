import {combineReducers, legacy_createStore} from 'redux';
import {counterMaxValueReducer} from './counterMaxValueReducer';
import {counterInitValueReducer} from './counterInitValueReducer';

const rootReducer = combineReducers({
    counterInitValueReducer: counterInitValueReducer,
    counterMaxValueReducer: counterMaxValueReducer
})

export const store = legacy_createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>