import React, {useEffect, useState} from 'react';
import s from "../../styles/counter.module.css";
import {Button} from "../Button";
import {LabelWithNumberInput} from "./LabelWithNumberInput";

export type CounterSettingsPropsType = {
    maxCounterValue: number
    initCounterValue: number
    maxCounterValueOnChange: (value: number) => void
    initCounterValueOnChange: (value: number) => void
    showSettingsReducer: () => void
};

type WorkStatus =  'Stable' | 'Changing' |'Error' | 'ErrorMaxValue' | 'ErrorInitValue';

export const CounterSettings = ({
                                    maxCounterValue,
                                    initCounterValue,
                                    initCounterValueOnChange,
                                    maxCounterValueOnChange,
                                    showSettingsReducer
                                }: CounterSettingsPropsType) => {

    const [initCounterValueLocal, setInitCounterValueLocal] = useState(0);
    const [maxCounterValueLocal, setMaxCounterValueLocal] = useState(1);
    const [workStatus, setWorkStatus] = useState<WorkStatus>('Stable')

    useEffect(() => {
        setMaxCounterValueLocal(maxCounterValue)
    }, [maxCounterValue])

    useEffect(() => {
        setInitCounterValueLocal(initCounterValue)
    }, [initCounterValue])

    const initCounterValueOnChangeHandler = (value: number) => {
        if (workStatus !== 'Changing') {
            setWorkStatus('Changing')
        }

        setInitCounterValueLocal(value);
        validateCounterValues(value, maxCounterValueLocal)
    }

    const maxCounterValueOnChangeHandler = (value: number) => {
        if (workStatus !== 'Changing') {
            setWorkStatus('Changing')
        }

        setMaxCounterValueLocal(value);
        validateCounterValues(initCounterValueLocal, value)
    }

    const validateCounterValues = (initValue: number, maxValue: number) => {

        if (initValue >= maxValue || (initValue < 0 && maxValue < 0)) {
            setWorkStatus('Error')
            return
        }

        if (initValue < 0) {
            setWorkStatus('ErrorInitValue')
            return
        }

        if (maxValue < 0) {
            setWorkStatus('ErrorMaxValue')
            return
        }
    }

    const saveOnClickHandler = () => {
        setWorkStatus('Stable')
        showSettingsReducer()
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

