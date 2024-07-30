import React, {useEffect, useState} from 'react';
import {CounterSettings} from "./CounterSettings";
import {Counter} from "./Counter";
import s from "../styles/counter.module.css";

export type WorkStatus = 'Stable' | 'Changing' | 'Error' | 'ErrorMaxValue' | 'ErrorInitValue';

export const CounterWithSettings = () => {

    const [initCounterValue, setInitCounterValue] = useState(0);
    const [maxCounterValue, setMaxCounterValue] = useState(5);
    const [workStatus, setWorkStatus] = useState<WorkStatus>('Stable');

    useEffect(() => {

    }, [])

    return (
        <div className={s.counterWithSettingsContainer}>
            <CounterSettings maxCounterValue={maxCounterValue} initCounterValue={initCounterValue}
                             initCounterValueOnChange={setInitCounterValue}
                             maxCounterValueOnChange={setMaxCounterValue} workStatus={workStatus}
                             changeWorkStatus={setWorkStatus}/>
            <Counter maxCounterValue={maxCounterValue} initCounterValue={initCounterValue} workStatus={workStatus}/>
        </div>
    );
};