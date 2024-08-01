import React, {useEffect, useState} from 'react';
import s from "../../styles/counter.module.css";
import {Button} from "../Button";
import {WorkStatus} from "../CounterWithSettings";
import {LabelWithNumberInput} from "./LabelWithNumberInput";

export type CounterSettingsPropsType = {
    maxCounterValue: number
    initCounterValue: number
    maxCounterValueOnChange: (value: number) => void
    initCounterValueOnChange: (value: number) => void
    changeWorkStatus: (status: WorkStatus) => void
    workStatus: WorkStatus
};

export const CounterSettings = ({
                                    maxCounterValue,
                                    initCounterValue,
                                    initCounterValueOnChange,
                                    maxCounterValueOnChange,
                                    workStatus,
                                    changeWorkStatus
                                }: CounterSettingsPropsType) => {

    const [initCounterValueLocal, setInitCounterValueLocal] = useState(0);
    const [maxCounterValueLocal, setMaxCounterValueLocal] = useState(1);

    useEffect(() => {
        setMaxCounterValueLocal(maxCounterValue)
    }, [maxCounterValue])

    useEffect(() => {
        setInitCounterValueLocal(initCounterValue)
    }, [initCounterValue])

    const initCounterValueOnChangeHandler = (value: number) => {
        if (workStatus !== 'Changing') {
            changeWorkStatus('Changing')
        }

        setInitCounterValueLocal(value);
        validateCounterValues(value, maxCounterValueLocal)
    }

    const maxCounterValueOnChangeHandler = (value: number) => {
        if (workStatus !== 'Changing') {
            changeWorkStatus('Changing')
        }

        setMaxCounterValueLocal(value);
        validateCounterValues(initCounterValueLocal, value)
    }

    const validateCounterValues = (initValue: number, maxValue: number) => {

        if (initValue >= maxValue || (initValue < 0 && maxValue < 0)) {
            changeWorkStatus('Error')
            return
        }

        if (initValue < 0) {
            changeWorkStatus('ErrorInitValue')
            return
        }

        if (maxValue < 0) {
            changeWorkStatus('ErrorMaxValue')
            return
        }
    }

    const saveOnClickHandler = () => {
        changeWorkStatus('Stable')
        initCounterValueOnChange(initCounterValueLocal)
        maxCounterValueOnChange(maxCounterValueLocal)
    }

    return (
        <div className={s.mainContainer}>
            <div className={s.panelContainer}>
                <LabelWithNumberInput labelText={'max value:'} value={maxCounterValueLocal}
                                      onChange={maxCounterValueOnChangeHandler}
                                      inputClassName={workStatus === 'Error' || workStatus === 'ErrorMaxValue' ?
                                          s.inputError : s.input}/>
                <LabelWithNumberInput labelText={'start value:'} value={initCounterValueLocal}
                                      onChange={initCounterValueOnChangeHandler}
                                      inputClassName={workStatus === 'Error' || workStatus === 'ErrorInitValue' ?
                                          s.inputError : s.input}/>
            </div>

            <div className={s.buttonContainer + ' ' + s.justifyCenter}>
                <Button title={'set'} disabled={workStatus !== 'Changing'} onClick={saveOnClickHandler}/>
            </div>
        </div>
    );
};

