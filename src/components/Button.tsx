import React, {ButtonHTMLAttributes} from 'react';
import s from '../../styles/counter.module.css'

type ButtonPropsType = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = (props: ButtonPropsType) => {
    return (
        <button onClick={props.onClick} disabled={props.disabled} className={s.button}>{props.title}</button>
    );
};