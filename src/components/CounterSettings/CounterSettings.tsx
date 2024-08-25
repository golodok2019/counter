import React, {useEffect, useState} from 'react';
import s from '../../styles/counter.module.css';
import {MaterialButton} from '../MaterialButton';
import {NumberInput} from './NumberInput';
import {Confirm} from '../Confirm';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../reducers/store';
import {saveCounterMaxValueAC} from '../../reducers/counterMaxValueReducer';
import {saveCounterInitValueAC} from '../../reducers/counterInitValueReducer';

export type CounterSettingsPropsType = {
    showSettingsReducer: () => void
};

type WorkStatus = 'Stable' | 'Changing' | 'Error' | 'ErrorMaxValue' | 'ErrorInitValue' | 'InConfirm';

export const CounterSettings = ({showSettingsReducer}: CounterSettingsPropsType) => {

    const initCounterValue = useSelector<AppRootStateType, number>(state => state.counterInitValueReducer)
    const maxCounterValue = useSelector<AppRootStateType, number>(state => state.counterMaxValueReducer)
    const dispatch = useDispatch();

    const [initCounterValueLocal, setInitCounterValueLocal] = useState(0);
    const [maxCounterValueLocal, setMaxCounterValueLocal] = useState(0);
    const [workStatus, setWorkStatus] = useState<WorkStatus>('Stable');

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
        dispatch(saveCounterMaxValueAC(maxCounterValueLocal))
        dispatch(saveCounterInitValueAC(initCounterValueLocal))
        showSettingsReducer()
    }

    const backOnClickHandler = () => {
        if (workStatus !== 'Stable') {
            setWorkStatus('InConfirm')
        } else {
            showSettingsReducer()
        }
    }

    const getErrorText = (isMaxInput: boolean): string => {
        switch (workStatus) {
            case 'Error':
                return 'Incorrect value'
            case 'ErrorMaxValue':
                return isMaxInput ? 'Incorrect max value' : ''
            case 'ErrorInitValue':
                return isMaxInput ? '' : 'Incorrect init value'
            default:
                return ''
        }
    }

    const handleAgreeConfirm = () => {
        setWorkStatus('Stable')
        setInitCounterValueLocal(initCounterValue)
        setMaxCounterValueLocal(maxCounterValue)
        showSettingsReducer()
    }

    const handleCloseConfirm = () => {
        setWorkStatus('Changing')
        validateCounterValues(initCounterValueLocal, maxCounterValueLocal)
    }

    return (
        <div className={s.mainContainer}>
            <div className={s.panelContainer}>
                <NumberInput labelText={'max value'} value={maxCounterValueLocal}
                             onChange={maxCounterValueOnChangeHandler}
                             errorText={getErrorText(true)}/>
                <NumberInput labelText={'start value'} value={initCounterValueLocal}
                             onChange={initCounterValueOnChangeHandler}
                             errorText={getErrorText(false)}/>
            </div>

            <div className={s.buttonContainer}>
                <MaterialButton title={'set'} disabled={workStatus !== 'Changing'} onClick={saveOnClickHandler}/>
                <MaterialButton title={'back'} onClick={backOnClickHandler}/>
            </div>

            <Confirm title={'Confirmation of leaving'} disagreeTitle={'Back'} agreeTitle={'Leave'}
                     content={'The installed information will not be saved'} open={workStatus === 'InConfirm'}
                     handleAgree={handleAgreeConfirm} handleClose={handleCloseConfirm}/>
        </div>
    );
};

