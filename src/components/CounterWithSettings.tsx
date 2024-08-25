import React, {useReducer} from 'react';
import {CounterSettings} from './CounterSettings/CounterSettings';
import {Counter} from './Counter/Counter';
import s from '../styles/counter.module.css';

const initValueKey = 'initCounterValue';
const maxValueKey = 'maxCounterValue';

export const CounterWithSettings = () => {
    const [showSettings, showSettingsReducer] = useReducer((v) => !v, false);

    /*useEffect(() => {
        const storageInitCounterValue = localStorage.getItem(initValueKey)
        if (storageInitCounterValue) {
            setInitCounterValue(JSON.parse(storageInitCounterValue))
        }

        const storageMaxCounterValue = localStorage.getItem(maxValueKey)

        if (storageMaxCounterValue) {
            setMaxCounterValue(JSON.parse(storageMaxCounterValue))
        }
    }, [])*/

    return (
        <div className={s.counterWithSettingsContainer}>
            {showSettings && <CounterSettings showSettingsReducer={showSettingsReducer}/>}
            {!showSettings && <Counter showSettingsReducer={showSettingsReducer}/>}
        </div>
    );
};