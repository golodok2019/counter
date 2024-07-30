import React, {useEffect, useState} from 'react';
import s from '../styles/counter.module.css'
import {CounterPanel} from "./CounterPanel";
import {Button} from "./Button";
import {WorkStatus} from "./CounterWithSettings";

type CounterPropsType = {
    maxCounterValue: number
    initCounterValue: number
    workStatus: WorkStatus
}

export const Counter = ({maxCounterValue, initCounterValue, workStatus}: CounterPropsType) => {
    let errorStatus = false, needSmallText = false;
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

    const getValueToDisplay = (): string => {
        switch (workStatus) {
            case "Changing":
                needSmallText = true;
                return "enter values and press 'set'"
            case "Error":
            case "ErrorInitValue":
            case "ErrorMaxValue":
                errorStatus = needSmallText = true;
                return "Incorrect value!"
            case "Stable":
                return counterValue.toString()
        }
    }

    const getClassName = (): string => {
        return s.panelContainer + ' '
            + (needSmallText ? s.smallFontSize : s.normalFontSize) + ' '
            + (counterValue === maxCounterValue || errorStatus ? s.errorInPanel : '')
    }

    return (
        <div className={s.mainContainer}>
            <CounterPanel value={getValueToDisplay()}
                          className={getClassName()}/>
            <div className={s.buttonContainer + ' ' + s.justifySpaceBetween}>
                <Button title={'inc'} onClick={incrementCounterValue} disabled={counterValue === maxCounterValue}/>
                <Button title={'reset'} onClick={resetCounterValue} disabled={counterValue === initCounterValue}/>
            </div>
        </div>
    );
};