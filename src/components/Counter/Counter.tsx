import React, {useEffect, useState} from 'react';
import s from '../../styles/counter.module.css'
import {CounterPanel} from "./CounterPanel";
import {MaterialButton} from "../MaterialButton";

type CounterPropsType = {
    maxCounterValue: number
    initCounterValue: number
    showSettingsReducer: () => void
}

export const Counter = ({maxCounterValue, initCounterValue, showSettingsReducer}: CounterPropsType) => {
    let errorStatus = false;
    const [counterValue, setCounterValue] = useState<number>(0);

    useEffect(() => {
        setCounterValue(initCounterValue)
    }, [initCounterValue])

    const incrementCounterValue = () => {
        if (counterValue < maxCounterValue) {
            setCounterValue(counterValue + 1)
        }
    }

    const resetCounterValue = () => {
        setCounterValue(initCounterValue)
    }

    const getClassName = (): string => {
        return s.panelContainer + ' '
            + (counterValue === maxCounterValue || errorStatus ? s.errorInPanel : '')
    }

    return (
        <div className={s.mainContainer}>
            <CounterPanel value={counterValue.toString()}
                          className={getClassName()}/>
            <div className={s.buttonContainer + ' ' + s.justifySpaceBetween}>
                <MaterialButton title={'inc'} onClick={incrementCounterValue} disabled={counterValue === maxCounterValue}/>
                <MaterialButton title={'reset'} onClick={resetCounterValue} disabled={counterValue === initCounterValue}/>
                <MaterialButton title={'set'} onClick={showSettingsReducer}/>
            </div>
        </div>
    );
};