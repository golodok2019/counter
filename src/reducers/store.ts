import {combineReducers, legacy_createStore} from 'redux';
import {counterMaxValueReducer} from './counterMaxValueReducer';
import {counterInitValueReducer} from './counterInitValueReducer';
import {loadState} from './loadState';

export const initValueKey = 'initCounterValue';
export const maxValueKey = 'maxCounterValue';

const persistedState = loadState();

const rootReducer = combineReducers({
    counterInitValueReducer: counterInitValueReducer,
    counterMaxValueReducer: counterMaxValueReducer
})

export const store = legacy_createStore(rootReducer, persistedState)

store.subscribe(() => {
    localStorage.setItem(initValueKey, JSON.stringify(store.getState().counterInitValueReducer))
    localStorage.setItem(maxValueKey, JSON.stringify(store.getState().counterMaxValueReducer))
})


export type AppRootStateType = ReturnType<typeof rootReducer>