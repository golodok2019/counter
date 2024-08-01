import React from 'react';
import { v1 } from 'uuid';
import s from "../../styles/counter.module.css";

type Props = {
    labelText: string
    value: number
    onChange: (value: number) => void
    inputClassName?: string
    minValue?: number
};

export const LabelWithNumberInput = ({labelText, value, minValue, onChange, inputClassName}: Props) => {
    const generateId = v1()

    return (
        <div className={s.labelWithInputContainer}>
            <label htmlFor={generateId}>{labelText}</label>
            <input id={generateId} type={'number'} value={value} className={inputClassName}
                   min={minValue} onChange={e => onChange(parseInt(e.currentTarget.value))}/>
        </div>
    );
};