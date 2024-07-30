import React, {useState} from 'react';
import s from '../styles/counter.module.css'
import {CounterPanel} from "./CounterPanel";
import {Button} from "./Button";

type CounterPropsType = {
    maxCounterValue: number
    initCounterValue: number
}

export const Counter = ({maxCounterValue, initCounterValue}: CounterPropsType) => {
    const [counterValue, setCounterValue] = useState<number>(initCounterValue);

    const incrementCounterValue = () => {
        if (counterValue < maxCounterValue) {
            setCounterValue(counterValue + 1)
        }
    }

    const resetCounterValue = () => {
        setCounterValue(initCounterValue)
    }

    return (
        <div className={s.mainContainer}>
            <CounterPanel numberValue={counterValue}
                          className={s.panelContainer + ' ' + (counterValue === maxCounterValue ? s.maxValueInPanel : '')}/>
            <div className={s.buttonContainer}>
                <Button title={'inc'} onClick={incrementCounterValue} disabled={counterValue === maxCounterValue}/>
                <Button title={'reset'} onClick={resetCounterValue} disabled={counterValue === initCounterValue}/>
            </div>
        </div>
    );
};