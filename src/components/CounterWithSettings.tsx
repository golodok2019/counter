import React, {useEffect, useReducer, useState} from 'react';
import {CounterSettings} from './CounterSettings/CounterSettings';
import {Counter} from './Counter/Counter';
import s from '../styles/counter.module.css';

const initValueKey = 'initCounterValue';
const maxValueKey = 'maxCounterValue';

export const CounterWithSettings = () => {

    const [initCounterValue, setInitCounterValue] = useState(0);
    const [maxCounterValue, setMaxCounterValue] = useState(5);
    const [showSettings, showSettingsReducer] = useReducer((v) => !v, false);

    useEffect(() => {
        const storageInitCounterValue = localStorage.getItem(initValueKey)
        if (storageInitCounterValue) {
            setInitCounterValue(JSON.parse(storageInitCounterValue))
        }

        const storageMaxCounterValue = localStorage.getItem(maxValueKey)

        if (storageMaxCounterValue) {
            setMaxCounterValue(JSON.parse(storageMaxCounterValue))
        }
    }, [])

    const setInitCounterValueHandler = (value: number) => {
        localStorage.setItem(initValueKey, JSON.stringify(value))
        setInitCounterValue(value)
    }

    const setMaxCounterValueHandler = (value: number) => {
        localStorage.setItem(maxValueKey, JSON.stringify(value))
        setMaxCounterValue(value)
    }

    return (
        <div className={s.counterWithSettingsContainer}>
            {showSettings && <CounterSettings maxCounterValue={maxCounterValue} initCounterValue={initCounterValue}
                                              initCounterValueOnChange={setInitCounterValueHandler}
                                              maxCounterValueOnChange={setMaxCounterValueHandler}
                                              showSettingsReducer={showSettingsReducer}/>}
            {!showSettings && <Counter maxCounterValue={maxCounterValue} initCounterValue={initCounterValue}
                                       showSettingsReducer={showSettingsReducer}/>}
        </div>
    );
};